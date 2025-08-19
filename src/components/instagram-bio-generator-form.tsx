"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { handleGenerateInstagramBio } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Bot, Clipboard, ClipboardCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const initialState = {
  bio: "",
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Generating..." : "Generate Bio"}
    </Button>
  );
}

export default function InstagramBioGeneratorForm() {
  const [state, formAction] = useActionState(handleGenerateInstagramBio, initialState);
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
    if (state.bio) {
      toast({
        title: "Success!",
        description: "Your new bio has been generated.",
      });
    }
  }, [state, toast]);

  const handleCopy = () => {
    if (state.bio) {
      navigator.clipboard.writeText(state.bio);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        description: "Bio copied to clipboard.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Bio Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="e.g., A freelance photographer specializing in portraits and travel."
              required
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              name="keywords"
              placeholder="e.g., photography, travel, art, creator"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select name="tone" defaultValue="professional">
              <SelectTrigger id="tone">
                <SelectValue placeholder="Select a tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="witty">Witty</SelectItem>
                <SelectItem value="artistic">Artistic</SelectItem>
                <SelectItem value="minimalist">Minimalist</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <SubmitButton />
        </form>

        {state.bio && (
          <div className="mt-8">
            <Alert>
              <Bot className="h-4 w-4" />
              <AlertTitle className="font-headline flex items-center justify-between">
                Generated Bio
                <Button variant="ghost" size="icon" onClick={handleCopy}>
                  {copied ? (
                    <ClipboardCheck className="h-4 w-4" />
                  ) : (
                    <Clipboard className="h-4 w-4" />
                  )}
                  <span className="sr-only">Copy bio</span>
                </Button>
              </AlertTitle>
              <AlertDescription className="pt-2">
                <Textarea readOnly value={state.bio} rows={4} className="mt-2 text-base"/>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
