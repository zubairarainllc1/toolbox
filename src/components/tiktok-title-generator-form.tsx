'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Sparkles, Clipboard } from 'lucide-react';
import * as React from 'react';

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
import { handleGenerateTikTokTitle } from '@/app/actions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const TikTokIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => 
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props
  }, React.createElement('path', { d: "M16.17 6.17a4.004 4.004 0 0 0-3.34-3.34V16a4 4 0 1 1-4-4h2.5" }));

const formSchema = z.object({
  topic: z
    .string()
    .min(3, 'Please enter a topic with at least 3 characters.'),
  keywords: z.string().optional(),
  tone: z.enum(['professional', 'casual', 'funny', 'inspirational', 'witty', 'informative']),
});

type TikTokResult = {
  titles: string[];
};

export function TikTokTitleTool() {
  const { toast } = useToast();
  const [result, setResult] = useState<TikTokResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      keywords: '',
      tone: 'informative',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await handleGenerateTikTokTitle(values);
      if(response.titles) {
        setResult(response);
      } else {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: response.message || 'Failed to generate titles. Please try again.',
        });
      }
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: e.message || 'Failed to generate titles. Please try again.',
      });
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const copyTitle = (title: string) => {
    navigator.clipboard.writeText(title);
    toast({
      description: 'Title copied to clipboard!',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><TikTokIcon className="h-6 w-6" />TikTok Title Generator</CardTitle>
        <CardDescription>
          Generate catchy titles for your TikTok videos.
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
                  <FormLabel>Video Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Easy 3-ingredient recipes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Keywords (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., cooking, life hack, DIY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tone of Voice</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a tone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="informative">Informative</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="funny">Funny</SelectItem>
                      <SelectItem value="inspirational">Inspirational</SelectItem>
                      <SelectItem value="witty">Witty</SelectItem>
                    </SelectContent>
                  </Select>
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
              {result ? 'Regenerate' : 'Generate'} Titles
            </Button>
          </form>
        </Form>
        {isLoading && (
            <div className="text-center p-8 space-y-2">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-foreground" />
                <p className="text-muted-foreground">Generating viral titles...</p>
            </div>
        )}
        {result && (
          <div className="mt-8">
            <h3 className="font-headline text-lg font-semibold mb-4">Generated Titles:</h3>
            <ul className="space-y-3">
              {result.titles.map((title: string, index: number) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-3 p-3 rounded-md border bg-secondary/50 cursor-pointer transition-colors hover:bg-secondary"
                  onClick={() => copyTitle(title)}
                >
                  <span className="text-sm flex-grow">{title}</span>
                   <Button variant="ghost" size="icon">
                    <Clipboard className="h-4 w-4" />
                    <span className="sr-only">Copy title</span>
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
