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
  topic: z.string().describe('The topic or niche for the post.'),
  contentType: z
    .enum(['photo', 'video'])
    .describe('The type of content (photo or video).'),
  quantity: z
    .number()
    .min(1)
    .max(10)
    .describe('The number of captions to generate.'),
});
export type GenerateInstagramCaptionsInput = z.infer<
  typeof GenerateInstagramCaptionsInputSchema
>;

const GenerateInstagramCaptionsOutputSchema = z.object({
  captions: z
    .array(z.string())
    .describe('An array of generated Instagram captions.'),
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
  prompt: `You are a viral Instagram marketing expert. Generate {{{quantity}}} unique and engaging Instagram captions for a {{{contentType}}} post about "{{{topic}}}".

The captions should be creative, relevant, and encourage interaction.

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
