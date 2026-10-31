'use client';

import { useEffect, useRef, useState } from 'react';
import Arrow from './Arrow';
import { site } from '@/content/site';

const TYPES = ['Villa', 'Family home', 'Apartment', 'Renovation', 'Other'];
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Each message says what is needed, not what went wrong
function validate(d) {
  const e = {};
  if (!d.name) e.name = 'Enter your name.';
  if (!d.email) e.email = 'Enter your email address.';
  else if (!emailOk(d.email)) e.email = 'Enter an email address in the format name@example.com.';
  if (!d.message) e.message = 'Tell us a little about your project.';
  return e;
}

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [firstName, setFirstName] = useState('');
  const sending = useRef(false); // blocks a second submit before the button re-renders as disabled
  const shownAt = useRef(0);
  useEffect(() => { shownAt.current = Date.now(); }, [status]);

  function fieldProps(name) {
    const bad = Boolean(fieldErrors[name]);
    return { 'aria-invalid': bad || undefined, 'aria-describedby': bad ? `f-${name}-err` : undefined };
  }
  const fieldError = (name) => (fieldErrors[name] ? <p className="err" id={`f-${name}-err`}>{fieldErrors[name]}</p> : null);

  async function onSubmit(e) {
    e.preventDefault();
    if (sending.current) return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    data.name = (data.name || '').trim();
    data.email = (data.email || '').trim();
    data.message = (data.message || '').trim();
    const errs = validate(data);
    setFieldErrors(errs);
    if (Object.keys(errs).length) {
      setStatus('error');
      setError('Please check the highlighted fields.');
      form.querySelector(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    data.elapsed = Date.now() - shownAt.current;
    sending.current = true;
    setStatus('sending');
    setError('');
    try {
      let res;
      try {
        res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } catch {
        throw new Error('We couldn’t reach our server. Check your connection and try again.');
      }
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'We couldn’t send your enquiry just now. Please try again in a few minutes.');
      setFirstName(data.name.split(' ')[0]);
      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(`${err.message} You can also email us at ${site.email}.`);
    } finally {
      sending.current = false;
    }
  }

  if (status === 'sent') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} role="status">
        <p className="h2">Thank you, {firstName}.</p>
        <p className="body">Your enquiry has been sent. We’ll reply by email to arrange a first conversation.</p>
        <button className="go" type="button" onClick={() => setStatus('idle')} style={{ alignSelf: 'flex-start' }}>
          Send another enquiry <Arrow />
        </button>
      </div>
    );
  }

  return (
    <form id="enquiry" noValidate onSubmit={onSubmit} aria-busy={status === 'sending'}>
      <p className="note">All fields are required unless marked optional.</p>
      <div className="two">
        <div className="field"><label htmlFor="f-name">Name</label><input id="f-name" name="name" autoComplete="name" required maxLength={120} {...fieldProps('name')} />{fieldError('name')}</div>
        <div className="field"><label htmlFor="f-email">Email</label><input id="f-email" name="email" type="email" autoComplete="email" required maxLength={200} {...fieldProps('email')} />{fieldError('email')}</div>
      </div>
      <div className="two">
        <div className="field"><label htmlFor="f-phone">Phone number <span className="opt">(optional)</span></label><input id="f-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} /></div>
        <div className="field">
          <label htmlFor="f-type">Property</label>
          <select id="f-type" name="type" defaultValue={TYPES[0]}>
            {TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div className="field"><label htmlFor="f-msg">About your project</label><textarea id="f-msg" name="message" rows={4} required maxLength={4000} {...fieldProps('message')} />{fieldError('message')}</div>
      {/* Spam trap: hidden from people, bots tend to fill it in. */}
      <div className="hp" aria-hidden="true"><label htmlFor="f-company">Company</label><input id="f-company" name="company" tabIndex={-1} autoComplete="off" /></div>
      <div role="alert">{status === 'error' ? <p className="err">{error}</p> : null}</div>
      <button className="btn" type="submit" disabled={status === 'sending'} style={{ alignSelf: 'flex-start' }}>
        {status === 'sending' ? 'Sending…' : 'BOOK AN INITIAL CONSULTATION'} <Arrow />
      </button>
    </form>
  );
}
