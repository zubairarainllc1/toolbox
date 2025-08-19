
'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Sparkles, Clipboard, Check, PlusCircle, MinusCircle, Copy, CopyCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { AnimatePresence, motion } from 'framer-motion';

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
import { handleGenerateBlogPost } from '@/app/actions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  topic: z
    .string()
    .min(10, 'Please enter a topic with at least 10 characters.'),
  mainKeyword: z
    .string()
    .min(3, 'Please enter a main keyword with at least 3 characters.'),
  relatedKeywords: z.array(z.object({ value: z.string().min(1, "Related keyword cannot be empty.") })),
  tone: z.enum(['professional', 'casual', 'funny', 'informative', 'inspirational']),
  wordCount: z.number().min(600).max(2500),
  includePoints: z.boolean().default(false).optional(),
});

export default function BlogGeneratorForm() {
  const { toast } = useToast();
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [sections, setSections] = useState<string[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isCopyingSections, setIsCopyingSections] = useState(false);
  const [isStickyButtonVisible, setIsStickyButtonVisible] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      mainKeyword: '',
      relatedKeywords: [],
      tone: 'informative',
      wordCount: 1000,
      includePoints: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "relatedKeywords",
  });

  const resetCopyState = () => {
    setCopiedAll(false);
    setIsCopyingSections(false);
    setCurrentSectionIndex(0);
    setSections([]);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    resetCopyState();
    
    const submissionData = {
        ...values,
        relatedKeywords: values.relatedKeywords.map(kw => kw.value)
    };

    try {
      const response = await handleGenerateBlogPost(submissionData);
      if (response.blogPost) {
        setResult(response.blogPost);
        const splitSections = response.blogPost.split(/(?=\n#+\s)/).filter(s => s.trim() !== '');
        setSections(splitSections);
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
        description: 'Failed to generate blog post. Please try again.',
      });
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({ description: message });
  };

  const handleCopyAll = () => {
    if (!result) return;
    copyToClipboard(result, 'Blog post copied to clipboard!');
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };
  
  const handleCopySection = () => {
    if (sections.length === 0) return;
    if (!isCopyingSections) setIsCopyingSections(true);

    const sectionToCopy = sections[currentSectionIndex];
    copyToClipboard(sectionToCopy, `Section ${currentSectionIndex + 1} copied!`);
    
    // Move to the next section, or loop back to the start
    setCurrentSectionIndex((prevIndex) => (prevIndex + 1) % sections.length);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (resultRef.current) {
        const { top } = resultRef.current.getBoundingClientRect();
        setIsStickyButtonVisible(top < 100);
      }
    };

    if (isCopyingSections) {
      window.addEventListener('scroll', handleScroll);
    } else {
      window.removeEventListener('scroll', handleScroll);
      setIsStickyButtonVisible(false);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCopyingSections]);


  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Blog Post Details
          </CardTitle>
          <CardDescription>
            Provide a topic and our AI will write a complete blog post for you.
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
                    <FormLabel>Blog Topic or Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., The Ultimate Guide to Digital Marketing in 2025"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="mainKeyword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Keyword</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., SEO, content marketing"
                          {...field}
                        />
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
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormLabel>Related Keywords</FormLabel>
                <div className="space-y-2 mt-2">
                  {fields.map((field, index) => (
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`relatedKeywords.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                          <FormControl>
                            <Input {...field} placeholder={`Related Keyword #${index + 1}`} />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                          >
                            <MinusCircle className="h-5 w-5 text-red-500" />
                          </Button>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => append({ value: "" })}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Related Keyword
                </Button>
              </div>

              <FormField
                control={form.control}
                name="wordCount"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Word Count</FormLabel>
                      <span className="text-sm font-medium text-muted-foreground">{field.value} words</span>
                    </div>
                    <FormControl>
                      <Slider
                        min={600}
                        max={2500}
                        step={50}
                        value={[field.value]}
                        onValueChange={(vals) => field.onChange(vals[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="includePoints"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Include Bullet Points
                      </FormLabel>
                       <p className="text-sm text-muted-foreground">
                         Add lists and bullet points in the blog post where appropriate.
                      </p>
                    </div>
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
                {result ? 'Regenerate Blog Post' : 'Generate Blog Post'}
              </Button>
            </form>
          </Form>
          {isLoading && (
            <div className="text-center p-8 space-y-4">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground font-medium">
                Writing your SEO-optimized blog post...
              </p>
              <p className="text-sm text-muted-foreground">This may take up to a minute. Please wait.</p>
            </div>
          )}
          {result && (
            <div className="mt-8" ref={resultRef}>
              <div className="flex flex-wrap gap-2 justify-between items-center mb-4">
                <h3 className="font-headline text-2xl font-semibold">
                  Generated Blog Post
                </h3>
                <div className='flex gap-2'>
                  <Button variant="outline" size="sm" onClick={handleCopyAll}>
                    {copiedAll ? (
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                    ) : (
                      <Clipboard className="mr-2 h-4 w-4" />
                    )}
                    {copiedAll ? 'Copied!' : 'Copy All'}
                  </Button>
                   <Button variant="outline" size="sm" onClick={handleCopySection}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Section by Section
                  </Button>
                </div>
              </div>
              <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none p-6 rounded-md border bg-secondary/50">
                 {sections.length > 0 ? (
                  sections.map((section, index) => (
                    <div 
                      key={index} 
                      className={cn(
                        "transition-all duration-300 rounded-md p-2 -m-2", 
                        isCopyingSections && currentSectionIndex === index && "ring-2 ring-primary/50 bg-primary/5"
                      )}
                    >
                      <ReactMarkdown>{section}</ReactMarkdown>
                    </div>
                  ))
                ) : (
                  <ReactMarkdown>{result}</ReactMarkdown>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <AnimatePresence>
        {isCopyingSections && isStickyButtonVisible && (
           <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-20 right-4 z-50"
          >
            <Button onClick={handleCopySection} className="shadow-lg">
              <CopyCheck className="mr-2 h-4 w-4" />
              Copy Next Section ({currentSectionIndex + 1}/{sections.length})
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
