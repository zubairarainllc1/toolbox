"use client";

import { useFormState, useFormStatus } from "react-dom";
import { handleGenerateFacebookHashtags } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  hashtags: [],
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Generating..." : "Generate Hashtags"}
    </Button>
  );
}

export default function FacebookHashtagGeneratorForm() {
  const [state, formAction] = useFormState(handleGenerateFacebookHashtags, initialState);
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
  }, [state.message, toast]);

  const copyAll = () => {
    if (state.hashtags && state.hashtags.length > 0) {
      const allHashtags = state.hashtags.join(" ");
      navigator.clipboard.writeText(allHashtags);
      toast({
        description: "All hashtags copied to clipboard!",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Post Description</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <Textarea
            name="description"
            placeholder="e.g., A new product launch for a sustainable coffee brand"
            required
            rows={3}
          />
          <SubmitButton />
        </form>

        {state.hashtags && state.hashtags.length > 0 && (
          <div className="mt-8">
            <h3 className="font-headline text-lg font-semibold mb-4">Generated Hashtags:</h3>
            <div className="flex flex-wrap gap-2">
              {state.hashtags.map((tag: string) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer transition-colors hover:bg-primary/80"
                  onClick={() => {
                    navigator.clipboard.writeText(tag);
                    toast({ description: `Copied "${tag}"` });
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      {state.hashtags && state.hashtags.length > 0 && (
        <CardFooter>
          <Button variant="outline" onClick={copyAll} className="w-full">
            Copy All
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
