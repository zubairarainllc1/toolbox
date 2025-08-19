"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { handleGenerateYoutubeTitle } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Clipboard } from "lucide-react";

const initialState = {
  titles: [],
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Generating..." : "Generate Titles"}
    </Button>
  );
}

export default function YoutubeTitleGeneratorForm() {
  const [state, formAction] = useActionState(handleGenerateYoutubeTitle, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
     if (state.titles && state.titles.length > 0) {
      toast({
        title: "Success!",
        description: "New titles generated.",
      });
    }
  }, [state, toast]);

  const copyTitle = (title: string) => {
    navigator.clipboard.writeText(title);
    toast({
      description: "Title copied to clipboard!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Video Description</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <Textarea
            name="description"
            placeholder="e.g., A tutorial on how to build a mechanical keyboard from scratch, including sourcing parts and soldering."
            required
            rows={4}
          />
          <SubmitButton />
        </form>

        {state.titles && state.titles.length > 0 && (
          <div className="mt-8">
            <h3 className="font-headline text-lg font-semibold mb-4">Generated Titles:</h3>
            <ul className="space-y-3">
              {state.titles.map((title: string, index: number) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-3 p-3 rounded-md border bg-secondary/50"
                >
                  <span className="text-sm">{title}</span>
                  <Button variant="ghost" size="icon" onClick={() => copyTitle(title)}>
                    <Clipboard className="h-4 w-4" />
                    <span className="sr-only">Copy title</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
