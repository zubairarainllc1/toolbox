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

const GenerateFacebookHashtagsInputSchema = z.object({
  topic: z.string().describe('The topic or niche for the post.'),
});
export type GenerateFacebookHashtagsInput = z.infer<typeof GenerateFacebookHashtagsInputSchema>;

const GenerateFacebookHashtagsOutputSchema = z.object({
  hashtags: z.array(z.string()).describe('An array of 50 generated Facebook hashtags.'),
});
export type GenerateFacebookHashtagsOutput = z.infer<typeof GenerateFacebookHashtagsOutputSchema>;

export async function generateFacebookHashtags(input: GenerateFacebookHashtagsInput): Promise<GenerateFacebookHashtagsOutput> {
  return generateFacebookHashtagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFacebookHashtagsPrompt',
  input: {schema: GenerateFacebookHashtagsInputSchema},
  output: {schema: GenerateFacebookHashtagsOutputSchema},
  prompt: `You are a viral Facebook marketing expert. Generate 50 unique and relevant Facebook hashtags for a post about "{{{topic}}}".

The hashtags must be a mix of popular, niche, and trending terms to maximize reach and engagement.

Return the 50 hashtags as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON.`,
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
