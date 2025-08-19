'use server';

/**
 * @fileOverview YouTube Description Generator AI agent.
 *
 * - generateYoutubeDescription - A function that handles the generation of YouTube video descriptions.
 * - GenerateYoutubeDescriptionInput - The input type for the generateYoutubeDescription function.
 * - GenerateYoutubeDescriptionOutput - The return type for the generateYoutubeDescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateYoutubeDescriptionInputSchema = z.object({
  title: z.string().describe('The title of the YouTube video.'),
  keywords: z.string().optional().describe('Comma-separated keywords for the video.'),
});
export type GenerateYoutubeDescriptionInput = z.infer<typeof GenerateYoutubeDescriptionInputSchema>;

const GenerateYoutubeDescriptionOutputSchema = z.object({
  description: z.string().describe('A compelling and SEO-optimized YouTube video description.'),
});
export type GenerateYoutubeDescriptionOutput = z.infer<typeof GenerateYoutubeDescriptionOutputSchema>;

export async function generateYoutubeDescription(input: GenerateYoutubeDescriptionInput): Promise<GenerateYoutubeDescriptionOutput> {
  return generateYoutubeDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateYoutubeDescriptionPrompt',
  input: { schema: GenerateYoutubeDescriptionInputSchema },
  output: { schema: GenerateYoutubeDescriptionOutputSchema },
  prompt: `You are a YouTube SEO expert. Generate a compelling and SEO-optimized video description based on the following details.

Video Title: {{{title}}}
{{#if keywords}}
Keywords: {{{keywords}}}
{{/if}}

The description should be engaging for viewers, include relevant keywords naturally, and encourage likes and subscribes. Structure it with a strong opening, a detailed body, and a call-to-action at the end. Use paragraphs for readability.

Return the description as a single string.`,
});

const generateYoutubeDescriptionFlow = ai.defineFlow(
  {
    name: 'generateYoutubeDescriptionFlow',
    inputSchema: GenerateYoutubeDescriptionInputSchema,
    outputSchema: GenerateYoutubeDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
