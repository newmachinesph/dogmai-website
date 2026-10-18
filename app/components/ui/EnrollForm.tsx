'use client';

import { useState } from 'react';

export default function EnrollForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      paymentPlan: formData.get('paymentPlan'),
      experience: formData.get('experience'),
      goal: formData.get('goal'),
    };

    try {
      const response = await fetch('/api/enroll', {
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
    <form className="mt-8 space-y-5" onSubmit={handleSubmit} aria-label="Enrollment application form">
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
          Phone
          <input
            required
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-required="true"
            className="rounded-lg border border-slate-800 bg-black/60 px-4 py-3 text-white placeholder:text-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none transition"
            placeholder="+63 9XX XXX XXXX"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-mono text-slate-300 sm:col-span-2">
          Preferred payment
          <select
            required
            name="paymentPlan"
            aria-required="true"
            className="rounded-lg border border-slate-800 bg-black/60 px-4 py-3 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none transition"
          >
            <option value="">Select a plan</option>
            <option value="full">Full payment - PHP 40,000</option>
            <option value="installment">Installment - PHP 9,000 x 5 months</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm font-mono text-slate-300 sm:col-span-2">
          Background
          <select
            required
            name="experience"
            aria-required="true"
            className="rounded-lg border border-slate-800 bg-black/60 px-4 py-3 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none transition"
          >
            <option value="">Select your level</option>
            <option value="beginner">Beginner (no coding yet)</option>
            <option value="some">Some experience</option>
            <option value="career-shift">Career shifter</option>
            <option value="developer">Working developer</option>
          </select>
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm font-mono text-slate-300">
        What are you hoping to build or change?
        <textarea
          name="goal"
          rows={4}
          aria-label="Tell us about your goals and motivations"
          className="rounded-lg border border-slate-800 bg-black/60 px-4 py-3 text-white placeholder:text-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none transition"
          placeholder="Tell us your goals and what brought you here."
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-gradient-to-r from-orange-500 to-orange-400 text-black px-6 py-3 rounded-lg font-semibold hover:from-orange-400 hover:to-amber-400 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Submit enrollment application"
        >
          {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
        </button>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <span>Secure payments via</span>
          <span className="bg-[#ffffff] px-2 py-1 rounded">
            <img src="/paymongo.png" alt="PayMongo" className="h-4 object-contain" />
          </span>
        </div>
      </div>
      {status === 'success' ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm font-mono text-emerald-300"
        >
          <strong>Success!</strong> Your application has been received. Check your email for confirmation and next steps.
        </div>
      ) : null}
      {status === 'error' ? (
        <div
          role="alert"
          className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-mono text-red-300"
        >
          <strong>Something went wrong.</strong> Please try again or email us at hello@dogm.ai.
        </div>
      ) : null}
    </form>
  );
}
