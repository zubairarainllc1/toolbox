"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { handleGenerateInstagramHashtags } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Clipboard, Instagram, Sparkles, Check } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";

const initialState = {
  hashtags: [],
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Generating..." : "Generate Hashtags"}
      <Sparkles className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default function InstagramHashtagGeneratorForm() {
  const [state, formAction] = useActionState(handleGenerateInstagramHashtags, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [allCopied, setAllCopied] = useState(false);

  useEffect(() => {
    if (state.message) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
    if (state.hashtags && state.hashtags.length > 0) {
      toast({
        title: "Success!",
        description: "Your new hashtags have been generated.",
      });
      setSelectedHashtags(state.hashtags);
      setAllCopied(false);
    }
  }, [state, toast]);

  const handleHashtagClick = (tag: string) => {
    setSelectedHashtags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const copySelectedHashtags = () => {
    if (selectedHashtags.length === 0) {
      toast({
        variant: "destructive",
        description: "No hashtags selected.",
      });
      return;
    }
    navigator.clipboard.writeText(selectedHashtags.join(' '));
    toast({
      description: `${selectedHashtags.length} hashtags copied to clipboard.`,
    });
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center gap-2"><Instagram />Generator</CardTitle>
        <CardDescription>Generate viral hashtags to boost your reach.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic / Niche</Label>
            <Input
              id="topic"
              name="topic"
              placeholder="e.g., Healthy Recipes, DIY Home Decor"
              required
            />
          </div>
                    
          <SubmitButton />
        </form>

        {state.hashtags && state.hashtags.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline text-lg font-semibold">Generated Hashtags ({selectedHashtags.length}/{state.hashtags.length})</h3>
              <Button variant="outline" size="sm" onClick={copySelectedHashtags}>
                {allCopied ? <Check className="mr-2 h-4 w-4 text-green-500"/> : <Clipboard className="mr-2 h-4 w-4" />}
                {allCopied ? 'Copied!' : 'Copy Selected'}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {state.hashtags.map((tag: string, index: number) => (
                <Badge
                  key={`${tag}-${index}`}
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
    </Card>
  );
}
