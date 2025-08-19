"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { handleGenerateYoutubeContentIdeas } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Lightbulb, Sparkles, Youtube } from "lucide-react";

const initialState = {
  ideas: [],
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        "Generating Ideas..."
      ) : (
        <>
          Generate Ideas
          <Sparkles className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

export default function YoutubeContentIdeaGeneratorForm() {
  const [state, formAction] = useActionState(handleGenerateYoutubeContentIdeas, initialState);
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
     if (state.ideas && state.ideas.length > 0) {
      toast({
        title: "Success!",
        description: "New video ideas generated.",
      });
    }
  }, [state, toast]);

  const copyIdea = (idea: string) => {
    navigator.clipboard.writeText(idea);
    toast({
      description: "Idea copied to clipboard!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center gap-2">
            <Youtube />
            YouTube Idea Generator
        </CardTitle>
        <CardDescription>Enter a topic or niche to get video ideas.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <Input
            name="topic"
            placeholder="e.g., 'Beginner photography tips' or 'Travel vlogs'"
            required
          />
          <SubmitButton />
        </form>

        {state.ideas && state.ideas.length > 0 && (
          <div className="mt-8">
            <h3 className="font-headline text-lg font-semibold mb-4">Generated Ideas:</h3>
            <ul className="space-y-3">
              {state.ideas.map((idea: string, index: number) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-md border bg-secondary/50 cursor-pointer transition-colors hover:bg-secondary"
                  onClick={() => copyIdea(idea)}
                >
                  <Lightbulb className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                  <span className="text-sm">{idea}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
