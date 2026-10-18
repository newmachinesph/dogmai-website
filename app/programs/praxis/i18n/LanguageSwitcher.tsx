'use client';

import { useLanguage } from './LanguageContext';
import { Language } from './translations';

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中文' },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#0d0a08]/60 border border-[#1a1815]">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
            language === lang.code
              ? 'bg-pink-500/80 text-white'
              : 'text-[#6f6160] hover:text-[#f4efe6]'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
