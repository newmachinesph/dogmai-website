'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      topic: formData.get('topic'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setStatus('error');
        return;
      }

      form.reset();
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit} aria-label="Contact form">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-mono text-slate-300">
          Full name
          <input
            required
            name="fullName"
            autoComplete="name"
            aria-required="true"
            className="rounded-lg border border-slate-800 bg-black/60 px-4 py-3 text-white placeholder:text-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none transition"
            placeholder="Jane Dela Cruz"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-mono text-slate-300">
          Email
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            aria-required="true"
            className="rounded-lg border border-slate-800 bg-black/60 px-4 py-3 text-white placeholder:text-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none transition"
            placeholder="you@email.com"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-mono text-slate-300 sm:col-span-2">
          What is this about?
          <select
            required
            name="topic"
            aria-required="true"
            className="rounded-lg border border-slate-800 bg-black/60 px-4 py-3 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none transition"
          >
            <option value="">Select a topic</option>
            <option value="enrollment">Enrollment and schedule</option>
            <option value="payments">Payments and pricing</option>
            <option value="curriculum">Curriculum questions</option>
            <option value="remote">Remote learning questions</option>
            <option value="other">Something else</option>
          </select>
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm font-mono text-slate-300">
        Your question
        <textarea
          name="message"
          rows={4}
          aria-label="Your question or message"
          className="rounded-lg border border-slate-800 bg-black/60 px-4 py-3 text-white placeholder:text-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none transition"
          placeholder="What do you want to know?"
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-gradient-to-r from-orange-500 to-orange-400 text-black px-8 py-3 rounded-lg font-semibold hover:from-orange-400 hover:to-amber-400 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send contact message"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
        <p className="text-xs font-mono text-slate-500">
          We reply within 1-2 business days. No spam.
        </p>
      </div>
      {status === 'success' ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm font-mono text-emerald-300"
        >
          <strong>Message sent.</strong> We will reply within 1-2 business days.
        </div>
      ) : null}
      {status === 'error' ? (
        <div
          role="alert"
          className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-mono text-red-300"
        >
          <strong>Something broke.</strong> Please email us directly at hello@dogm.ai.
        </div>
      ) : null}
    </form>
  );
}
