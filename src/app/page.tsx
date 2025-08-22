
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BotMessageSquare, Sparkles, Zap, Instagram, Youtube, Facebook, Palette, Briefcase, Twitter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
            <div className="mt-12 flex justify-center">
              <Link href="/tools">
                <Button variant="outline" size="lg" className="border-primary/50 hover:bg-accent">
                    Explore All Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                Why Choose Toolbox?
              </h2>
              <h3 className="font-headline text-2xl font-bold tracking-tighter sm:text-4xl text-muted-foreground">
                Work Smarter, Not Harder
              </h3>
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
              <h3 className="text-xl font-bold font-headline">Instant Content</h3>
              <p className="text-muted-foreground">
                Beat writer's block forever. Generate blog posts, captions, and ideas in seconds, not hours.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                 <BotMessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-headline">Optimize for Engagement</h3>
              <p className="text-muted-foreground">
                Create viral hooks, engaging captions, and optimized descriptions designed to capture attention.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-headline">Endless Creativity</h3>
              <p className="text-muted-foreground">
                Never run out of inspiration. Get a constant stream of fresh, relevant ideas for any topic or niche.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Overview Section */}
       <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                A Tool for Every Need
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From social media to productivity, we have the right tool for the job.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-stretch gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4 mt-12">
            <Card className="flex flex-col justify-center items-center text-center p-6">
              <Instagram className="h-10 w-10 mb-4 text-primary" />
              <h3 className="text-lg font-bold font-headline">Instagram</h3>
              <p className="text-sm text-muted-foreground">Captions, Hashtags, Bios & More</p>
            </Card>
            <Card className="flex flex-col justify-center items-center text-center p-6">
              <Youtube className="h-10 w-10 mb-4 text-primary" />
              <h3 className="text-lg font-bold font-headline">YouTube</h3>
              <p className="text-sm text-muted-foreground">Titles, Descriptions, Hooks & Ideas</p>
            </Card>
             <Card className="flex flex-col justify-center items-center text-center p-6">
              <Facebook className="h-10 w-10 mb-4 text-primary" />
              <h3 className="text-lg font-bold font-headline">Facebook</h3>
              <p className="text-sm text-muted-foreground">Captions & Hashtags</p>
            </Card>
            <Card className="flex flex-col justify-center items-center text-center p-6">
              <Twitter className="h-10 w-10 mb-4 text-primary" />
              <h3 className="text-lg font-bold font-headline">X (Twitter)</h3>
              <p className="text-sm text-muted-foreground">Tweet Generation & More</p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                Get Started in 3 Easy Steps
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Using our tools is as simple as it gets. Go from idea to finished content in seconds.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-3 md:gap-12 mt-12">
            <div className="relative flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4">1</div>
              <h3 className="text-lg font-semibold">Choose Your Tool</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Select from our wide range of social media and productivity tools.
              </p>
            </div>
            <div className="relative flex flex-col items-center text-center">
               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4">2</div>
              <h3 className="text-lg font-semibold">Enter Your Details</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Provide a topic, keyword, or other details for our AI to work with.
              </p>
            </div>
            <div className="relative flex flex-col items-center text-center">
               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4">3</div>
              <h3 className="text-lg font-semibold">Get Instant Results</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Receive high-quality, ready-to-use content in just a few seconds.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Who is it for? section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
             <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                Built For Modern Creators
              </h2>
              <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl/relaxed">
                Whether you're a solo creator or a marketing pro, our tools are designed to fit your workflow.
              </p>
          </div>
           <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:grid-cols-3 lg:gap-12">
              <div className="grid gap-1 text-center">
                <Palette className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-headline text-xl font-bold">Content Creators</h3>
                <p className="text-muted-foreground">Fuel your YouTube, TikTok, and Instagram channels with endless ideas and perfectly crafted content.</p>
              </div>
              <div className="grid gap-1 text-center">
                <Briefcase className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-headline text-xl font-bold">Marketers</h3>
                <p className="text-muted-foreground">Streamline your content production and create high-performing copy for your campaigns in minutes.</p>
              </div>
              <div className="grid gap-1 text-center">
                <Sparkles className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-headline text-xl font-bold">Social Media Managers</h3>
                <p className="text-muted-foreground">Save time and eliminate stress by generating a full content calendar's worth of material effortlessly.</p>
              </div>
           </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
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
