'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Sparkles, Youtube, Clipboard, Check } from 'lucide-react';

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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { handleGenerateYoutubeDescription } from '@/app/actions';

const formSchema = z.object({
  title: z
    .string()
    .min(10, 'Please enter a title with at least 10 characters.'),
  keywords: z.string().optional(),
});

export default function YoutubeDescriptionGeneratorForm() {
  const { toast } = useToast();
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      keywords: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    setCopied(false);
    try {
      const response = await handleGenerateYoutubeDescription(values);
      if (response.description) {
        setResult(response.description);
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
        description: 'Failed to generate description. Please try again.',
      });
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const copyDescription = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    toast({
      description: 'Description copied to clipboard!',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Youtube />
          Description Details
        </CardTitle>
        <CardDescription>
          Provide details about your video to generate a description.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., How to Make the Perfect Sourdough Bread"
                      {...field}
                    />
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
                  <FormLabel>Keywords (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., baking, sourdough, bread, tutorial, recipe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              {result ? 'Regenerate' : 'Generate'} Description
            </Button>
          </form>
        </Form>
        {isLoading && (
          <div className="text-center p-8 space-y-2">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-foreground" />
            <p className="text-muted-foreground">
              Writing an awesome description...
            </p>
          </div>
        )}
        {result && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline text-lg font-semibold">
                Generated Description:
              </h3>
              <Button variant="outline" size="sm" onClick={copyDescription}>
                {copied ? (
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                ) : (
                  <Clipboard className="mr-2 h-4 w-4" />
                )}
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </Button>
            </div>
            <div className="p-4 rounded-md border bg-secondary/50 whitespace-pre-wrap text-sm">
              {result}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
