import BlogGeneratorForm from "@/components/blog-generator-form";
import { PenSquare } from "lucide-react";

export default function BlogGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-6">
          <PenSquare className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold font-headline sm:text-5xl">
            AI Blog Post Generator
          </h1>
        </div>
        <p className="max-w-2xl text-muted-foreground md:text-lg">
          Generate a full-length, SEO-friendly blog post from a single topic.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-4xl">
        <BlogGeneratorForm />
      </div>
    </div>
  );
}
