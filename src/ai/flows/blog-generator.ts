'use server';

/**
 * @fileOverview Blog Post Generator AI agent.
 *
 * - generateBlogPost - A function that handles the generation of a blog post.
 * - GenerateBlogPostInput - The input type for the generateBlogPost function.
 * - GenerateBlogPostOutput - The return type for the generateBlogPost function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateBlogPostInputSchema = z.object({
  topic: z.string().describe('The main topic or title for the blog post.'),
  keywords: z.string().optional().describe('Comma-separated keywords to include for SEO.'),
  tone: z.enum(['professional', 'casual', 'funny', 'informative', 'inspirational']).describe('The desired tone for the blog post.'),
  wordCount: z.number().min(600).max(2500).describe('The desired word count for the blog post.'),
});
export type GenerateBlogPostInput = z.infer<typeof GenerateBlogPostInputSchema>;

const GenerateBlogPostOutputSchema = z.object({
  blogPost: z.string().describe('The full generated blog post content, formatted in Markdown.'),
});
export type GenerateBlogPostOutput = z.infer<typeof GenerateBlogPostOutputSchema>;

export async function generateBlogPost(
  input: GenerateBlogPostInput
): Promise<GenerateBlogPostOutput> {
  return generateBlogPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogPostPrompt',
  input: { schema: GenerateBlogPostInputSchema },
  output: { schema: GenerateBlogPostOutputSchema },
  prompt: `You are an expert content writer and SEO specialist. Generate a well-structured and engaging blog post based on the following details.

The blog post should be approximately {{{wordCount}}} words long and formatted in Markdown. It must include a compelling title, an introduction, a body with multiple sections using headings (H2, H3), and a conclusion.

Topic/Title: {{{topic}}}
Tone: {{{tone}}}
Word Count: {{{wordCount}}}
{{#if keywords}}
Incorporate the following keywords naturally throughout the text: {{{keywords}}}
{{/if}}

Return the complete blog post as a single Markdown string in the 'blogPost' field of the JSON output.`,
});

const generateBlogPostFlow = ai.defineFlow(
  {
    name: 'generateBlogPostFlow',
    inputSchema: GenerateBlogPostInputSchema,
    outputSchema: GenerateBlogPostOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
