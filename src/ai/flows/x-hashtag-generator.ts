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

const GenerateXHashtagsInputSchema = z.string().describe('A description or keywords for the X post.');
export type GenerateXHashtagsInput = z.infer<typeof GenerateXHashtagsInputSchema>;

const GenerateXHashtagsOutputSchema = z.object({
  hashtags: z.array(z.string()).describe('An array of relevant hashtags for the X post.'),
});
export type GenerateXHashtagsOutput = z.infer<typeof GenerateXHashtagsOutputSchema>;

export async function generateXHashtags(input: GenerateXHashtagsInput): Promise<GenerateXHashtagsOutput> {
  return generateXHashtagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateXHashtagsPrompt',
  input: {schema: GenerateXHashtagsInputSchema},
  output: {schema: GenerateXHashtagsOutputSchema},
  prompt: `You are an expert social media manager specializing in generating relevant and trending hashtags for X (Twitter) posts.

  Generate a list of hashtags based on the following description or keywords: {{{$input}}}

  The hashtags should be relevant to the content and help increase its visibility on X.

  Return the hashtags as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON. Do not include a backtick code fence.`,
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
