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
  hashtags: z.array(z.string()).describe('An array of 50 relevant and unique hashtags for the Instagram post.'),
});
export type GenerateInstagramHashtagsOutput = z.infer<typeof GenerateInstagramHashtagsOutputSchema>;

export async function generateInstagramHashtags(input: GenerateInstagramHashtagsInput): Promise<GenerateInstagramHashtagsOutput> {
  return generateInstagramHashtagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInstagramHashtagsPrompt',
  input: {schema: GenerateInstagramHashtagsInputSchema},
  output: {schema: GenerateInstagramHashtagsOutputSchema},
  prompt: `Generate 50 unique, highly relevant, and effective Instagram hashtags for the following topic.
The hashtags must be a mix of popular, niche, and trending terms to maximize reach and engagement for that specific topic.

Topic: {{{$input}}}

IMPORTANT:
- The hashtags must be directly related to the topic.
- All hashtags in the list must be unique.
- Return them as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON. Do not include a backtick code fence.
`,
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
