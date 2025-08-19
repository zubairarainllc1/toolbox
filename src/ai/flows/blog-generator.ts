
'use server';

/**
 * @fileOverview Blog Post Generator AI agent.
 *
 * - generateBlogPost - A function that handles the generation of a blog post.
 * - GenerateBlogPostInput - The input type for the generateBlogPost function.
 * - GenerateBlogPostOutput - The return type for the generateBlogPost function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const LinkSchema = z.object({
  url: z.string().url(),
  text: z.string(),
  prompt: z.string(),
});

const CTASchema = z.object({
  link: z.string().url(),
  prompt: z.string(),
});

const GenerateBlogPostInputSchema = z.object({
  topic: z.string().describe('The main topic for the blog post.'),
  mainKeyword: z.string().describe('The primary SEO keyword for the blog post.'),
  relatedKeywords: z.array(z.string()).optional().describe('A list of related keywords to include for SEO.'),
  tone: z.enum(['professional', 'casual', 'funny', 'informative', 'inspirational']).describe('The desired tone for the blog post.'),
  wordCount: z.number().min(600).max(2500).describe('The desired word count for the blog post.'),
  includePoints: z.boolean().optional().describe('Whether or not to include bullet points in the blog post.'),
  internalLinks: z.array(LinkSchema).optional().describe('A list of internal links to include in the blog post.'),
  externalLinks: z.array(LinkSchema).optional().describe('A list of external, high-authority links to include.'),
  cta: CTASchema.optional().describe('A call-to-action to include in the conclusion.'),
});
export type GenerateBlogPostInput = z.infer<typeof GenerateBlogPostInputSchema>;

const GenerateBlogPostOutputSchema = z.object({
  blogPost: z.string().describe('The full generated blog post content, formatted in Markdown.'),
  metaTitle: z.string().describe('An SEO-optimized meta title, around 50-60 characters.'),
  metaDescription: z.string().describe('An SEO-optimized meta description, around 150-160 characters.'),
  permalink: z.string().describe('A URL-friendly permalink/slug for the blog post.'),
});
export type GenerateBlogPostOutput = z.infer<typeof GenerateBlogPostOutputSchema>;

export async function generateBlogPost(
  input: GenerateBlogPostInput
): Promise<GenerateBlogPostOutput> {
  return generateBlogPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogPostPrompt',
  input: { schema: GenerateBlogPostInputSchema },
  output: { schema: GenerateBlogPostOutputSchema },
  prompt: `You are an expert content writer and SEO specialist. Your task is to generate a well-structured, SEO-friendly, and engaging blog post and its associated SEO metadata based on the following details.

**Blog Post Requirements:**
- Topic: {{{topic}}}
- Main Keyword: {{{mainKeyword}}}
{{#if relatedKeywords}}
- Related Keywords: {{{relatedKeywords}}}
{{/if}}
- Tone: {{{tone}}}
- Word Count: Approximately {{{wordCount}}} words.
{{#if includePoints}}
- Include bulleted lists where it makes sense to break up content.
{{/if}}

**Link Integration Rules (VERY IMPORTANT):**
{{#if internalLinks}}
- Internal Links to integrate:
  {{#each internalLinks}}
  - You are given this link: URL="{{url}}", Anchor Text="{{text}}". The goal is to place it naturally in the text based on this prompt: "{{prompt}}".
  - **Critically, you must ONLY insert this link if the context described in the prompt genuinely fits within the article's topic. If it does not fit, DO NOT INCLUDE THE LINK.** Do not force irrelevant links.
  {{/each}}
{{/if}}
{{#if externalLinks}}
- External Links to integrate:
  {{#each externalLinks}}
  - You are given this link: URL="{{url}}", Anchor Text="{{text}}". The goal is to place it naturally in the text based on this prompt: "{{prompt}}".
  - **Critically, you must ONLY insert this link if the context described in the prompt genuinely fits within the article's topic. If it does not fit, DO NOT INCLUDE THE LINK.** Do not force irrelevant links.
  {{/each}}
{{/if}}

**SEO Metadata Requirements:**
1. **Meta Title:**
   - Must include the main keyword: "{{{mainKeyword}}}".
   - Should be concise and catchy, around 50-60 characters.
   - Use power words or numbers to attract clicks.
2. **Meta Description:**
   - Must include the main keyword: "{{{mainKeyword}}}".
   - Should be a compelling summary, around 150-160 characters.
   - Encourage click-throughs.
3. **Permalink:**
   - Create a URL-friendly slug from the topic.
   - Use lowercase letters and hyphens instead of spaces.
   - Example: "best-seo-blog-structure-2025"

**Strict SEO Blog Structure to Follow:**
1.  **Title (H1):**
    - Must be clear, catchy, and include the main keyword: "{{{mainKeyword}}}".
    - Example Format: "Best SEO Blog Structure: Rank on Google in 2025"

2.  **Introduction:**
    - Length: 100–150 words.
    - Must start with a strong hook to engage the reader.
    - Must use the main keyword "{{{mainKeyword}}}" exactly once.

3.  **Headings (H2, H3, H4):**
    - Divide the blog post into logical sections using H2 headings for main topics and H3/H4 for sub-topics.
    - Each H2 heading should ideally contain the main keyword or a primary related keyword.
    - Use related keywords in H3/H4 headings where natural.

4.  **Body Content:**
    - Must be detailed and easy to read.
    - Natural Keyword Placement:
        - Use the main keyword "{{{mainKeyword}}}" approximately every 150-200 words. Do not force it.
        - Naturally incorporate LSI keywords (the provided related keywords) throughout the text.
    - Readability: Add a line break after approximately every 35 words to create shorter paragraphs.
    {{#if includePoints}}
    - Lists: Use bullet points or numbered lists to present information clearly where appropriate (e.g., for steps, tips, or examples).
    {{/if}}
    - Linking: Integrate the provided links using Markdown format like [Anchor Text](URL). The placement must be natural and contextually relevant based on the linking prompts provided. **If a link's context does not fit the article, do not include it.**

5. **Keyword Placement Summary:**
    - Title (H1): Once.
    - Introduction: Once.
    - First H2 Heading: Once.
    - Body: Naturally, every 150-200 words.
    - Conclusion: Once.

6.  **Conclusion:**
    - A brief summary of the main points.
    - Must include the main keyword "{{{mainKeyword}}}" once.
    {{#if cta}}
    - **Call to Action (CTA) Rule:** You must seamlessly integrate the following CTA into the conclusion. The CTA should feel like a natural extension of the blog post's topic, based on the provided prompt.
      - Link: {{{cta.link}}}
      - Prompt for CTA context: "{{{cta.prompt}}}"
      - **Do not make it sound like an advertisement. It must be woven into the concluding paragraph organically.**
    {{/if}}

Return the complete response as a single JSON object with the fields 'blogPost', 'metaTitle', 'metaDescription', and 'permalink'. For the 'blogPost' field, do not add any introductory text before the H1 title.`,
});


const generateBlogPostFlow = ai.defineFlow(
  {
    name: 'generateBlogPostFlow',
    inputSchema: GenerateBlogPostInputSchema,
    outputSchema: GenerateBlogPostOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
