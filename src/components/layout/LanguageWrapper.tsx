'use client';

import { useLanguage } from '@/context/language-context';
import { ReactNode } from 'react';

export function LanguageWrapper({ children }: { children: ReactNode }) {
    const { language, direction } = useLanguage();

    return (
        <html lang={language} dir={direction} suppressHydrationWarning>
            {children}
        </html>
    )
}
