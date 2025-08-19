
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Sparkles, Instagram } from 'lucide-react';

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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { generateInstagramCaptions } from '@/ai/flows/generate-instagram-captions';
import { GeneratedContent } from '../GeneratedContent';
import { Slider } from '../ui/slider';

const formSchema = z.object({
  topic: z
    .string()
    .min(3, 'Please enter a topic with at least 3 characters.'),
  contentType: z.enum(['photo', 'video'], {
    required_error: 'You need to select a content type.',
  }),
  quantity: z.number().min(1).max(10),
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
      contentType: 'photo',
      quantity: 5,
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
                  <FormLabel>Topic / Niche</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Healthy Recipes, DIY Home Decor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contentType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Content Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="photo" />
                        </FormControl>
                        <FormLabel className="font-normal">Photo</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="video" />
                        </FormControl>
                        <FormLabel className="font-normal">Video (Reel/Story)</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Captions: {field.value}</FormLabel>
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
          <div className="mt-8 space-y-6">
            <GeneratedContent title="Generated Captions" items={result.captions} variant="paragraph" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
