
import { Separator } from "@/components/ui/separator";

export default function RelatedBlogsSection() {
  return (
    <div className="mt-16 mb-8">
      <div className="relative flex items-center justify-center">
        <Separator className="absolute w-full" />
        <h2 className="relative bg-background px-4 text-lg font-medium text-muted-foreground">
          Related Blogs
        </h2>
      </div>
    </div>
  );
}
