
import ToolSearch from "@/components/tool-search";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const featuredPost = {
  title: "The Ultimate Guide to Creating Viral Content in 2025",
  description: "Discover the secrets to crafting content that captures attention, engages your audience, and achieves maximum reach across all social media platforms. We dive deep into the strategies that top creators are using right now.",
  imageUrl: "https://placehold.co/1200x600.png",
  dataAiHint: "digital marketing content creation",
  href: "#",
  category: "Content Strategy",
};

const recentPosts = [
    {
        title: "5 SEO Tricks to Instantly Boost Your Blog Traffic",
        description: "Learn simple, effective SEO techniques that you can implement today to see a noticeable increase in your website's organic traffic.",
        imageUrl: "https://placehold.co/600x400.png",
        dataAiHint: "seo analytics",
        href: "#",
        category: "SEO",
    },
    {
        title: "How AI is Revolutionizing Social Media Marketing",
        description: "Explore the ways artificial intelligence is changing the game for marketers, from content generation to audience targeting.",
        imageUrl: "https://placehold.co/600x400.png",
        dataAiHint: "artificial intelligence social media",
        href: "#",
        category: "Artificial Intelligence",
    },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          The Toolbox Blog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Tips, tricks, and tutorials on content creation, marketing, and productivity.
        </p>
        <div className="mt-8 flex justify-center">
            <ToolSearch />
        </div>
      </div>

      {/* Featured Post */}
      <Card className="overflow-hidden mb-12">
        <div className="md:grid md:grid-cols-2">
            <div className="p-8 flex flex-col justify-center">
                <CardHeader className="p-0 mb-4">
                    <span className="text-sm font-semibold text-primary">{featuredPost.category}</span>
                    <CardTitle className="text-3xl font-headline mt-1">{featuredPost.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <CardDescription className="text-base">{featuredPost.description}</CardDescription>
                    <Link href={featuredPost.href}>
                        <Button variant="link" className="px-0 mt-4 text-base">
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </CardContent>
            </div>
            <div className="relative h-64 md:h-full">
                <Image
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={featuredPost.dataAiHint}
                />
            </div>
        </div>
      </Card>
      
      {/* Recent Posts */}
       <div>
         <h2 className="text-3xl font-bold font-headline mb-8 text-center">Recent Posts</h2>
         <div className="grid gap-8 md:grid-cols-2">
            {recentPosts.map((post) => (
                <Card key={post.title} className="overflow-hidden flex flex-col">
                   <div className="relative h-56 w-full">
                     <Image
                        src={post.imageUrl}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint={post.dataAiHint}
                    />
                   </div>
                   <div className="p-6 flex flex-col flex-grow">
                        <span className="text-sm font-semibold text-primary">{post.category}</span>
                        <h3 className="text-xl font-bold font-headline mt-2">{post.title}</h3>
                        <p className="mt-2 text-muted-foreground flex-grow">{post.description}</p>
                        <Link href={post.href}>
                            <Button variant="link" className="px-0 mt-4">
                                Read More <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                   </div>
                </Card>
            ))}
         </div>
       </div>

    </div>
  );
}
