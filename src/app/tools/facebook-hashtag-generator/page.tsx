import FacebookHashtagGeneratorForm from "@/components/facebook-hashtag-generator-form";
import RelatedBlogsSection from "@/components/related-blogs-section";
import { Hash } from "lucide-react";

export default function FacebookHashtagGeneratorPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-6">
            <Hash className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold font-headline sm:text-5xl">
              Facebook Hashtag Generator
            </h1>
          </div>
          <p className="max-w-2xl text-muted-foreground md:text-lg">
            Generate viral hashtags to boost your reach. Enter a topic, and we'll handle the rest.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <FacebookHashtagGeneratorForm />
        </div>
      </div>
      <RelatedBlogsSection />
    </>
  );
}
