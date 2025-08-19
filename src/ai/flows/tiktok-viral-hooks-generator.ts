'use server';

/**
 * @fileOverview TikTok Viral Hooks Generator AI agent.
 *
 * - generateTikTokViralHooks - A function that handles the generation of TikTok viral hooks.
 * - GenerateTikTokViralHooksInput - The input type for the generateTikTokViralHooks function.
 * - GenerateTikTokViralHooksOutput - The return type for the generateTikTokViralHooks function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateTikTokViralHooksInputSchema = z.object({
  topic: z.string().describe('The topic of the TikTok video.'),
});
export type GenerateTikTokViralHooksInput = z.infer<typeof GenerateTikTokViralHooksInputSchema>;

const GenerateTikTokViralHooksOutputSchema = z.object({
  hooks: z.array(z.string()).describe('An array of 5 viral hooks for the TikTok video.'),
});
export type GenerateTikTokViralHooksOutput = z.infer<typeof GenerateTikTokViralHooksOutputSchema>;

export async function generateTikTokViralHooks(input: GenerateTikTokViralHooksInput): Promise<GenerateTikTokViralHooksOutput> {
  return generateTikTokViralHooksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTikTokViralHooksPrompt',
  input: { schema: GenerateTikTokViralHooksInputSchema },
  output: { schema: GenerateTikTokViralHooksOutputSchema },
  prompt: `You are a TikTok viral marketing expert. Generate 5 catchy and compelling video hooks for a TikTok video about the following topic: {{{topic}}}.

The hooks should be designed to grab the viewer's attention in the first 3 seconds.

Return the hooks as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON.`,
});

const generateTikTokViralHooksFlow = ai.defineFlow(
  {
    name: 'generateTikTokViralHooksFlow',
    inputSchema: GenerateTikTokViralHooksInputSchema,
    outputSchema: GenerateTikTokViralHooksOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
