"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { handleGenerateYoutubeViralHooks } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Youtube, Clipboard } from "lucide-react";

const initialState = {
  hooks: [],
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        "Generating Hooks..."
      ) : (
        <>
          Generate Hooks
          <Sparkles className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

export default function YoutubeViralHooksGeneratorForm() {
  const [state, formAction] = useActionState(handleGenerateYoutubeViralHooks, initialState);
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
     if (state.hooks && state.hooks.length > 0) {
      toast({
        title: "Success!",
        description: "New viral hooks generated.",
      });
    }
  }, [state, toast]);

  const copyHook = (hook: string) => {
    navigator.clipboard.writeText(hook);
    toast({
      description: "Hook copied to clipboard!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center gap-2">
            <Youtube />
            YouTube Viral Hooks Generator
        </CardTitle>
        <CardDescription>Enter a topic to get viral video hooks.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <Input
            name="topic"
            placeholder="e.g., '10 facts about the ocean' or 'My daily routine'"
            required
          />
          <SubmitButton />
        </form>

        {state.hooks && state.hooks.length > 0 && (
          <div className="mt-8">
            <h3 className="font-headline text-lg font-semibold mb-4">Generated Hooks:</h3>
            <ul className="space-y-3">
              {state.hooks.map((hook: string, index: number) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-3 p-3 rounded-md border bg-secondary/50 cursor-pointer transition-colors hover:bg-secondary"
                  onClick={() => copyHook(hook)}
                >
                  <span className="text-sm flex-grow">{hook}</span>
                   <Button variant="ghost" size="icon">
                    <Clipboard className="h-4 w-4" />
                    <span className="sr-only">Copy hook</span>
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
