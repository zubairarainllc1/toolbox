import XContentIdeasForm from "@/components/x-content-ideas-form";
import { Sparkles } from "lucide-react";

export default function XContentIdeasPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold font-headline sm:text-5xl">
            X Content Ideas
          </h1>
        </div>
        <p className="max-w-2xl text-muted-foreground md:text-lg">
          Get inspiration for your next viral tweet. Enter a topic and get a list of content ideas.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <XContentIdeasForm />
      </div>
    </div>
  );
}
