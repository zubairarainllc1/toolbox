'use server';

/**
 * @fileOverview X (Twitter) Hashtag Generator AI agent.
 *
 * - generateXHashtags - A function that handles the generation of X hashtags.
 * - GenerateXHashtagsInput - The input type for the generateXHashtags function.
 * - GenerateXHashtagsOutput - The return type for the generateXHashtags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateXHashtagsInputSchema = z.object({
  topic: z.string().describe('The topic or niche for the post.'),
});
export type GenerateXHashtagsInput = z.infer<typeof GenerateXHashtagsInputSchema>;

const GenerateXHashtagsOutputSchema = z.object({
  hashtags: z.array(z.string()).describe('An array of 50 generated X hashtags.'),
});
export type GenerateXHashtagsOutput = z.infer<typeof GenerateXHashtagsOutputSchema>;

export async function generateXHashtags(input: GenerateXHashtagsInput): Promise<GenerateXHashtagsOutput> {
  return generateXHashtagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateXHashtagsPrompt',
  input: {schema: GenerateXHashtagsInputSchema},
  output: {schema: GenerateXHashtagsOutputSchema},
  prompt: `You are a viral X (formerly Twitter) marketing expert. Generate 50 unique and relevant X hashtags for a post about "{{{topic}}}".

The hashtags must be a mix of popular, niche, and trending terms to maximize reach and engagement on the X platform.

Return the 50 hashtags as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON.`,
});

const generateXHashtagsFlow = ai.defineFlow(
  {
    name: 'generateXHashtagsFlow',
    inputSchema: GenerateXHashtagsInputSchema,
    outputSchema: GenerateXHashtagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
