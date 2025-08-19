'use server';

/**
 * @fileOverview SEO Metadata Regeneration AI agent.
 *
 * - regenerateMeta - A function that handles the regeneration of SEO metadata.
 * - RegenerateMetaInput - The input type for the regenerateMeta function.
 * - RegenerateMetaOutput - The return type for the regenerateMeta function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RegenerateMetaInputSchema = z.object({
  topic: z.string().describe('The main topic for the blog post.'),
  mainKeyword: z.string().describe('The primary SEO keyword for the blog post.'),
});
export type RegenerateMetaInput = z.infer<typeof RegenerateMetaInputSchema>;

const RegenerateMetaOutputSchema = z.object({
  metaTitle: z.string().describe('A new SEO-optimized meta title, around 50-60 characters.'),
  metaDescription: z.string().describe('A new SEO-optimized meta description, around 150-160 characters.'),
  permalink: z.string().describe('A new URL-friendly permalink/slug for the blog post.'),
});
export type RegenerateMetaOutput = z.infer<typeof RegenerateMetaOutputSchema>;

export async function regenerateMeta(
  input: RegenerateMetaInput
): Promise<RegenerateMetaOutput> {
  return regenerateMetaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'regenerateMetaPrompt',
  input: { schema: RegenerateMetaInputSchema },
  output: { schema: RegenerateMetaOutputSchema },
  prompt: `You are an SEO specialist. Generate a new set of SEO metadata based on the following details.

**Topic:** {{{topic}}}
**Main Keyword:** {{{mainKeyword}}}

**SEO Metadata Requirements:**
1.  **Meta Title:**
    - Must include the main keyword: "{{{mainKeyword}}}".
    - Should be concise and catchy, around 50-60 characters.
    - Use power words or numbers to attract clicks.
    - Must be different from any previous suggestions.
2.  **Meta Description:**
    - Must include the main keyword: "{{{mainKeyword}}}".
    - Should be a compelling summary, around 150-160 characters.
    - Encourage click-throughs.
    - Must be different from any previous suggestions.
3.  **Permalink:**
    - Create a URL-friendly slug from the topic.
    - Use lowercase letters and hyphens instead of spaces.
    - Must be different from any previous suggestions.
    - Example: "best-seo-blog-structure-2025"

Return the response as a single JSON object with the fields 'metaTitle', 'metaDescription', and 'permalink'.`,
});


const regenerateMetaFlow = ai.defineFlow(
  {
    name: 'regenerateMetaFlow',
    inputSchema: RegenerateMetaInputSchema,
    outputSchema: RegenerateMetaOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
