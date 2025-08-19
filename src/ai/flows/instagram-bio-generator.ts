'use server';

/**
 * @fileOverview Instagram Bio Generator AI agent.
 *
 * - generateInstagramBio - A function that handles the generation of an Instagram bio.
 * - GenerateInstagramBioInput - The input type for the generateInstagramBio function.
 * - GenerateInstagramBioOutput - The return type for the generateInstagramBio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInstagramBioInputSchema = z.object({
  description: z.string().describe('A description of the user or brand for the Instagram bio.'),
  keywords: z.string().describe('Keywords to include in the bio.'),
  tone: z.string().describe('The desired tone for the bio (e.g., professional, witty, friendly).'),
});
export type GenerateInstagramBioInput = z.infer<typeof GenerateInstagramBioInputSchema>;

const GenerateInstagramBioOutputSchema = z.object({
  bios: z.array(z.string()).describe('An array of 5 generated Instagram bios.'),
});
export type GenerateInstagramBioOutput = z.infer<typeof GenerateInstagramBioOutputSchema>;

export async function generateInstagramBio(input: GenerateInstagramBioInput): Promise<GenerateInstagramBioOutput> {
  return generateInstagramBioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInstagramBioPrompt',
  input: {schema: GenerateInstagramBioInputSchema},
  output: {schema: GenerateInstagramBioOutputSchema},
  prompt: `You are an expert social media profile writer. Create 5 distinct and compelling Instagram bios based on the following details. Each bio should be a maximum of 150 characters.

Description: {{{description}}}
Keywords: {{{keywords}}}
Tone: {{{tone}}}

Return the bios as a JSON array of strings. Do not include any intro or explanation text. Just return the JSON.`,
});

const generateInstagramBioFlow = ai.defineFlow(
  {
    name: 'generateInstagramBioFlow',
    inputSchema: GenerateInstagramBioInputSchema,
    outputSchema: GenerateInstagramBioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
