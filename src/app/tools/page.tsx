import { tools, toolCategories, categoryIcons } from "@/lib/tools";
import type { Tool, ToolCategory } from "@/lib/tools";
import ToolCard from "@/components/tool-card";

export default function ToolsPage() {
  const categorizedTools = toolCategories.reduce((acc, category) => {
    const toolsInCategory = tools.filter((tool) => tool.category === category);
    if (toolsInCategory.length > 0) {
      acc[category] = toolsInCategory;
    }
    return acc;
  }, {} as Record<ToolCategory, Tool[]>);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          All Tools
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Browse our full suite of tools designed to enhance your productivity and creativity.
        </p>
      </div>

      <div className="space-y-16">
        {toolCategories.map((category) => {
          if (!categorizedTools[category]) return null;
          const Icon = categoryIcons[category];
          return (
            <div key={category}>
              <div className="flex items-center gap-3 mb-6">
                <Icon className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl">
                  {category}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categorizedTools[category].map((tool) => (
                  <ToolCard key={tool.href} {...tool} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
