'use client';

import { useState } from 'react';

interface SyllabusPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SyllabusPopup({ isOpen, onClose }: SyllabusPopupProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate Gmail-only
    if (!email.endsWith('@gmail.com')) {
      setError('Please use a Gmail address (@gmail.com)');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/syllabus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send syllabus');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setEmail('');
      }, 3000);
    } catch (err) {
      setError('Failed to send syllabus. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0d0906] border border-[#2e2e2e] rounded-lg max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!success ? (
          <>
            <h2 className="text-2xl font-bold text-white mb-2 font-sans">Download Syllabus</h2>
            <p className="text-slate-400 text-sm font-mono mb-6">
              Enter your Gmail address to receive the full curriculum syllabus.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2 font-mono">
                  Gmail Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@gmail.com"
                  required
                  className="w-full px-4 py-3 bg-[#060503] border border-[#2e2e2e] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#f97316] font-mono text-sm"
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-900/50 rounded-lg">
                  <p className="text-red-400 text-sm font-mono">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#f97316] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#ea6a0a] transition disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm"
              >
                {loading ? 'Sending...' : 'Send Syllabus'}
              </button>

              <p className="text-xs text-slate-500 mt-4 font-mono text-center">
                We'll send you a download link via email. Only Gmail addresses accepted.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-900/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-sans">Check Your Inbox!</h3>
            <p className="text-slate-400 font-mono text-sm">
              We've sent the syllabus to {email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
