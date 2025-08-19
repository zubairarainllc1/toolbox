
'use client';

import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Sparkles, Clipboard, Check, PlusCircle, MinusCircle, Copy, CopyCheck, RefreshCw, ChevronDown, FileScan, Bot } from 'lucide-react';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { handleGenerateBlogPost, handleRegenerateMeta, handleParaphraseText } from '@/app/actions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { cn } from '@/lib/utils';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Separator } from './ui/separator';

const formSchema = z.object({
  topic: z
    .string()
    .min(10, 'Please enter a topic with at least 10 characters.'),
  mainKeyword: z
    .string()
    .min(3, 'Please enter a main keyword with at least 3 characters.'),
  relatedKeywords: z.array(z.object({ value: z.string() })).optional(),
  tone: z.enum(['professional', 'casual', 'funny', 'informative', 'inspirational']),
  wordCount: z.number().min(600).max(2500),
  includePoints: z.boolean().default(false).optional(),
});

type ResultState = {
  blogPost: string;
  metaTitle: string;
  metaDescription: string;
  permalink: string;
}

export default function BlogGeneratorForm() {
  const { toast } = useToast();
  const [result, setResult] = useState<ResultState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegeneratingMeta, setIsRegeneratingMeta] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [sections, setSections] = useState<string[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isCopyingSections, setIsCopyingSections] = useState(false);
  const [isStickyButtonVisible, setIsStickyButtonVisible] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [plagiarismText, setPlagiarismText] = useState('');
  const [highlightedSentences, setHighlightedSentences] = useState<string[]>([]);
  const [isFixingPlagiarism, setIsFixingPlagiarism] = useState(false);
  const [plagiarismDialogOpen, setPlagiarismDialogOpen] = useState(false);

  const [selection, setSelection] = useState<{ text: string; range: Range | null }>({ text: '', range: null });
  const [isRegeneratingSelection, setIsRegeneratingSelection] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const contentRef = useRef<HTMLDivElement>(null);


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

  const parseSections = (blogPost: string) => {
    const lines = blogPost.split('\n').filter(line => line.trim() !== '');
    const newSections: string[] = [];
  
    let currentContent = '';
  
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine.match(/^#+\s/)) {
        if (currentContent.trim()) {
          newSections.push(currentContent.trim());
          currentContent = '';
        }
        newSections.push(trimmedLine);
      } else {
        currentContent += line + '\n';
      }
    });
  
    if (currentContent.trim()) {
      newSections.push(currentContent.trim());
    }
  
    return newSections;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    resetCopyState();
    
    const submissionData = {
      ...values,
      relatedKeywords: values.relatedKeywords?.map(kw => kw.value).filter(Boolean),
    };

    try {
      const response = await handleGenerateBlogPost(submissionData);
      if (response.blogPost) {
        setResult(response);
        setSections(parseSections(response.blogPost));
        setHighlightedSentences([]); // Clear highlights on new generation
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

  async function onRegenerateMeta() {
    const { topic, mainKeyword } = form.getValues();
    if (!topic || !mainKeyword) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Topic and Main Keyword are required to regenerate metadata.',
      });
      return;
    }

    setIsRegeneratingMeta(true);
    try {
      const response = await handleRegenerateMeta({ topic, mainKeyword });
      if (response.metaTitle && result) {
        setResult(prev => ({ ...prev!, ...response }));
        toast({ description: 'SEO Metadata has been regenerated!' });
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
        description: 'Failed to regenerate metadata. Please try again.',
      });
      console.error(e);
    } finally {
      setIsRegeneratingMeta(false);
    }
  }

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({ description: message });
  };

  const handleCopyAll = () => {
    if (!result?.blogPost) return;
    copyToClipboard(result.blogPost, 'Blog post copied to clipboard!');
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopySection = () => {
    if (sections.length === 0) return;
    if (!isCopyingSections) setIsCopyingSections(true);

    const sectionToCopy = sections[currentSectionIndex];
    copyToClipboard(sectionToCopy, `Section ${currentSectionIndex + 1} copied!`);

    setCurrentSectionIndex((prevIndex) => (prevIndex + 1));
  };
  
  const isLastSection = currentSectionIndex >= sections.length;

  const handleFindPlagiarism = () => {
    const sentencesToFind = plagiarismText.split('\n').map(s => s.trim()).filter(Boolean);
    setHighlightedSentences(sentencesToFind);
    setPlagiarismDialogOpen(false);
  };

  const handleFixPlagiarism = async () => {
    if (!result || highlightedSentences.length === 0) return;

    setIsFixingPlagiarism(true);
    let updatedPost = result.blogPost;

    for (const sentence of highlightedSentences) {
        try {
            const response = await handleParaphraseText({ text: sentence });
            if (response.rewrittenText) {
                updatedPost = updatedPost.replace(sentence, response.rewrittenText);
            } else {
                toast({ variant: 'destructive', title: 'Error', description: `Could not rewrite: "${sentence}"`});
            }
        } catch (e) {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to fix plagiarism.'});
        }
    }
    setResult(prev => ({ ...prev!, blogPost: updatedPost }));
    setHighlightedSentences([]);
    setIsFixingPlagiarism(false);
    toast({ title: 'Success!', description: 'Plagiarism check complete and text updated.' });
  };
  
  const handleMouseUp = useCallback(() => {
    const currentSelection = window.getSelection();
    if (!currentSelection) return;
    
    const selectedText = currentSelection.toString().trim();
  
    if (selectedText.length > 5 && contentRef.current?.contains(currentSelection.anchorNode)) {
      const range = currentSelection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      setPopoverPosition({
        top: rect.top - contentRect.top - 45, // Position above selection
        left: rect.left - contentRect.left + rect.width / 2, // Center of selection
      });
      setSelection({ text: selectedText, range });
    } else {
      // A brief delay to allow click on popover
      setTimeout(() => setSelection({ text: '', range: null }), 100);
    }
  }, []);

  const handleRegenerateSelection = async () => {
    if (!selection.text || !result) return;
    setIsRegeneratingSelection(true);
    try {
        const response = await handleParaphraseText({ text: selection.text });
        if (response.rewrittenText) {
            const updatedBlog = result.blogPost.replace(selection.text, response.rewrittenText);
            setResult({ ...result, blogPost: updatedBlog });
        } else {
            toast({ variant: 'destructive', title: 'Error', description: response.message || 'Failed to rewrite text.' });
        }
    } catch (e) {
        toast({ variant: 'destructive', title: 'Error', description: 'An error occurred during regeneration.'});
    } finally {
        setIsRegeneratingSelection(false);
        setSelection({ text: '', range: null }); // Hide popover after action
    }
  };

  const renderWithHighlights = (text: string) => {
    if (highlightedSentences.length === 0) {
      return <ReactMarkdown>{text}</ReactMarkdown>;
    }
  
    const MainRegex = new RegExp(`(${highlightedSentences.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
    const parts = text.split(MainRegex);
  
    return (
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => {
            const content = React.Children.toArray(props.children);
            if (typeof content[0] === 'string') {
              const paragraphText = content[0];
              const isParagraphHighlighted = highlightedSentences.some(s => paragraphText.includes(s));
  
              if (isParagraphHighlighted) {
                const subParts = paragraphText.split(MainRegex);
                return (
                  <p className='bg-yellow-200/30 rounded-sm' {...props}>
                    {subParts.map((part, i) =>
                      highlightedSentences.includes(part) ? (
                        <mark key={i} className="bg-orange-400/70 text-black rounded-sm px-1 py-0.5">
                          {part}
                        </mark>
                      ) : (
                        part
                      )
                    )}
                  </p>
                );
              }
            }
            return <p {...props} />;
          },
        }}
      >
        {text}
      </ReactMarkdown>
    );
  };


  useEffect(() => {
    const contentDiv = contentRef.current;
    if (contentDiv) {
        contentDiv.addEventListener('mouseup', handleMouseUp);
        return () => contentDiv.removeEventListener('mouseup', handleMouseUp);
    }
  }, [handleMouseUp, result]);


  useEffect(() => {
    if(isLastSection) {
        setIsCopyingSections(false);
    }
  }, [isLastSection]);

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

              <div className="relative flex items-center justify-center my-4">
                <Separator className="flex-1" />
                <Button 
                    type="button" 
                    variant="ghost" 
                    className="mx-4 flex items-center gap-2" 
                    onClick={() => setShowAdvanced(!showAdvanced)}>
                  Advanced Options
                  <ChevronDown className={cn("h-4 w-4 transition-transform", showAdvanced && "rotate-180")} />
                </Button>
                <Separator className="flex-1" />
              </div>

              <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="space-y-8 overflow-hidden"
                >
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
                </motion.div>
              )}
              </AnimatePresence>

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
          {result && !isLoading && (
            <div className="mt-8" ref={resultRef}>
              <Card className="bg-secondary/50 mb-6">
                <CardHeader>
                  <CardTitle className="text-xl">SEO Metadata</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="meta-title" className="text-xs text-muted-foreground">Meta Title</Label>
                    <Input id="meta-title" readOnly value={result.metaTitle} />
                  </div>
                   <div className="space-y-1">
                    <Label htmlFor="meta-desc" className="text-xs text-muted-foreground">Meta Description</Label>
                    <Textarea id="meta-desc" readOnly value={result.metaDescription} rows={3} />
                  </div>
                   <div className="space-y-1">
                    <Label htmlFor="permalink" className="text-xs text-muted-foreground">Permalink</Label>
                    <Input id="permalink" readOnly value={result.permalink} />
                  </div>
                  <Button variant="outline" size="sm" onClick={onRegenerateMeta} disabled={isRegeneratingMeta}>
                    {isRegeneratingMeta ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                    Regenerate
                  </Button>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-2 mb-4">
                <div className="flex flex-wrap gap-2 justify-between items-center">
                  <h3 className="font-headline text-2xl font-semibold">
                    Generated Blog Post
                  </h3>
                  <div className='flex gap-2'>
                    <Dialog open={plagiarismDialogOpen} onOpenChange={setPlagiarismDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <FileScan className="mr-2 h-4 w-4" />
                          Plagiarism
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Plagiarism Checker</DialogTitle>
                        </DialogHeader>
                        <div className="relative">
                          <div className="absolute left-2 top-2.5 text-right text-muted-foreground text-sm flex flex-col gap-[7px] select-none">
                              {plagiarismText.split('\n').map((_, i) => (
                                  <div key={i}>{i+1}</div>
                              ))}
                          </div>
                          <Textarea 
                              value={plagiarismText} 
                              onChange={(e) => setPlagiarismText(e.target.value)}
                              placeholder="Paste text here, one sentence per line..."
                              rows={10}
                              className="pl-8"
                          />
                        </div>
                        <DialogFooter>
                          <Button onClick={handleFindPlagiarism}>Find Sentences</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm" onClick={handleCopyAll}>
                      {copiedAll ? (
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                      ) : (
                        <Clipboard className="mr-2 h-4 w-4" />
                      )}
                      {copiedAll ? 'Copied!' : 'Copy All'}
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end">
                    <Button variant="outline" size="sm" onClick={handleCopySection} disabled={isLastSection}>
                      <Copy className="mr-2 h-4 w-4" />
                      {isLastSection ? 'Finished' : 'Copy Section by Section'}
                    </Button>
                </div>
              </div>
              <div 
                ref={contentRef}
                className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none p-6 rounded-md border bg-secondary/50 relative"
              >
                {isCopyingSections && sections.length > 0 ? (
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
                   renderWithHighlights(result.blogPost)
                )}

                {selection.text && (
                  <div
                    className="absolute z-10"
                    style={{ 
                      top: popoverPosition.top, 
                      left: popoverPosition.left,
                      transform: 'translateX(-50%)',
                     }}
                  >
                    <Button
                      size="sm"
                      className="shadow-lg"
                      onClick={handleRegenerateSelection}
                      disabled={isRegeneratingSelection}
                    >
                      {isRegeneratingSelection ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Bot className="mr-2 h-4 w-4" />
                      )}
                      Regenerate
                    </Button>
                  </div>
                )}
              </div>
                <div className="mt-8 flex justify-center">
                    <Button
                        onClick={() => form.handleSubmit(onSubmit)()}
                        disabled={isLoading}
                        className="w-full md:w-auto"
                        >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Sparkles className="mr-2 h-4 w-4" />
                        )}
                        Regenerate Blog Post
                    </Button>
                </div>
            </div>
          )}
        </CardContent>
      </Card>

      <AnimatePresence>
        {highlightedSentences.length > 0 && (
           <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Button onClick={handleFixPlagiarism} className="shadow-lg" disabled={isFixingPlagiarism}>
                {isFixingPlagiarism ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
              {isFixingPlagiarism ? 'Fixing...' : `Regenerate ${highlightedSentences.length} sentences`}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCopyingSections && isStickyButtonVisible && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-20 right-4 z-50"
          >
            <Button onClick={handleCopySection} className="shadow-lg" disabled={isLastSection}>
              {isLastSection ? <Check className="mr-2 h-4 w-4" /> : <CopyCheck className="mr-2 h-4 w-4" />}
              {isLastSection ? 'All Copied' : `Copy Next Section (${currentSectionIndex + 1}/${sections.length})`}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
