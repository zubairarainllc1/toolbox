import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BotMessageSquare, Cpu, Image as ImageIcon } from 'lucide-react';
import ToolSearch from '@/components/tool-search';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="w-full py-20 md:py-28 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl animate-gradient bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent bg-300% animate-gradient">
              Your Ultimate Digital Toolbox
            </h1>
            <p className="mx-auto mt-6 max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Supercharge your workflow with our collection of AI-powered tools. From social media to productivity, we've got you covered.
            </p>
            <div className="mt-10 flex flex-col items-center gap-6">
              <ToolSearch />
              <Link href="/tools" className="mt-4">
                <Button size="lg">
                  Explore All Tools
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Key Features
              </div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                Why You'll Love Toolbox
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We provide a curated set of tools designed to be simple, powerful, and efficient.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BotMessageSquare className="h-8 w-8 text-primary" />
                  <span className="font-headline text-2xl">Social Media Tools</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Generate engaging captions, hashtags, and bios for Instagram, Facebook, X (Twitter), and YouTube.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-8 w-8 text-primary" />
                   <span className="font-headline text-2xl">Productivity Boosters</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Streamline your tasks with handy utilities that save you time and effort every day.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-8 w-8 text-primary" />
                   <span className="font-headline text-2xl">Image Utilities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Quickly resize, convert, and prepare your images for any platform without leaving your browser.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
