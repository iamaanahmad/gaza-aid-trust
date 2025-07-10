'use client';

import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: keyof typeof translations, options?: { [key: string]: string | number }) => {
    let translation = translations[key]?.[language] || key;

    if (options) {
      Object.keys(options).forEach(optionKey => {
        translation = translation.replace(`{${optionKey}}`, String(options[optionKey]));
      });
    }

    return translation;
  };

  return { t, language };
}
