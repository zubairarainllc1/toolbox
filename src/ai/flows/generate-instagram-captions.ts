'use server';

/**
 * @fileOverview Instagram Caption Generator AI agent.
 *
 * - generateInstagramCaptions - A function that handles the generation of Instagram captions.
 * - GenerateInstagramCaptionsInput - The input type for the generateInstagramCaptions function.
 * - GenerateInstagramCaptionsOutput - The return type for the generateInstagramCaptions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateInstagramCaptionsInputSchema = z.object({
  topic: z.string().describe('The topic or keyword for the social media post.'),
  includeEmojis: z.boolean().optional().describe('Whether or not to include emojis in the captions.'),
});
export type GenerateInstagramCaptionsInput = z.infer<
  typeof GenerateInstagramCaptionsInputSchema
>;

const GenerateInstagramCaptionsOutputSchema = z.object({
  captions: z
    .array(z.string())
    .describe('An array of 5 generated Instagram captions.'),
});
export type GenerateInstagramCaptionsOutput = z.infer<
  typeof GenerateInstagramCaptionsOutputSchema
>;

export async function generateInstagramCaptions(
  input: GenerateInstagramCaptionsInput
): Promise<GenerateInstagramCaptionsOutput> {
  return generateInstagramCaptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInstagramCaptionsPrompt',
  input: { schema: GenerateInstagramCaptionsInputSchema },
  output: { schema: GenerateInstagramCaptionsOutputSchema },
  prompt: `You are a viral Instagram marketing expert. Generate 5 unique and engaging Instagram captions for a post about "{{{topic}}}".

The captions should be creative and relevant.
{{#if includeEmojis}}Each caption should include 1 or 2 relevant emojis.{{/if}}
Do not include any hashtags.

Return the captions as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON.`,
});

const generateInstagramCaptionsFlow = ai.defineFlow(
  {
    name: 'generateInstagramCaptionsFlow',
    inputSchema: GenerateInstagramCaptionsInputSchema,
    outputSchema: GenerateInstagramCaptionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
