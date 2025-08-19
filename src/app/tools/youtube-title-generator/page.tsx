import YoutubeTitleGeneratorForm from "@/components/youtube-title-generator-form";
import { Type } from "lucide-react";

export default function YoutubeTitleGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-6">
          <Type className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold font-headline sm:text-5xl">
            YouTube Title Generator
          </h1>
        </div>
        <p className="max-w-2xl text-muted-foreground md:text-lg">
          Create catchy titles to increase your video views. Describe your video to get title suggestions.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <YoutubeTitleGeneratorForm />
      </div>
    </div>
  );
}
