'use server';

/**
 * @fileOverview YouTube Content Idea Generator AI agent.
 *
 * - generateYoutubeContentIdeas - A function that handles the generation of YouTube video ideas.
 * - GenerateYoutubeContentIdeasInput - The input type for the generateYoutubeContentIdeas function.
 * - GenerateYoutubeContentIdeasOutput - The return type for the generateYoutubeContentIdeas function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateYoutubeContentIdeasInputSchema = z.object({
  topic: z.string().describe('A topic or niche for the YouTube channel.'),
});
export type GenerateYoutubeContentIdeasInput = z.infer<typeof GenerateYoutubeContentIdeasInputSchema>;

const GenerateYoutubeContentIdeasOutputSchema = z.object({
  ideas: z.array(z.string()).describe('An array of 5 creative YouTube video ideas.'),
});
export type GenerateYoutubeContentIdeasOutput = z.infer<typeof GenerateYoutubeContentIdeasOutputSchema>;

export async function generateYoutubeContentIdeas(input: GenerateYoutubeContentIdeasInput): Promise<GenerateYoutubeContentIdeasOutput> {
  return generateYoutubeContentIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateYoutubeContentIdeasPrompt',
  input: { schema: GenerateYoutubeContentIdeasInputSchema },
  output: { schema: GenerateYoutubeContentIdeasOutputSchema },
  prompt: `You are a YouTube content strategist. Generate a list of 5 creative and engaging video ideas for a channel focused on the following topic: {{{topic}}}

  The ideas should be short, catchy, and have potential to get a lot of views on YouTube.

  Return the ideas as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON.`,
});

const generateYoutubeContentIdeasFlow = ai.defineFlow(
  {
    name: 'generateYoutubeContentIdeasFlow',
    inputSchema: GenerateYoutubeContentIdeasInputSchema,
    outputSchema: GenerateYoutubeContentIdeasOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
