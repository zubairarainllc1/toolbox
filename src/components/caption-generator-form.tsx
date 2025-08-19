"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { handleGenerateCaption } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Bot, Clipboard, ClipboardCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const initialState = {
  caption: "",
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Generating..." : "Generate Caption"}
    </Button>
  );
}

export default function CaptionGeneratorForm() {
  const [state, formAction] = useActionState(handleGenerateCaption, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (state.message) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
    if (state.caption) {
      toast({
        title: "Success!",
        description: "Your new caption has been generated.",
      });
    }
  }, [state, toast]);

  const handleCopy = () => {
    if (state.caption) {
      navigator.clipboard.writeText(state.caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        description: "Caption copied to clipboard.",
      });
    }
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

        {state.caption && (
          <div className="mt-8">
            <Alert>
              <Bot className="h-4 w-4" />
              <AlertTitle className="font-headline flex items-center justify-between">
                Generated Caption
                <Button variant="ghost" size="icon" onClick={handleCopy}>
                  {copied ? (
                    <ClipboardCheck className="h-4 w-4" />
                  ) : (
                    <Clipboard className="h-4 w-4" />
                  )}
                  <span className="sr-only">Copy caption</span>
                </Button>
              </AlertTitle>
              <AlertDescription className="pt-2">
                <Textarea readOnly value={state.caption} rows={5} className="mt-2 text-base"/>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
