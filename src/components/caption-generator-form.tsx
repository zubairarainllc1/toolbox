"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { handleGenerateCaption } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Clipboard } from "lucide-react";

const initialState = {
  captions: [],
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Generating..." : "Generate Captions"}
    </Button>
  );
}

export default function CaptionGeneratorForm() {
  const [state, formAction] = useActionState(handleGenerateCaption, initialState);
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
    if (state.captions && state.captions.length > 0) {
      toast({
        title: "Success!",
        description: "Your new captions have been generated.",
      });
    }
  }, [state, toast]);

  const copyCaption = (caption: string) => {
    navigator.clipboard.writeText(caption);
    toast({
      description: "Caption copied to clipboard.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Describe Your Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-6">
          <Textarea
            name="postDescription"
            placeholder="e.g., A beautiful sunset over the ocean with vibrant colors."
            required
            rows={4}
          />
          <SubmitButton />
        </form>

        {state.captions && state.captions.length > 0 && (
          <div className="mt-8">
            <h3 className="font-headline text-lg font-semibold mb-4">Generated Captions:</h3>
            <ul className="space-y-3">
              {state.captions.map((caption: string, index: number) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-3 p-3 rounded-md border bg-secondary/50"
                >
                  <span className="text-sm">{caption}</span>
                  <Button variant="ghost" size="icon" onClick={() => copyCaption(caption)}>
                    <Clipboard className="h-4 w-4" />
                    <span className="sr-only">Copy caption</span>
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
