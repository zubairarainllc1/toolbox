import ImageConverter from "@/components/image-converter";
import RelatedBlogsSection from "@/components/related-blogs-section";
import { Image } from "lucide-react";

export default function ImageConverterPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-6">
            <Image className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold font-headline sm:text-5xl">
              Image Converter
            </h1>
          </div>
          <p className="max-w-2xl text-muted-foreground md:text-lg">
            Easily convert your images to different formats like JPG, PNG, or WebP.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <ImageConverter />
        </div>
      </div>
      <RelatedBlogsSection />
    </>
  );
}
