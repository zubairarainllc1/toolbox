"use server";

import {
  generateCaption,
  GenerateCaptionInput,
} from "@/ai/flows/caption-generator";
import { generateInstagramBio, GenerateInstagramBioInput } from "@/ai/flows/instagram-bio-generator";
import { generateInstagramHashtags, GenerateInstagramHashtagsInput } from "@/ai/flows/instagram-hashtag-generator";
import { generateFacebookHashtags, GenerateFacebookHashtagsInput } from "@/ai/flows/facebook-hashtag-generator";
import { z } from "zod";
import { generateInstagramCaptions, GenerateInstagramCaptionsInput } from "@/ai/flows/generate-instagram-captions";
import { generateFacebookCaptions, GenerateFacebookCaptionsInput } from "@/ai/flows/facebook-caption-generator";
import { generateXHashtags, GenerateXHashtagsInput } from "@/ai/flows/x-hashtag-generator";
import { generateYoutubeTitle, GenerateYoutubeTitleInput } from "@/ai/flows/youtube-title-generator";
import { generateYoutubeContentIdeas, GenerateYoutubeContentIdeasInput } from "@/ai/flows/youtube-content-idea-generator";
import { generateYoutubeViralHooks, GenerateYoutubeViralHooksInput } from "@/ai/flows/youtube-viral-hooks-generator";
import { generateYoutubeDescription, GenerateYoutubeDescriptionInput } from "@/ai/flows/youtube-description-generator";
import { generateXTweets, GenerateXTweetsInput } from "@/ai/flows/x-tweet-generator";


const captionSchema = z.object({
  topic: z.string().min(3, "Please provide a longer topic."),
});

const instagramBioSchema = z.object({
  description: z.string().min(10, "Please provide a longer description."),
  keywords: z.string().min(3, "Please provide some keywords."),
  tone: z.string(),
});

const instagramHashtagSchema = z.object({
  topic: z.string().min(3, 'Please enter a topic with at least 3 characters.'),
});

const facebookHashtagSchema = z.object({
  topic: z.string().min(3, 'Please enter a topic with at least 3 characters.'),
});

const xHashtagSchema = z.object({
  topic: z.string().min(3, 'Please enter a topic with at least 3 characters.'),
});

const instagramCaptionSchema = z.object({
  topic: z.string().min(3, 'Please enter a topic with at least 3 characters.'),
  includeEmojis: z.boolean().optional(),
});

const facebookCaptionSchema = z.object({
  topic: z.string().min(3, 'Please enter a topic with at least 3 characters.'),
  includeEmojis: z.boolean().optional(),
});

const youtubeTitleSchema = z.object({
  description: z.string().min(10, 'Please provide a longer description.'),
});

const youtubeContentIdeasSchema = z.object({
  topic: z.string().min(3, 'Please enter a topic with at least 3 characters.'),
});

const youtubeViralHooksSchema = z.object({
  topic: z.string().min(3, 'Please enter a topic with at least 3 characters.'),
});

const youtubeDescriptionSchema = z.object({
  title: z.string().min(10, 'Please provide a longer title.'),
  keywords: z.string().optional(),
});

const xTweetSchema = z.object({
  topic: z.string().min(3, 'Please enter a topic with at least 3 characters.'),
  context: z.string().optional(),
});


