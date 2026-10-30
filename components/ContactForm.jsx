'use client';

import { useState } from 'react';
import Arrow from './Arrow';
import { site } from '@/content/site';

const TYPES = ['Villa', 'Family home', 'Apartment', 'Renovation', 'Other'];
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    data.name = (data.name || '').trim();
    data.email = (data.email || '').trim();
    data.message = (data.message || '').trim();
    if (!data.name || !emailOk(data.email) || !data.message) {
      setStatus('error');
      setError('Add your name, a valid email and a few words about your project.');
      return;
    }
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Something went wrong.');
      setFirstName(data.name.split(' ')[0]);
      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(`${err.message} You can also email us at ${site.email}.`);
    }
  }

  if (status === 'sent') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} role="status">
        <p className="h2">Thank you, {firstName}.</p>
        <p className="body">Your enquiry has been sent. We’ll be in touch soon to arrange a first conversation.</p>
        <button className="go" type="button" onClick={() => setStatus('idle')} style={{ alignSelf: 'flex-start' }}>
          Send another enquiry <Arrow />
        </button>
      </div>
    );
  }

  return (
    <form id="enquiry" noValidate onSubmit={onSubmit}>
      <div className="two">
        <div className="field"><label htmlFor="f-name">Name</label><input id="f-name" name="name" autoComplete="name" required maxLength={120} /></div>
        <div className="field"><label htmlFor="f-email">Email</label><input id="f-email" name="email" type="email" autoComplete="email" required maxLength={200} /></div>
      </div>
      <div className="two">
        <div className="field"><label htmlFor="f-phone">Phone Number</label><input id="f-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} /></div>
        <div className="field">
          <label htmlFor="f-type">Property</label>
          <select id="f-type" name="type" defaultValue={TYPES[0]}>
            {TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div className="field"><label htmlFor="f-msg">About your project</label><textarea id="f-msg" name="message" rows={4} required maxLength={4000} /></div>
      {/* Spam trap: hidden from people, bots tend to fill it in. */}
      <div className="hp" aria-hidden="true"><label htmlFor="f-company">Company</label><input id="f-company" name="company" tabIndex={-1} autoComplete="off" /></div>
      {status === 'error' ? <p className="err" role="alert">{error}</p> : null}
      <button className="btn" type="submit" disabled={status === 'sending'} style={{ alignSelf: 'flex-start' }}>
        {status === 'sending' ? 'Sending…' : 'BOOK AN INITIAL CONSULTATION'} <Arrow />
      </button>
    </form>
  );
}
