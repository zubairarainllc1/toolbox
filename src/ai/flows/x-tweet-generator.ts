'use server';

/**
 * @fileOverview X (Twitter) Tweet Generator AI agent.
 *
 * - generateXTweets - A function that handles the generation of X (Twitter) tweets.
 * - GenerateXTweetsInput - The input type for the generateXTweets function.
 * - GenerateXTweetsOutput - The return type for the generateXTweets function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateXTweetsInputSchema = z.object({
  topic: z.string().describe('The main topic or idea for the tweets.'),
  context: z.string().optional().describe('Any additional context, keywords, or links to include.'),
});
export type GenerateXTweetsInput = z.infer<typeof GenerateXTweetsInputSchema>;

const GenerateXTweetsOutputSchema = z.object({
  tweets: z.array(z.string()).describe('An array of 5 generated tweets.'),
});
export type GenerateXTweetsOutput = z.infer<typeof GenerateXTweetsOutputSchema>;

export async function generateXTweets(
  input: GenerateXTweetsInput
): Promise<GenerateXTweetsOutput> {
  return generateXTweetsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateXTweetsPrompt',
  input: { schema: GenerateXTweetsInputSchema },
  output: { schema: GenerateXTweetsOutputSchema },
  prompt: `You are a viral X (formerly Twitter) marketing expert. Generate 5 unique and engaging tweets based on the following topic.

Topic: {{{topic}}}

{{#if context}}
Additional Context: {{{context}}}
{{/if}}

The tweets should be concise, impactful, and suitable for the X platform. Include relevant hashtags where appropriate.

Return the 5 tweets as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON.`,
});

const generateXTweetsFlow = ai.defineFlow(
  {
    name: 'generateXTweetsFlow',
    inputSchema: GenerateXTweetsInputSchema,
    outputSchema: GenerateXTweetsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
