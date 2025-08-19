
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BotMessageSquare, Cpu, Search, Sparkles, Zap } from 'lucide-react';
import ToolSearch from '@/components/tool-search';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl animate-gradient bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent bg-300% animate-gradient">
              Create Content That Clicks
            </h1>
            <p className="mx-auto mt-6 max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Your all-in-one AI toolkit for generating high-quality social media content, captions, hashtags, and more. Get started by finding the perfect tool below.
            </p>
            <div className="mt-12 flex flex-col items-center gap-4">
              <ToolSearch />
              <p className="text-xs text-muted-foreground">
                Or,{' '}
                <Link href="/tools" className="underline hover:text-primary">
                  explore all tools
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Why Choose Toolbox?
              </div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                Work Smarter, Not Harder
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our AI-powered tools are designed to streamline your workflow and supercharge your creativity.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
            <div className="grid gap-1 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-headline">Save Time</h3>
              <p className="text-muted-foreground">
                Generate high-quality content in seconds, not hours. Focus on your strategy, not on writer's block.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                 <BotMessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-headline">Boost Engagement</h3>
              <p className="text-muted-foreground">
                Create viral hooks, engaging captions, and optimized descriptions that capture your audience's attention.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-headline">Unleash Creativity</h3>
              <p className="text-muted-foreground">
                Never run out of ideas again. Get fresh, relevant content suggestions for any topic or niche.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                Get Started in 3 Easy Steps
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Using our tools is as simple as it gets.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-3 md:gap-12 mt-12">
            <div className="relative flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">1</div>
              <h3 className="mt-4 text-lg font-semibold">Choose Your Tool</h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Select from our wide range of social media and productivity tools.
              </p>
            </div>
            <div className="relative flex flex-col items-center">
               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">2</div>
              <h3 className="mt-4 text-lg font-semibold">Enter Your Details</h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Provide a topic, keyword, or other details for our AI to work with.
              </p>
            </div>
            <div className="relative flex flex-col items-center">
               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">3</div>
              <h3 className="mt-4 text-lg font-semibold">Get Instant Results</h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Receive high-quality, ready-to-use content in just a few seconds.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="text-center">
             <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                Loved by Creators Worldwide
              </h2>
              <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl/relaxed">
                See what social media managers and content creators are saying about our tools.
              </p>
          </div>
           <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 mt-12">
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">"This toolbox has been a game-changer for my workflow. I can generate a week's worth of content in an afternoon. Highly recommended!"</p>
                  <div className="flex items-center gap-4 pt-4">
                     <Avatar>
                      <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person face" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">Jessica Davis</p>
                      <p className="text-xs text-muted-foreground">Social Media Manager</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
               <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">"I was struggling with creative block, but the idea generators gave me the spark I needed. The viral hooks are pure gold!"</p>
                  <div className="flex items-center gap-4 pt-4">
                     <Avatar>
                      <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person" />
                      <AvatarFallback>MK</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">Mike Chen</p>
                      <p className="text-xs text-muted-foreground">YouTuber & Content Creator</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container text-center px-4 md:px-6">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to Elevate Your Content?
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mt-4">
            Stop guessing and start creating. Find the perfect tool for your needs and see the difference AI can make.
          </p>
          <div className="mt-8">
            <Link href="/tools">
              <Button size="lg">
                Explore All Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

    