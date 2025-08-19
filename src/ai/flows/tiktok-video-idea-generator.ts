'use server';

/**
 * @fileOverview TikTok Video Idea Generator AI agent.
 *
 * - generateTikTokVideoIdeas - A function that handles the generation of TikTok video ideas.
 * - GenerateTikTokVideoIdeasInput - The input type for the generateTikTokVideoIdeas function.
 * - GenerateTikTokVideoIdeasOutput - The return type for the generateTikTokVideoIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTikTokVideoIdeasInputSchema = z.object({
    topic: z.string().describe('A topic or niche for the TikTok channel.'),
});
export type GenerateTikTokVideoIdeasInput = z.infer<typeof GenerateTikTokVideoIdeasInputSchema>;

const GenerateTikTokVideoIdeasOutputSchema = z.object({
  ideas: z.array(z.string()).describe('An array of 5 creative TikTok video ideas.'),
});
export type GenerateTikTokVideoIdeasOutput = z.infer<typeof GenerateTikTokVideoIdeasOutputSchema>;

export async function generateTikTokVideoIdeas(input: GenerateTikTokVideoIdeasInput): Promise<GenerateTikTokVideoIdeasOutput> {
  return generateTikTokVideoIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTikTokVideoIdeasPrompt',
  input: {schema: GenerateTikTokVideoIdeasInputSchema},
  output: {schema: GenerateTikTokVideoIdeasOutputSchema},
  prompt: `You are a TikTok content strategist. Generate a list of 5 creative and engaging video ideas for a channel focused on the following topic: {{{topic}}}

  The ideas should be short, catchy, and have potential to go viral on TikTok.

  Return the ideas as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON.`,
});

const generateTikTokVideoIdeasFlow = ai.defineFlow(
  {
    name: 'generateTikTokVideoIdeasFlow',
    inputSchema: GenerateTikTokVideoIdeasInputSchema,
    outputSchema: GenerateTikTokVideoIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
