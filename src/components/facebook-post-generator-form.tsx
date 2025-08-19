"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { handleGenerateFacebookPost } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Bot, Clipboard, ClipboardCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const initialState = {
  post: "",
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Generating..." : "Generate Post"}
    </Button>
  );
}

export default function FacebookPostGeneratorForm() {
  const [state, formAction] = useActionState(handleGenerateFacebookPost, initialState);
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
    if (state.post) {
      toast({
        title: "Success!",
        description: "Your new post has been generated.",
      });
    }
  }, [state, toast]);

  const handleCopy = () => {
    if (state.post) {
      navigator.clipboard.writeText(state.post);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        description: "Post copied to clipboard.",
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
            placeholder="e.g., Announcing a summer sale with 20% off all items."
            required
            rows={4}
          />
          <SubmitButton />
        </form>

        {state.post && (
          <div className="mt-8">
            <Alert>
              <Bot className="h-4 w-4" />
              <AlertTitle className="font-headline flex items-center justify-between">
                Generated Post
                <Button variant="ghost" size="icon" onClick={handleCopy}>
                  {copied ? (
                    <ClipboardCheck className="h-4 w-4" />
                  ) : (
                    <Clipboard className="h-4 w-4" />
                  )}
                  <span className="sr-only">Copy post</span>
                </Button>
              </AlertTitle>
              <AlertDescription className="pt-2">
                <Textarea readOnly value={state.post} rows={5} className="mt-2 text-base"/>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
