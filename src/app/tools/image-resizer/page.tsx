import ImageResizer from "@/components/image-resizer";
import { Scissors } from "lucide-react";

export default function ImageResizerPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-6">
          <Scissors className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold font-headline sm:text-5xl">
            Image Resizer
          </h1>
        </div>
        <p className="max-w-2xl text-muted-foreground md:text-lg">
          Quickly resize your images to the perfect dimensions for any platform.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-2xl">
        <ImageResizer />
      </div>
    </div>
  );
}
