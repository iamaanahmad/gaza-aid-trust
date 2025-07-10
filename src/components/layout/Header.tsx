import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, HeartHandshake } from 'lucide-react';

export function Header() {
  const navLinks = [
    { href: '/map', label: 'خريطة الأزمات' },
    { href: '/aid', label: 'توصيل المساعدات' },
    { href: '/leaderboard', label: 'لوحة الشرف' },
    { href: '/zakat', label: 'حاسبة الزكاة' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="ml-6 flex items-center space-x-2">
            <HeartHandshake className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">
              عون وثقة غزة
            </span>
          </Link>
          <nav className="hidden gap-6 text-sm md:flex">
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
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 pt-6">
                 <Link href="/" className="mb-4 flex items-center space-x-2">
                    <HeartHandshake className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">
                      عون وثقة غزة
                    </span>
                  </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-2 py-1 text-lg"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Button asChild className="hidden md:flex">
             <Link href="/aid">تبرع الآن</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
