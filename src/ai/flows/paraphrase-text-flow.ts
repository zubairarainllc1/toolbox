'use server';

/**
 * @fileOverview Text Paraphrasing AI agent.
 *
 * - paraphraseText - A function that rewrites a given text to be unique while preserving its meaning.
 * - ParaphraseTextInput - The input type for the paraphraseText function.
 * - ParaphraseTextOutput - The return type for the paraphraseText function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ParaphraseTextInputSchema = z.object({
  text: z.string().describe('The text to be paraphrased.'),
});
export type ParaphraseTextInput = z.infer<typeof ParaphraseTextInputSchema>;

const ParaphraseTextOutputSchema = z.object({
  rewrittenText: z.string().describe('The rewritten, unique version of the original text.'),
});
export type ParaphraseTextOutput = z.infer<typeof ParaphraseTextOutputSchema>;

export async function paraphraseText(
  input: ParaphraseTextInput
): Promise<ParaphraseTextOutput> {
  return paraphraseTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'paraphraseTextPrompt',
  input: { schema: ParaphraseTextInputSchema },
  output: { schema: ParaphraseTextOutputSchema },
  prompt: `You are an expert content editor specializing in eliminating plagiarism. Your task is to rewrite the given text to make it unique, while strictly preserving the original meaning, tone, and key information.

Rewrite the following text:
"{{{text}}}"

Ensure the rewritten text is completely original and would pass plagiarism checks. Do not add any new information or change the core message.`,
});


const paraphraseTextFlow = ai.defineFlow(
  {
    name: 'paraphraseTextFlow',
    inputSchema: ParaphraseTextInputSchema,
    outputSchema: ParaphraseTextOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
