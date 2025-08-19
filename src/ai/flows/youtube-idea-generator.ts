'use server';

/**
 * @fileOverview YouTube Video Idea Generator AI agent.
 *
 * - generateYoutubeIdeas - A function that handles the generation of YouTube video ideas.
 * - GenerateYoutubeIdeasInput - The input type for the generateYoutubeIdeas function.
 * - GenerateYoutubeIdeasOutput - The return type for the generateYoutubeIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateYoutubeIdeasInputSchema = z.string().describe('A topic or niche for the YouTube channel.');
export type GenerateYoutubeIdeasInput = z.infer<typeof GenerateYoutubeIdeasInputSchema>;

const GenerateYoutubeIdeasOutputSchema = z.object({
  ideas: z.array(z.string()).describe('An array of 5 creative YouTube video ideas.'),
});
export type GenerateYoutubeIdeasOutput = z.infer<typeof GenerateYoutubeIdeasOutputSchema>;

export async function generateYoutubeIdeas(input: GenerateYoutubeIdeasInput): Promise<GenerateYoutubeIdeasOutput> {
  return generateYoutubeIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateYoutubeIdeasPrompt',
  input: {schema: GenerateYoutubeIdeasInputSchema},
  output: {schema: GenerateYoutubeIdeasOutputSchema},
  prompt: `Generate a list of 5 creative and engaging YouTube video ideas for a channel focused on the following topic: {{{$input}}}

  The ideas should be catchy and have potential for high viewership.

  Return the ideas as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON.`,
});

const generateYoutubeIdeasFlow = ai.defineFlow(
  {
    name: 'generateYoutubeIdeasFlow',
    inputSchema: GenerateYoutubeIdeasInputSchema,
    outputSchema: GenerateYoutubeIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
