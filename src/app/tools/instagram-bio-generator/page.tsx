import InstagramBioGeneratorForm from "@/components/instagram-bio-generator-form";
import RelatedBlogsSection from "@/components/related-blogs-section";
import { Sparkles } from "lucide-react";

export default function InstagramBioGeneratorPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold font-headline sm:text-5xl">
              Instagram Bio Generator
            </h1>
          </div>
          <p className="max-w-2xl text-muted-foreground md:text-lg">
            Craft the perfect bio to attract followers. Describe yourself or your brand, and let our AI do the rest.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <InstagramBioGeneratorForm />
        </div>
      </div>
      <RelatedBlogsSection />
    </>
  );
}
