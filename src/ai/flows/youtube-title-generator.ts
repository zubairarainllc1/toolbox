'use server';

/**
 * @fileOverview YouTube Title Generator AI agent.
 *
 * - generateYoutubeTitle - A function that handles the generation of YouTube video titles.
 * - GenerateYoutubeTitleInput - The input type for the generateYoutubeTitle function.
 * - GenerateYoutubeTitleOutput - The return type for the generateYoutubeTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateYoutubeTitleInputSchema = z.string().describe('A description of the YouTube video content.');
export type GenerateYoutubeTitleInput = z.infer<typeof GenerateYoutubeTitleInputSchema>;

const GenerateYoutubeTitleOutputSchema = z.object({
  titles: z.array(z.string()).describe('An array of 5 catchy YouTube video titles.'),
});
export type GenerateYoutubeTitleOutput = z.infer<typeof GenerateYoutubeTitleOutputSchema>;

export async function generateYoutubeTitle(input: GenerateYoutubeTitleInput): Promise<GenerateYoutubeTitleOutput> {
  return generateYoutubeTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateYoutubeTitlePrompt',
  input: {schema: GenerateYoutubeTitleInputSchema},
  output: {schema: GenerateYoutubeTitleOutputSchema},
  prompt: `You are a YouTube SEO expert. Generate a list of 5 catchy and click-worthy titles for a video with the following description: {{{$input}}}

  The titles should be optimized for search and entice users to click.

  Return the titles as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON.`,
});

const generateYoutubeTitleFlow = ai.defineFlow(
  {
    name: 'generateYoutubeTitleFlow',
    inputSchema: GenerateYoutubeTitleInputSchema,
    outputSchema: GenerateYoutubeTitleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
