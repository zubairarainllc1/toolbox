import YoutubeIdeaGeneratorForm from "@/components/youtube-idea-generator-form";
import { Youtube } from "lucide-react";

export default function YoutubeIdeaGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-6">
          <Youtube className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold font-headline sm:text-5xl">
            YouTube Idea Generator
          </h1>
        </div>
        <p className="max-w-2xl text-muted-foreground md:text-lg">
          Generate creative video ideas for your channel. Just enter a topic to get started.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <YoutubeIdeaGeneratorForm />
      </div>
    </div>
  );
}
