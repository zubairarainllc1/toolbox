'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Loader2, Sparkles, Facebook, Clipboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { handleGenerateFacebookCaptions } from '@/app/actions';

const initialState = {
  captions: [],
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto bg-foreground text-background hover:bg-foreground/80">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      Generate Captions
    </Button>
  );
}

export default function FacebookCaptionGeneratorForm() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(
    handleGenerateFacebookCaptions,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.message) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
    if (state.captions && state.captions.length > 0) {
      toast({
        title: 'Success!',
        description: 'New captions have been generated.',
      });
    }
  }, [state, toast]);

  const copyCaption = (caption: string) => {
    navigator.clipboard.writeText(caption);
    toast({
      description: 'Caption copied to clipboard!',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Facebook /> Facebook Caption Generator
        </CardTitle>
        <CardDescription>
          Create engaging captions for your Facebook posts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic / Keyword</Label>
            <Input
              id="topic"
              name="topic"
              placeholder="e.g., Summer sale, New product launch"
              required
            />
          </div>
          <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <Checkbox id="includeEmojis" name="includeEmojis" />
            <div className="space-y-1 leading-none">
              <Label htmlFor="includeEmojis">Include Emojis</Label>
              <p className="text-sm text-muted-foreground">
                Add 1-2 relevant emojis to each caption.
              </p>
            </div>
          </div>
          <SubmitButton />
        </form>

        {pending && (
          <div className="text-center p-8 space-y-2">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-foreground" />
            <p className="text-muted-foreground">
              Crafting compelling captions...
            </p>
          </div>
        )}
        {state.captions && state.captions.length > 0 && !pending && (
          <div className="mt-8">
            <h3 className="font-headline text-lg font-semibold mb-4">
              Generated Captions:
            </h3>
            <ul className="space-y-3">
              {state.captions.map((caption: string, index: number) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-3 p-3 rounded-md border bg-secondary/50 cursor-pointer transition-colors hover:bg-secondary"
                  onClick={() => copyCaption(caption)}
                >
                  <span className="text-sm flex-grow">{caption}</span>
                  <Button variant="ghost" size="icon">
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
