
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Sparkles, Instagram, Clipboard } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateInstagramCaptions } from '@/ai/flows/generate-instagram-captions';
import { Checkbox } from './ui/checkbox';

const formSchema = z.object({
  topic: z
    .string()
    .min(3, 'Please enter a topic with at least 3 characters.'),
  includeEmojis: z.boolean().default(false).optional(),
});

type InstagramResult = {
  captions: string[];
};

export default function InstagramCaptionGeneratorForm() {
  const { toast } = useToast();
  const [result, setResult] = useState<InstagramResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      includeEmojis: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await generateInstagramCaptions(values);
      setResult(response);
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate captions. Please try again.',
      });
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const copyCaption = (caption: string) => {
    navigator.clipboard.writeText(caption);
    toast({
      description: 'Caption copied to clipboard!',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Instagram /> Instagram Caption Generator</CardTitle>
        <CardDescription>
          Create engaging captions for your Instagram posts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic / Keyword</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Healthy Recipes, DIY Home Decor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="includeEmojis"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Include Emojis
                    </FormLabel>
                     <p className="text-sm text-muted-foreground">
                      Add 1-2 relevant emojis to each caption.
                    </p>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto bg-foreground text-background hover:bg-foreground/80">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              {result ? 'Regenerate' : 'Generate'} Captions
            </Button>
          </form>
        </Form>
        {isLoading && (
            <div className="text-center p-8 space-y-2">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-foreground" />
                <p className="text-muted-foreground">Crafting compelling captions...</p>
            </div>
        )}
        {result && (
          <div className="mt-8">
            <h3 className="font-headline text-lg font-semibold mb-4">Generated Captions:</h3>
            <ul className="space-y-3">
              {result.captions.map((caption: string, index: number) => (
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
