'use server';

/**
 * @fileOverview Facebook Caption Generator AI agent.
 *
 * - generateFacebookCaptions - A function that handles the generation of Facebook captions.
 * - GenerateFacebookCaptionsInput - The input type for the generateFacebookCaptions function.
 * - GenerateFacebookCaptionsOutput - The return type for the generateFacebookCaptions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateFacebookCaptionsInputSchema = z.object({
  topic: z.string().describe('The topic or keyword for the social media post.'),
  includeEmojis: z.boolean().optional().describe('Whether or not to include emojis in the captions.'),
});
export type GenerateFacebookCaptionsInput = z.infer<
  typeof GenerateFacebookCaptionsInputSchema
>;

const GenerateFacebookCaptionsOutputSchema = z.object({
  captions: z
    .array(z.string())
    .describe('An array of 5 generated Facebook captions.'),
});
export type GenerateFacebookCaptionsOutput = z.infer<
  typeof GenerateFacebookCaptionsOutputSchema
>;

export async function generateFacebookCaptions(
  input: GenerateFacebookCaptionsInput
): Promise<GenerateFacebookCaptionsOutput> {
  return generateFacebookCaptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFacebookCaptionsPrompt',
  input: { schema: GenerateFacebookCaptionsInputSchema },
  output: { schema: GenerateFacebookCaptionsOutputSchema },
  prompt: `You are a viral Facebook marketing expert. Generate 5 unique and engaging Facebook captions for a post about "{{{topic}}}".

The captions should be creative and relevant.
{{#if includeEmojis}}Each caption should include 1 or 2 relevant emojis.{{/if}}
Do not include any hashtags.

Return the captions as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON.`,
});

const generateFacebookCaptionsFlow = ai.defineFlow(
  {
    name: 'generateFacebookCaptionsFlow',
    inputSchema: GenerateFacebookCaptionsInputSchema,
    outputSchema: GenerateFacebookCaptionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
