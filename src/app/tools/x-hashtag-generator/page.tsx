import XHashtagGeneratorForm from "@/components/x-hashtag-generator-form";
import { Hash, Twitter } from "lucide-react";

export default function XHashtagGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-6">
          <Twitter className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold font-headline sm:text-5xl">
            X (Twitter) Hashtag Generator
          </h1>
        </div>
        <p className="max-w-2xl text-muted-foreground md:text-lg">
          Generate viral hashtags to boost your reach. Enter a topic, and we'll handle the rest.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <XHashtagGeneratorForm />
      </div>
    </div>
  );
}
