"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { handleGenerateXContentIdeas } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { ListChecks } from "lucide-react";

const initialState = {
  ideas: [],
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Generating..." : "Generate Ideas"}
    </Button>
  );
}

export default function XContentIdeasForm() {
  const [state, formAction] = useActionState(handleGenerateXContentIdeas, initialState);
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
        description: "New content ideas generated.",
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
        <CardTitle className="font-headline text-xl">Topic</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <Input
            name="topic"
            placeholder="e.g., The future of AI in content creation"
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
                  <ListChecks className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
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
