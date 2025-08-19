"use server";

import {
  generateCaption,
  GenerateCaptionInput,
} from "@/ai/flows/caption-generator";
import { generateInstagramBio, GenerateInstagramBioInput } from "@/ai/flows/instagram-bio-generator";
import { generateXContentIdeas } from "@/ai/flows/x-content-ideas-generator";
import { generateYoutubeIdeas } from "@/ai/flows/youtube-idea-generator";
import { generateYoutubeTitle } from "@/ai/flows/youtube-title-generator";
import { generateTikTokVideoIdeas } from "@/ai/flows/tiktok-video-idea-generator";
import { generateInstagramHashtags, GenerateInstagramHashtagsInput } from "@/ai/flows/instagram-hashtag-generator";
import { z } from "zod";
import { generateInstagramCaptions, GenerateInstagramCaptionsInput } from "@/ai/flows/generate-instagram-captions";

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

const instagramCaptionSchema = z.object({
  topic: z.string().min(3, 'Please enter a topic with at least 3 characters.'),
  includeEmojis: z.boolean().optional(),
});


const xContentIdeasSchema = z.object({
  topic: z.string().min(3, "Please provide a topic."),
});

const youtubeIdeasSchema = z.object({
  topic: z.string().min(3, "Please provide a topic."),
});

const youtubeTitleSchema = z.object({
  description: z.string().min(10, "Please provide a longer description."),
});

const tiktokVideoIdeasSchema = z.object({
  topic: z.string().min(3, "Please provide a topic."),
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

export async function handleGenerateXContentIdeas(prevState: any, formData: FormData) {
  const validatedFields = xContentIdeasSchema.safeParse({
    topic: formData.get("topic"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const result = await generateXContentIdeas(validatedFields.data.topic);
    return {
      ideas: result.ideas,
    };
  } catch (error) {
    return {
      message: "Failed to generate ideas. Please try again later.",
    };
  }
}

export async function handleGenerateYoutubeIdeas(prevState: any, formData: FormData) {
  const validatedFields = youtubeIdeasSchema.safeParse({
    topic: formData.get("topic"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const result = await generateYoutubeIdeas(validatedFields.data.topic);
    return {
      ideas: result.ideas,
    };
  } catch (error) {
    return {
      message: "Failed to generate ideas. Please try again later.",
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
    return {
      message: "Failed to generate titles. Please try again later.",
    };
  }
}

export async function handleGenerateTikTokVideoIdeas(prevState: any, formData: FormData) {
  const validatedFields = tiktokVideoIdeasSchema.safeParse({
    topic: formData.get("topic"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const result = await generateTikTokVideoIdeas(validatedFields.data.topic);
    return {
      ideas: result.ideas,
    };
  } catch (error) {
    return {
      message: "Failed to generate ideas. Please try again later.",
    };
  }
}
