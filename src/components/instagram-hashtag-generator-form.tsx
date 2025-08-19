"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { handleGenerateHashtags } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useEffect, useMemo, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Clipboard } from "lucide-react";

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

export default function InstagramHashtagGeneratorForm() {
  const [state, formAction] = useActionState(handleGenerateHashtags, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  
  const uniqueHashtags = useMemo(() => {
    if (!state.hashtags) return [];
    return [...new Set(state.hashtags)];
  }, [state.hashtags]);

  useEffect(() => {
    if (state.message) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
    if (state.hashtags && state.hashtags.length > 0) {
      setSelectedHashtags([]); // Reset selection when new hashtags are generated
    }
  }, [state, toast]);
  
  const handleHashtagClick = (tag: string) => {
    setSelectedHashtags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }

  const copySelected = () => {
    if (selectedHashtags.length > 0) {
      const selectedText = selectedHashtags.join(" ");
      navigator.clipboard.writeText(selectedText);
      toast({
        description: `${selectedHashtags.length} hashtag(s) copied to clipboard!`,
      });
    } else {
      toast({
        variant: "destructive",
        description: "No hashtags selected to copy.",
      });
    }
  };

  const copyAll = () => {
    if (uniqueHashtags.length > 0) {
      const allHashtags = uniqueHashtags.join(" ");
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
            placeholder="e.g., A minimalist desk setup with a laptop and a cup of coffee"
            required
            rows={3}
          />
          <SubmitButton />
        </form>

        {uniqueHashtags.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline text-lg font-semibold">Generated Hashtags:</h3>
              <Button variant="outline" size="sm" onClick={copySelected} disabled={selectedHashtags.length === 0}>
                <Clipboard className="mr-2 h-4 w-4" />
                Copy Selected
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {uniqueHashtags.map((tag: string) => (
                <Badge
                  key={tag}
                  variant={selectedHashtags.includes(tag) ? "default" : "secondary"}
                  className="cursor-pointer transition-all"
                  onClick={() => handleHashtagClick(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      {uniqueHashtags.length > 0 && (
        <CardFooter>
          <Button variant="outline" onClick={copyAll} className="w-full">
            Copy All
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
