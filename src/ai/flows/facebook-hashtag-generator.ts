'use server';

/**
 * @fileOverview Facebook Hashtag Generator AI agent.
 *
 * - generateFacebookHashtags - A function that handles the generation of Facebook hashtags.
 * - GenerateFacebookHashtagsInput - The input type for the generateFacebookHashtags function.
 * - GenerateFacebookHashtagsOutput - The return type for the generateFacebookHashtags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFacebookHashtagsInputSchema = z.string().describe('A description or keywords for the Facebook post.');
export type GenerateFacebookHashtagsInput = z.infer<typeof GenerateFacebookHashtagsInputSchema>;

const GenerateFacebookHashtagsOutputSchema = z.object({
  hashtags: z.array(z.string()).describe('An array of relevant hashtags for the Facebook post.'),
});
export type GenerateFacebookHashtagsOutput = z.infer<typeof GenerateFacebookHashtagsOutputSchema>;

export async function generateFacebookHashtags(input: GenerateFacebookHashtagsInput): Promise<GenerateFacebookHashtagsOutput> {
  return generateFacebookHashtagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFacebookHashtagsPrompt',
  input: {schema: GenerateFacebookHashtagsInputSchema},
  output: {schema: GenerateFacebookHashtagsOutputSchema},
  prompt: `You are an expert social media manager specializing in generating relevant and trending hashtags for Facebook posts.

  Generate a list of hashtags based on the following description or keywords: {{{$input}}}

  The hashtags should be relevant to the content and help increase its visibility on Facebook.

  Return the hashtags as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON. Do not include a backtick code fence.

  Example output:
  {
    "hashtags": ["#facebookmarketing", "#socialmedia", "#digitalmarketing"]
  }`,
});

const generateFacebookHashtagsFlow = ai.defineFlow(
  {
    name: 'generateFacebookHashtagsFlow',
    inputSchema: GenerateFacebookHashtagsInputSchema,
    outputSchema: GenerateFacebookHashtagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
