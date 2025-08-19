'use server';

/**
 * @fileOverview X (Twitter) Content Idea Generator AI agent.
 *
 * - generateXContentIdeas - A function that handles the generation of content ideas for X.
 * - GenerateXContentIdeasInput - The input type for the generateXContentIdeas function.
 * - GenerateXContentIdeasOutput - The return type for the generateXContentIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateXContentIdeasInputSchema = z.string().describe('A topic or theme for content ideas.');
export type GenerateXContentIdeasInput = z.infer<typeof GenerateXContentIdeasInputSchema>;

const GenerateXContentIdeasOutputSchema = z.object({
  ideas: z.array(z.string()).describe('An array of content ideas for X (Twitter).'),
});
export type GenerateXContentIdeasOutput = z.infer<typeof GenerateXContentIdeasOutputSchema>;

export async function generateXContentIdeas(input: GenerateXContentIdeasInput): Promise<GenerateXContentIdeasOutput> {
  return generateXContentIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateXContentIdeasPrompt',
  input: {schema: GenerateXContentIdeasInputSchema},
  output: {schema: GenerateXContentIdeasOutputSchema},
  prompt: `You are a creative strategist specializing in X (Twitter) content.

  Generate a list of 5 engaging content ideas based on the following topic: {{{$input}}}

  The ideas should be suitable for tweets, threads, or polls on X.

  Return the ideas as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON.`,
});

const generateXContentIdeasFlow = ai.defineFlow(
  {
    name: 'generateXContentIdeasFlow',
    inputSchema: GenerateXContentIdeasInputSchema,
    outputSchema: GenerateXContentIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
