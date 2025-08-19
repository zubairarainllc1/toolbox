'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Sparkles, Twitter, Clipboard } from 'lucide-react';

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
import { handleGenerateTwitterContent } from '@/app/actions';
import { Textarea } from './ui/textarea';

const formSchema = z.object({
  topic: z
    .string()
    .min(3, 'Please enter a topic with at least 3 characters.'),
  context: z.string().optional(),
  maxWords: z.coerce.number().min(5).max(1000).optional(),
});

type TwitterResult = {
  tweets: string[];
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
      maxWords: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('topic', values.topic);
      if (values.context) {
        formData.append('context', values.context);
      }
      if (values.maxWords) {
        formData.append('maxWords', String(values.maxWords));
      }

      const response = await handleGenerateTwitterContent({}, formData);
      if(response.tweets) {
        setResult(response);
      } else if (response.message) {
         toast({
          variant: 'destructive',
          title: 'Error',
          description: response.message,
        });
      }
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

  const copyTweet = (tweet: string) => {
    navigator.clipboard.writeText(tweet);
    toast({
      description: 'Tweet copied to clipboard!',
    });
  };

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
              name="maxWords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Words per Tweet (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="5"
                      max="1000"
                      placeholder="e.g., 50"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === '' ? undefined : Number(value));
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
          <div className="mt-8">
            <h3 className="font-headline text-lg font-semibold mb-4">Generated Tweets:</h3>
            <ul className="space-y-3">
              {result.tweets.map((tweet: string, index: number) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-3 p-3 rounded-md border bg-secondary/50 cursor-pointer transition-colors hover:bg-secondary"
                  onClick={() => copyTweet(tweet)}
                >
                  <span className="text-sm flex-grow">{tweet}</span>
                   <Button variant="ghost" size="icon">
                    <Clipboard className="h-4 w-4" />
                    <span className="sr-only">Copy tweet</span>
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