export async function handleGenerateCaption(prevState: any, formData: FormData) {
  const validatedFields = captionSchema.safeParse({
    topic: formData.get("topic"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(", "),
    };
  }
  
  try {
    const result = await generateCaption(validatedFields.data as GenerateCaptionInput);
    return {
      captions: result.captions,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to generate caption. Please try again later.",
    };
  }
}

export async function handleGenerateInstagramBio(prevState: any, formData: FormData) {
  const validatedFields = instagramBioSchema.safeParse({
    description: formData.get("description"),
    keywords: formData.get("keywords"),
    tone: formData.get("tone"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const result = await generateInstagramBio(validatedFields.data as GenerateInstagramBioInput);
    return {
      bios: result.bios,
    };
  } catch (error) {
    return {
      message: "Failed to generate bio. Please try again later.",
    };
  }
}

export async function handleGenerateInstagramHashtags(prevState: any, formData: FormData) {
  const validatedFields = instagramHashtagSchema.safeParse({
    topic: formData.get("topic"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const result = await generateInstagramHashtags(validatedFields.data as GenerateInstagramHashtagsInput);
    const uniqueHashtags = Array.from(new Set(result.hashtags));
    return {
      hashtags: uniqueHashtags,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to generate hashtags. Please try again later.",
    };
  }
}

export async function handleGenerateFacebookHashtags(prevState: any, formData: FormData) {
  const validatedFields = facebookHashtagSchema.safeParse({
    topic: formData.get("topic"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const result = await generateFacebookHashtags(validatedFields.data as GenerateFacebookHashtagsInput);
    const uniqueHashtags = Array.from(new Set(result.hashtags));
    return {
      hashtags: uniqueHashtags,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to generate hashtags. Please try again later.",
    };
  }
}

export async function handleGenerateXHashtags(prevState: any, formData: FormData) {
  const validatedFields = xHashtagSchema.safeParse({
    topic: formData.get("topic"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const result = await generateXHashtags(validatedFields.data as GenerateXHashtagsInput);
    const uniqueHashtags = Array.from(new Set(result.hashtags));
    return {
      hashtags: uniqueHashtags,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to generate hashtags. Please try again later.",
    };
  }
}

export async function handleGenerateInstagramCaptions(prevState: any, formData: FormData) {
  const validatedFields = instagramCaptionSchema.safeParse({
    topic: formData.get("topic"),
    includeEmojis: formData.get("includeEmojis") === 'on',
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const result = await generateInstagramCaptions(validatedFields.data as GenerateInstagramCaptionsInput);
    return {
      captions: result.captions,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to generate captions. Please try again later.",
    };
  }
}

export async function handleGenerateFacebookCaptions(prevState: any, formData: FormData) {
  const validatedFields = facebookCaptionSchema.safeParse({
    topic: formData.get("topic"),
    includeEmojis: formData.get("includeEmojis") === 'on',
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const result = await generateFacebookCaptions(validatedFields.data as GenerateFacebookCaptionsInput);
    return {
      captions: result.captions,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to generate captions. Please try again later.",
    };
  }
}

export async function handleGenerateYoutubeTitle(prevState: any, formData: FormData) {
  const validatedFields = youtubeTitleSchema.safeParse({
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const result = await generateYoutubeTitle(validatedFields.data.description);
    return {
      titles: result.titles,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to generate titles. Please try again later.",
    };
  }
}

export async function handleGenerateYoutubeContentIdeas(prevState: any, formData: FormData) {
  const validatedFields = youtubeContentIdeasSchema.safeParse({
    topic: formData.get("topic"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const result = await generateYoutubeContentIdeas(validatedFields.data as GenerateYoutubeContentIdeasInput);
    return {
      ideas: result.ideas,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to generate ideas. Please try again later.",
    };
  }
}

export async function handleGenerateYoutubeViralHooks(prevState: any, formData: FormData) {
  const validatedFields = youtubeViralHooksSchema.safeParse({
    topic: formData.get("topic"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const result = await generateYoutubeViralHooks(validatedFields.data as GenerateYoutubeViralHooksInput);
    return {
      hooks: result.hooks,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to generate hooks. Please try again later.",
    };
  }
}

export async function handleGenerateYoutubeDescription(
  input: GenerateYoutubeDescriptionInput
): Promise<{ description?: string; message?: string }> {
  const validatedFields = youtubeDescriptionSchema.safeParse(input);

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(', '),
    };
  }

  try {
    const result = await generateYoutubeDescription(validatedFields.data);
    return {
      description: result.description,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to generate description. Please try again later.',
    };
  }
}

export async function handleGenerateXTweets(prevState: any, formData: FormData) {
  const validatedFields = xTweetSchema.safeParse({
    topic: formData.get("topic"),
    context: formData.get("context"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const result = await generateXTweets(validatedFields.data as GenerateXTweetsInput);
    return {
      tweets: result.tweets,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to generate tweets. Please try again later.",
    };
  }
}
