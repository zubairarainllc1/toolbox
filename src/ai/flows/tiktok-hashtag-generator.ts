'use server';

/**
 * @fileOverview TikTok Hashtag Generator AI agent.
 *
 * - generateTikTokHashtags - A function that handles the generation of TikTok hashtags.
 * - GenerateTikTokHashtagsInput - The input type for the generateTikTokHashtags function.
 * - GenerateTikTokHashtagsOutput - The return type for the generateTikTokHashtags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTikTokHashtagsInputSchema = z.string().describe('A description or keywords for the TikTok video.');
export type GenerateTikTokHashtagsInput = z.infer<typeof GenerateTikTokHashtagsInputSchema>;

const GenerateTikTokHashtagsOutputSchema = z.object({
  hashtags: z.array(z.string()).describe('An array of relevant hashtags for the TikTok video.'),
});
export type GenerateTikTokHashtagsOutput = z.infer<typeof GenerateTikTokHashtagsOutputSchema>;

export async function generateTikTokHashtags(input: GenerateTikTokHashtagsInput): Promise<GenerateTikTokHashtagsOutput> {
  return generateTikTokHashtagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTikTokHashtagsPrompt',
  input: {schema: GenerateTikTokHashtagsInputSchema},
  output: {schema: GenerateTikTokHashtagsOutputSchema},
  prompt: `You are an expert social media manager specializing in generating relevant and trending hashtags for TikTok videos.

  Generate a list of hashtags based on the following description or keywords: {{{$input}}}

  The hashtags should be relevant to the content and help increase its visibility on TikTok. Include a mix of popular and niche hashtags.

  Return the hashtags as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON. Do not include a backtick code fence.

  Example output:
  {
    "hashtags": ["#tiktok", "#foryoupage", "#fyp", "#viralvideo"]
  }`,
});

const generateTikTokHashtagsFlow = ai.defineFlow(
  {
    name: 'generateTikTokHashtagsFlow',
    inputSchema: GenerateTikTokHashtagsInputSchema,
    outputSchema: GenerateTikTokHashtagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
