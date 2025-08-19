import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Tool } from "@/lib/tools";
import { ArrowRight } from "lucide-react";

export default function ToolCard({ title, description, href, icon: Icon, comingSoon }: Tool) {
  const content = (
    <Card className="h-full flex flex-col group transition-all duration-300 hover:border-primary/80 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium font-headline">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
      <div className="p-4 pt-0 flex justify-between items-center">
        {comingSoon ? (
          <Badge variant="outline">Coming Soon</Badge>
        ) : (
          <div className="flex items-center text-xs text-primary group-hover:underline">
            Open Tool <ArrowRight className="ml-1 h-3 w-3" />
          </div>
        )}
      </div>
    </Card>
  );

  if (comingSoon) {
    return <div className="cursor-not-allowed">{content}</div>;
  }

  return (
    <Link href={href}>
      {content}
    </Link>
  );
}
