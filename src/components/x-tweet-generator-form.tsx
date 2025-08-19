'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Sparkles, Twitter } from 'lucide-react';

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
import { generateTwitterContent } from '@/ai/flows/generate-twitter-content';
import { GeneratedContent } from './GeneratedContent';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';

const formSchema = z.object({
  topic: z
    .string()
    .min(3, 'Please enter a topic with at least 3 characters.'),
  context: z.string().optional(),
  tweetsQuantity: z.number().min(1).max(10).default(3),
  maxWords: z.coerce.number().min(5).max(500).optional(),
});

type TwitterResult = {
  tweets: string[];
  hashtags: string[]; // This will be empty
};

export default function XTweetGeneratorForm() {
  const { toast } = useToast();
  const [result, setResult] = useState<TwitterResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      context: '',
      tweetsQuantity: 3,
      maxWords: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await generateTwitterContent(values);
      setResult(response);
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate content. Please try again.',
      });
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Twitter /> Tweet Generator
        </CardTitle>
        <CardDescription>
          Generate engaging tweets for your X profile.
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
                  <FormLabel>Topic / Idea</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., The future of AI, a new feature launch" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="context"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Context (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Provide any extra details, links, or keywords to include." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tweetsQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Tweets: {field.value}</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={10}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="maxWords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Words per Tweet (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="5"
                      max="500"
                      placeholder="e.g., 50"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === '' ? undefined : value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto bg-foreground text-background hover:bg-foreground/80">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              {result ? 'Regenerate' : 'Generate'} Tweets
            </Button>
          </form>
        </Form>
        {isLoading && (
            <div className="text-center p-8 space-y-2">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-foreground" />
                <p className="text-muted-foreground">Generating viral tweets...</p>
            </div>
        )}
        {result && (
          <div className="mt-8 space-y-6">
            <GeneratedContent title="Generated Tweets" items={result.tweets} variant="paragraph" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
