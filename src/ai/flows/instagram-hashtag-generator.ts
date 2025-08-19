'use server';

/**
 * @fileOverview Instagram Hashtag Generator AI agent.
 *
 * - generateInstagramHashtags - A function that handles the generation of Instagram hashtags.
 * - GenerateInstagramHashtagsInput - The input type for the generateInstagramHashtags function.
 * - GenerateInstagramHashtagsOutput - The return type for the generateInstagramHashtags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInstagramHashtagsInputSchema = z.string().describe('A description or keywords for the Instagram post.');
export type GenerateInstagramHashtagsInput = z.infer<typeof GenerateInstagramHashtagsInputSchema>;

const GenerateInstagramHashtagsOutputSchema = z.object({
  hashtags: z.array(z.string()).describe('An array of 50 relevant hashtags for the Instagram post.'),
});
export type GenerateInstagramHashtagsOutput = z.infer<typeof GenerateInstagramHashtagsOutputSchema>;

export async function generateInstagramHashtags(input: GenerateInstagramHashtagsInput): Promise<GenerateInstagramHashtagsOutput> {
  return generateInstagramHashtagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInstagramHashtagsPrompt',
  input: {schema: GenerateInstagramHashtagsInputSchema},
  output: {schema: GenerateInstagramHashtagsOutputSchema},
  prompt: `You are an expert social media manager specializing in generating relevant and trending hashtags for Instagram posts.

  Generate a list of 50 hashtags based on the following description or keywords: {{{$input}}}

  The hashtags must be highly relevant to the provided keywords and should be effective at increasing post visibility.

  Return the hashtags as a JSON array of strings.  Do not include any intro or explanation text.  Just return the JSON.  Do not include a backtick code fence.

  Example output:
  {
    "hashtags": ["#example", "#hashtag", "#socialmedia"]
  }`,
});

const generateInstagramHashtagsFlow = ai.defineFlow(
  {
    name: 'generateInstagramHashtagsFlow',
    inputSchema: GenerateInstagramHashtagsInputSchema,
    outputSchema: GenerateInstagramHashtagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
