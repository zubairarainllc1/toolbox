import { HardHat } from 'lucide-react';

export default function ComingSoon({ toolName }: { toolName?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-center p-4">
      <HardHat className="h-16 w-16 mb-4 text-primary" />
      <h1 className="text-4xl font-bold font-headline mb-2">Coming Soon!</h1>
      <p className="text-lg text-muted-foreground">
        {toolName ? `The ${toolName} tool is` : 'This tool is'} under construction.
      </p>
      <p className="text-muted-foreground">We're working hard to bring it to you.</p>
    </div>
  );
}
