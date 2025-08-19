"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { handleGenerateFacebookPost } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Clipboard } from "lucide-react";

const initialState = {
  posts: [],
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Generating..." : "Generate Posts"}
    </Button>
  );
}

export default function FacebookPostGeneratorForm() {
  const [state, formAction] = useActionState(handleGenerateFacebookPost, initialState);
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
    if (state.posts && state.posts.length > 0) {
      toast({
        title: "Success!",
        description: "Your new posts have been generated.",
      });
    }
  }, [state, toast]);

  const copyPost = (post: string) => {
    navigator.clipboard.writeText(post);
    toast({
      description: "Post copied to clipboard.",
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
            placeholder="e.g., Announcing a summer sale with 20% off all items."
            required
            rows={4}
          />
          <SubmitButton />
        </form>

        {state.posts && state.posts.length > 0 && (
          <div className="mt-8">
            <h3 className="font-headline text-lg font-semibold mb-4">Generated Posts:</h3>
            <ul className="space-y-3">
              {state.posts.map((post: string, index: number) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-3 p-3 rounded-md border bg-secondary/50"
                >
                  <span className="text-sm">{post}</span>
                  <Button variant="ghost" size="icon" onClick={() => copyPost(post)}>
                    <Clipboard className="h-4 w-4" />
                    <span className="sr-only">Copy post</span>
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
