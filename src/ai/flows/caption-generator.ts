'use server';
/**
 * @fileOverview A social media caption generator AI agent.
 *
 * - generateCaption - A function that handles the caption generation process.
 * - GenerateCaptionInput - The input type for the generateCaption function.
 * - GenerateCaptionOutput - The return type for the generateCaption function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCaptionInputSchema = z.object({
  topic: z.string().describe('The topic or keyword for the social media post.'),
});
export type GenerateCaptionInput = z.infer<typeof GenerateCaptionInputSchema>;

const GenerateCaptionOutputSchema = z.object({
  captions: z.array(z.string()).describe('An array of 5 engaging captions for the social media post.'),
});
export type GenerateCaptionOutput = z.infer<typeof GenerateCaptionOutputSchema>;

export async function generateCaption(input: GenerateCaptionInput): Promise<GenerateCaptionOutput> {
  return generateCaptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCaptionPrompt',
  input: {schema: GenerateCaptionInputSchema},
  output: {schema: GenerateCaptionOutputSchema},
  prompt: `You are an expert social media copywriter. Generate 5 distinct and engaging Instagram captions for a post about the following topic.

Topic: {{{topic}}}

Return the captions as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON.`, 
});

const generateCaptionFlow = ai.defineFlow(
  {
    name: 'generateCaptionFlow',
    inputSchema: GenerateCaptionInputSchema,
    outputSchema: GenerateCaptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
