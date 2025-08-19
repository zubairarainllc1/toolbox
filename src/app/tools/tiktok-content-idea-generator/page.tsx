import TikTokContentIdeaGeneratorForm from "@/components/tiktok-content-idea-generator-form";
import { Lightbulb } from "lucide-react";
import * as React from 'react';


const TikTokIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => 
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props
  }, React.createElement('path', { d: "M16.17 6.17a4.004 4.004 0 0 0-3.34-3.34V16a4 4 0 1 1-4-4h2.5" }));


export default function TikTokContentIdeaGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-6">
          <TikTokIcon className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold font-headline sm:text-5xl">
            TikTok Content Idea Generator
          </h1>
        </div>
        <p className="max-w-2xl text-muted-foreground md:text-lg">
          Generate viral video ideas for your TikTok channel. Just enter a topic to get started.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <TikTokContentIdeaGeneratorForm />
      </div>
    </div>
  );
}
