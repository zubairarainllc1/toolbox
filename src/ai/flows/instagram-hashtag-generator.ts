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

const GenerateInstagramHashtagsInputSchema = z.object({
  topic: z.string().describe('The topic or niche for the post.'),
  contentType: z.enum(['photo', 'video']).describe('The type of content (photo or video).'),
  quantity: z.number().min(1).max(30).describe('The number of hashtags to generate.'),
});
export type GenerateInstagramHashtagsInput = z.infer<typeof GenerateInstagramHashtagsInputSchema>;

const GenerateInstagramHashtagsOutputSchema = z.object({
  hashtags: z.array(z.string()).describe('An array of generated Instagram hashtags.'),
});
export type GenerateInstagramHashtagsOutput = z.infer<typeof GenerateInstagramHashtagsOutputSchema>;

export async function generateInstagramHashtags(input: GenerateInstagramHashtagsInput): Promise<GenerateInstagramHashtagsOutput> {
  return generateInstagramHashtagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInstagramHashtagsPrompt',
  input: {schema: GenerateInstagramHashtagsInputSchema},
  output: {schema: GenerateInstagramHashtagsOutputSchema},
  prompt: `You are a viral Instagram marketing expert. Generate {{{quantity}}} unique and relevant Instagram hashtags for a {{{contentType}}} post about "{{{topic}}}".

The hashtags must be a mix of popular, niche, and trending terms to maximize reach and engagement. Do not include generic or irrelevant hashtags.

Return the hashtags as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON.
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
