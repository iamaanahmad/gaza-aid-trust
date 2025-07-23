
'use client';

import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useState } from 'react';
import Image from 'next/image';
import logo from '@/app/logo.png';

export function Header() {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/map', label: t('nav_map') },
    { href: '/aid', label: t('nav_aid') },
    { href: '/leaderboard', label: t('nav_leaderboard') },
    { href: '/zakat', label: t('nav_zakat') },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-auto flex items-center">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden ltr:mr-2 rtl:ml-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="text-left border-b pb-4">
                <SheetTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                   <Image src={logo} alt="Gaza Aid & Trust Logo" width={24} height={24} />
                    <span className="font-bold text-lg">
                      {t('app_title')}
                    </span>
                </SheetTitle>
                <SheetDescription>
                  Navigation menu
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4 pt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="block px-2 py-1 text-lg"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Image src={logo} alt="Gaza Aid & Trust Logo" width={24} height={24} />
            <span className="font-bold sm:inline-block">
              {t('app_title')}
            </span>
          </Link>
          <nav className="hidden gap-6 text-sm md:flex ltr:ml-6 rtl:mr-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 rtl:space-x-reverse">
          <LanguageSwitcher />
          <Button asChild className="hidden md:flex">
             <Link href="/aid">{t('donate_now_button')}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
