'use server';

/**
 * @fileOverview YouTube Viral Hooks Generator AI agent.
 *
 * - generateYoutubeViralHooks - A function that handles the generation of YouTube viral hooks.
 * - GenerateYoutubeViralHooksInput - The input type for the generateYoutubeViralHooks function.
 * - GenerateYoutubeViralHooksOutput - The return type for the generateYoutubeViralHooks function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateYoutubeViralHooksInputSchema = z.object({
  topic: z.string().describe('The topic of the YouTube video.'),
});
export type GenerateYoutubeViralHooksInput = z.infer<typeof GenerateYoutubeViralHooksInputSchema>;

const GenerateYoutubeViralHooksOutputSchema = z.object({
  hooks: z.array(z.string()).describe('An array of 5 viral hooks for the YouTube video.'),
});
export type GenerateYoutubeViralHooksOutput = z.infer<typeof GenerateYoutubeViralHooksOutputSchema>;

export async function generateYoutubeViralHooks(input: GenerateYoutubeViralHooksInput): Promise<GenerateYoutubeViralHooksOutput> {
  return generateYoutubeViralHooksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateYoutubeViralHooksPrompt',
  input: { schema: GenerateYoutubeViralHooksInputSchema },
  output: { schema: GenerateYoutubeViralHooksOutputSchema },
  prompt: `You are a YouTube viral marketing expert. Generate 5 catchy and compelling video hooks for a YouTube video about the following topic: {{{topic}}}.

The hooks should be designed to grab the viewer's attention in the first 5 seconds.

Return the hooks as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON.`,
});

const generateYoutubeViralHooksFlow = ai.defineFlow(
  {
    name: 'generateYoutubeViralHooksFlow',
    inputSchema: GenerateYoutubeViralHooksInputSchema,
    outputSchema: GenerateYoutubeViralHooksOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
