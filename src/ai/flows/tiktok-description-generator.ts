'use server';

/**
 * @fileOverview TikTok Description Generator AI agent.
 *
 * - generateTikTokDescription - A function that handles the generation of TikTok video descriptions.
 * - GenerateTikTokDescriptionInput - The input type for the generateTikTokDescription function.
 * - GenerateTikTokDescriptionOutput - The return type for the generateTikTokDescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateTikTokDescriptionInputSchema = z.object({
  title: z.string().describe('The title or topic of the TikTok video.'),
  keywords: z.string().optional().describe('Comma-separated keywords for the video.'),
});
export type GenerateTikTokDescriptionInput = z.infer<typeof GenerateTikTokDescriptionInputSchema>;

const GenerateTikTokDescriptionOutputSchema = z.object({
  description: z.string().describe('A compelling and engaging TikTok video description.'),
});
export type GenerateTikTokDescriptionOutput = z.infer<typeof GenerateTikTokDescriptionOutputSchema>;

export async function generateTikTokDescription(input: GenerateTikTokDescriptionInput): Promise<GenerateTikTokDescriptionOutput> {
  return generateTikTokDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTikTokDescriptionPrompt',
  input: { schema: GenerateTikTokDescriptionInputSchema },
  output: { schema: GenerateTikTokDescriptionOutputSchema },
  prompt: `You are a TikTok expert. Generate a compelling and engaging video description based on the following details.

Video Title/Topic: {{{title}}}
{{#if keywords}}
Keywords: {{{keywords}}}
{{/if}}

The description should be short, punchy, and include relevant trending hashtags to maximize visibility.

Return the description as a single string.`,
});

const generateTikTokDescriptionFlow = ai.defineFlow(
  {
    name: 'generateTikTokDescriptionFlow',
    inputSchema: GenerateTikTokDescriptionInputSchema,
    outputSchema: GenerateTikTokDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
