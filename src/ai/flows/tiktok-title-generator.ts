'use server';

/**
 * @fileOverview TikTok Title Generator AI agent.
 *
 * - generateTikTokTitle - A function that handles the generation of TikTok titles.
 * - GenerateTikTokTitleInput - The input type for the generateTikTokTitle function.
 * - GenerateTikTokTitleOutput - The return type for the generateTikTokTitle function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateTikTokTitleInputSchema = z.object({
  topic: z.string().describe('The topic of the TikTok video.'),
  keywords: z.string().optional().describe('Comma-separated keywords to include.'),
  tone: z.enum(['professional', 'casual', 'funny', 'inspirational', 'witty', 'informative']).describe('The desired tone for the titles.'),
});
export type GenerateTikTokTitleInput = z.infer<typeof GenerateTikTokTitleInputSchema>;

const GenerateTikTokTitleOutputSchema = z.object({
  titles: z.array(z.string()).describe('An array of 5 generated TikTok titles.'),
});
export type GenerateTikTokTitleOutput = z.infer<typeof GenerateTikTokTitleOutputSchema>;

export async function generateTikTokTitle(input: GenerateTikTokTitleInput): Promise<GenerateTikTokTitleOutput> {
  return generateTikTokTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTikTokTitlePrompt',
  input: { schema: GenerateTikTokTitleInputSchema },
  output: { schema: GenerateTikTokTitleOutputSchema },
  prompt: `You are a TikTok viral marketing expert. Generate 5 catchy and SEO-optimized titles for a TikTok video based on the following details.

Topic: {{{topic}}}
{{#if keywords}}
Keywords: {{{keywords}}}
{{/if}}
Tone: {{{tone}}}

The titles should be short, engaging, and designed to grab attention on the "For You" page. Include relevant keywords naturally.

Return the titles as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON.`,
});

const generateTikTokTitleFlow = ai.defineFlow(
  {
    name: 'generateTikTokTitleFlow',
    inputSchema: GenerateTikTokTitleInputSchema,
    outputSchema: GenerateTikTokTitleOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
