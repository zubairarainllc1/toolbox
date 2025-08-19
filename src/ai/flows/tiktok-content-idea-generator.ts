'use server';

/**
 * @fileOverview TikTok Content Idea Generator AI agent.
 *
 * - generateTikTokContentIdeas - A function that handles the generation of TikTok video ideas.
 * - GenerateTikTokContentIdeasInput - The input type for the generateTikTokContentIdeas function.
 * - GenerateTikTokContentIdeasOutput - The return type for the generateTikTokContentIdeas function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateTikTokContentIdeasInputSchema = z.object({
  topic: z.string().describe('A topic or niche for the TikTok channel.'),
});
export type GenerateTikTokContentIdeasInput = z.infer<typeof GenerateTikTokContentIdeasInputSchema>;

const GenerateTikTokContentIdeasOutputSchema = z.object({
  ideas: z.array(z.string()).describe('An array of 5 creative TikTok video ideas.'),
});
export type GenerateTikTokContentIdeasOutput = z.infer<typeof GenerateTikTokContentIdeasOutputSchema>;

export async function generateTikTokContentIdeas(input: GenerateTikTokContentIdeasInput): Promise<GenerateTikTokContentIdeasOutput> {
  return generateTikTokContentIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTikTokContentIdeasPrompt',
  input: { schema: GenerateTikTokContentIdeasInputSchema },
  output: { schema: GenerateTikTokContentIdeasOutputSchema },
  prompt: `You are a TikTok content strategist. Generate a list of 5 creative and engaging video ideas for a channel focused on the following topic: {{{topic}}}

  The ideas should be short, catchy, and have potential to go viral on TikTok.

  Return the ideas as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON.`,
});

const generateTikTokContentIdeasFlow = ai.defineFlow(
  {
    name: 'generateTikTokContentIdeasFlow',
    inputSchema: GenerateTikTokContentIdeasInputSchema,
    outputSchema: GenerateTikTokContentIdeasOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
