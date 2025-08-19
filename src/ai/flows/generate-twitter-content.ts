'use server';

/**
 * @fileOverview X (Twitter) Tweet Generator AI agent.
 *
 * - generateTwitterContent - A function that handles the generation of tweets.
 * - GenerateTwitterContentInput - The input type for the generateTwitterContent function.
 * - GenerateTwitterContentOutput - The return type for the generateTwitterContent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateTwitterContentInputSchema = z.object({
  topic: z.string().describe('The main topic or idea for the tweets.'),
  context: z.string().optional().describe('Any additional context, keywords, or links to include.'),
  tweetsQuantity: z.number().int().min(1).max(10).describe('The number of tweets to generate.'),
});
export type GenerateTwitterContentInput = z.infer<typeof GenerateTwitterContentInputSchema>;

const GenerateTwitterContentOutputSchema = z.object({
  tweets: z.array(z.string()).describe('An array of generated tweets.'),
  hashtags: z.array(z.string()).describe('An array of relevant hashtags (currently not used).'),
});
export type GenerateTwitterContentOutput = z.infer<typeof GenerateTwitterContentOutputSchema>;

export async function generateTwitterContent(input: GenerateTwitterContentInput): Promise<GenerateTwitterContentOutput> {
  return generateTwitterContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTwitterContentPrompt',
  input: { schema: GenerateTwitterContentInputSchema },
  output: { schema: GenerateTwitterContentOutputSchema },
  prompt: `You are an expert X (formerly Twitter) content creator. Your goal is to generate {{{tweetsQuantity}}} engaging and concise tweets based on the provided topic and context.

Topic: {{{topic}}}

{{#if context}}
Context: {{{context}}}
{{/if}}

The tweets should be short, impactful, and suitable for the X platform. Ensure they are distinct from each other.

Return the result as a JSON object with a "tweets" field containing an array of the generated tweets, and an empty "hashtags" array. Do not include any intro or explanation text. Just return the JSON.`,
});

const generateTwitterContentFlow = ai.defineFlow(
  {
    name: 'generateTwitterContentFlow',
    inputSchema: GenerateTwitterContentInputSchema,
    outputSchema: GenerateTwitterContentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
