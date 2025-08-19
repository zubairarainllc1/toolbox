'use server';

/**
 * @fileOverview YouTube Title Generator AI agent.
 *
 * - generateYoutubeTitle - A function that handles the generation of YouTube titles.
 * - GenerateYoutubeTitleInput - The input type for the generateYoutubeTitle function.
 * - GenerateYoutubeTitleOutput - The return type for the generateYoutubeTitle function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateYoutubeTitleInputSchema = z.object({
  topic: z.string().describe('The topic of the YouTube video.'),
  keywords: z.string().optional().describe('Comma-separated keywords to include.'),
  tone: z.enum(['professional', 'casual', 'funny', 'inspirational', 'witty', 'informative']).describe('The desired tone for the titles.'),
  quantity: z.number().min(1).max(10).describe('The number of titles to generate.'),
});
export type GenerateYoutubeTitleInput = z.infer<typeof GenerateYoutubeTitleInputSchema>;

const GenerateYoutubeTitleOutputSchema = z.object({
  titles: z.array(z.string()).describe('An array of generated YouTube titles.'),
});
export type GenerateYoutubeTitleOutput = z.infer<typeof GenerateYoutubeTitleOutputSchema>;

export async function generateYoutubeTitle(input: GenerateYoutubeTitleInput): Promise<GenerateYoutubeTitleOutput> {
  return generateYoutubeTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateYoutubeTitlePrompt',
  input: { schema: GenerateYoutubeTitleInputSchema },
  output: { schema: GenerateYoutubeTitleOutputSchema },
  prompt: `You are a YouTube viral marketing expert. Generate {{{quantity}}} catchy and SEO-optimized titles for a YouTube video based on the following details.

Topic: {{{topic}}}
{{#if keywords}}
Keywords: {{{keywords}}}
{{/if}}
Tone: {{{tone}}}

The titles should be engaging, clickable, and designed to perform well in YouTube search and recommendations. Include relevant keywords naturally.

Return the titles as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON.`,
});

const generateYoutubeTitleFlow = ai.defineFlow(
  {
    name: 'generateYoutubeTitleFlow',
    inputSchema: GenerateYoutubeTitleInputSchema,
    outputSchema: GenerateYoutubeTitleOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
