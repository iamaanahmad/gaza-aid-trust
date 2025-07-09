import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, HandHeart, Calculator, Trophy } from 'lucide-react';
import Image from 'next/image';
import { TutorialDialog } from '@/components/home/TutorialDialog';

export default function Home() {
  const features = [
    {
      icon: <Map className="h-10 w-10 text-primary" />,
      title: 'Crisis Map',
      description: 'View real-time, verified alerts on aid distribution, safe zones, and critical incidents.',
      link: '/map',
      cta: 'View Map',
    },
    {
      icon: <HandHeart className="h-10 w-10 text-primary" />,
      title: 'Aid Connect',
      description: 'Request essential aid or donate to directly support families in need.',
      link: '/aid',
      cta: 'Give/Request Aid',
    },
    {
      icon: <Calculator className="h-10 w-10 text-primary" />,
      title: 'Zakat Calculator',
      description: 'Calculate your Zakat and contribute to vital humanitarian efforts.',
      link: '/zakat',
      cta: 'Calculate Zakat',
    },
    {
        icon: <Trophy className="h-10 w-10 text-primary" />,
        title: 'Community Leaderboard',
        description: 'Recognizing top contributors who strengthen our community through action and verification.',
        link: '/leaderboard',
        cta: 'View Leaderboard',
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1200x800.png"
          alt="Gaza landscape"
          data-ai-hint="gaza child hope"
          fill
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 bg-black/50 -z-10" />
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline">
            Hope and Aid for Gaza
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl mt-4">
            A platform for real-time crisis information and direct humanitarian support.
          </p>
          <div className="mt-8 flex justify-center items-center gap-4">
            <Button asChild size="lg">
              <Link href="/aid">Donate Now</Link>
            </Button>
            <TutorialDialog />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="flex flex-col text-center">
                <CardHeader className="items-center">
                  {feature.icon}
                  <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={feature.link}>{feature.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
