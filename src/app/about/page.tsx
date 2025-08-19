import { Users, Target, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            About Toolbox
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl">
            We're building the next generation of AI-powered tools to help you create content that clicks, captivates, and converts.
          </p>
        </div>

        {/* Mission and Vision Section */}
        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-headline text-3xl font-bold">Our Mission</h2>
            <p className="mt-4 text-muted-foreground">
              To empower creators, marketers, and businesses with intelligent, intuitive, and time-saving tools that streamline workflows and amplify creativity. We believe that great ideas shouldn't be limited by writer's block or tedious tasks.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
              <Eye className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-headline text-3xl font-bold">Our Vision</h2>
            <p className="mt-4 text-muted-foreground">
              We envision a world where anyone can produce high-quality, engaging content effortlessly. Our goal is to be the ultimate all-in-one toolkit that turns your creative vision into reality, one click at a time.
            </p>
          </div>
        </div>

        {/* Meet the Team Section */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              Meet the Innovators
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              The passionate minds behind the magic.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                 <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person face" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h3 className="font-headline text-xl font-semibold">Jane Doe</h3>
                <p className="text-primary">Founder & CEO</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  The visionary who started it all, driven by a passion for technology and creativity.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <h3 className="font-headline text-xl font-semibold">John Smith</h3>
                <p className="text-primary">Lead AI Engineer</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  The brilliant mind architecting the AI models that power our tools.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="woman face" />
                  <AvatarFallback>EM</AvatarFallback>
                </Avatar>
                <h3 className="font-headline text-xl font-semibold">Emily White</h3>
                <p className="text-primary">Head of Product</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Ensuring our tools are not only powerful but also intuitive and delightful to use.
                </p>
              </CardContent>
            </Card>
             <Card className="text-center">
              <CardContent className="pt-6">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="man face" />
                  <AvatarFallback>CB</AvatarFallback>
                </Avatar>
                <h3 className="font-headline text-xl font-semibold">Chris Brown</h3>
                <p className="text-primary">UX/UI Designer</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  The creative force behind our clean, modern, and user-friendly design.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
