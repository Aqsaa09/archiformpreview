import { site } from '@/content/site';

/**
 * Receives enquiries from the contact form and emails them to the studio with Resend.
 * Required environment variables (set in .env.local and in Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY      – from resend.com/api-keys
 *   CONTACT_TO_EMAIL    – inbox that receives enquiries
 *   CONTACT_FROM_EMAIL  – sender on a domain verified in Resend, e.g. "ARCHIFORM Website <website@yourdomain.com>".
 *                         Before your domain is verified you can use "ARCHIFORM <onboarding@resend.dev>",
 *                         which only delivers to the email address you signed up to Resend with.
 */
export const runtime = 'nodejs';

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clip = (s, n) => String(s || '').trim().slice(0, n);
// One line only: used in the email subject, where a line break could inject headers
const oneLine = (s, n) => clip(s, n).replace(/[\r\n\t]+/g, ' ');
const TYPES = ['Villa', 'Family home', 'Apartment', 'Renovation', 'Other'];
// A person takes a few seconds to fill in the form; scripts post it at once
const MIN_FILL_MS = 2500;

// Light abuse protection: at most 5 enquiries per IP every 10 minutes (per server instance).
const hits = new Map();
function limited(ip) {
  const now = Date.now(), win = 10 * 60 * 1000;
  const list = (hits.get(ip) || []).filter((t) => now - t < win);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

export async function POST(req) {
  // Only accept posts from the site's own pages (browsers always send Origin on a cross-site POST)
  const origin = req.headers.get('origin');
  if (origin) {
    let sameHost = false;
    try { sameHost = new URL(origin).host === req.headers.get('host'); } catch {}
    if (!sameHost) return Response.json({ error: 'Please send your enquiry from the contact page.' }, { status: 403 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot filled in, or the form sent faster than a person could type it: pretend success so bots move on.
  if (body.company) return Response.json({ ok: true });
  if (typeof body.elapsed === 'number' && body.elapsed < MIN_FILL_MS) return Response.json({ ok: true });

  const name = oneLine(body.name, 120);
  const email = oneLine(body.email, 200);
  const phone = oneLine(body.phone, 40);
  const type = TYPES.includes(body.type) ? body.type : '';
  const message = clip(body.message, 4000);
  if (!name || !emailOk(email) || !message) {
    return Response.json({ error: 'Add your name, an email address in the format name@example.com and a few words about your project.' }, { status: 400 });
  }

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return Response.json({ error: 'Too many enquiries just now. Please try again in a few minutes.' }, { status: 429 });

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error('Contact form: RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is not set.');
    return Response.json({ error: 'Our enquiry form isn’t connected yet, so your message wasn’t sent.' }, { status: 503 });
  }

  const rows = [['Name', name], ['Email', email], ['Phone', phone || '—'], ['Project type', type || '—']];
  const html = `
    <div style="font-family:Georgia,serif;color:#3E3122;max-width:560px">
      <h2 style="font-weight:400">New enquiry from the website</h2>
      <table style="border-collapse:collapse;font-size:15px">
        ${rows.map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#7A7E58">${k}</td><td style="padding:4px 0">${esc(v)}</td></tr>`).join('')}
      </table>
      <p style="white-space:pre-wrap;font-size:15px;line-height:1.6;border-top:1px solid #ddd;padding-top:12px">${esc(message)}</p>
    </div>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${message}`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL.split(',').map((s) => s.trim()),
      reply_to: email,
      subject: `New enquiry: ${name} (${type || 'project'}) – ${site.shortName}`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text().catch(() => ''));
    return Response.json({ error: 'We couldn’t send your enquiry just now. Please try again in a few minutes.' }, { status: 502 });
  }
  return Response.json({ ok: true });
}
