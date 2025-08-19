"use server";

import {
  generateCaption,
  GenerateCaptionInput,
} from "@/ai/flows/caption-generator";
import { generateInstagramHashtags } from "@/ai/flows/instagram-hashtag-generator";
import { generateInstagramBio, GenerateInstagramBioInput } from "@/ai/flows/instagram-bio-generator";
import { generateFacebookHashtags } from "@/ai/flows/facebook-hashtag-generator";
import { generateFacebookPost, GenerateFacebookPostInput } from "@/ai/flows/facebook-post-generator";
import { generateXHashtags } from "@/ai/flows/x-hashtag-generator";
import { generateXContentIdeas } from "@/ai/flows/x-content-ideas-generator";
import { generateYoutubeIdeas } from "@/ai/flows/youtube-idea-generator";
import { generateYoutubeTitle } from "@/ai/flows/youtube-title-generator";
import { generateTikTokHashtags } from "@/ai/flows/tiktok-hashtag-generator";
import { generateTikTokVideoIdeas } from "@/ai/flows/tiktok-video-idea-generator";
import { z } from "zod";

const hashtagSchema = z.object({
  description: z.string().min(3, "Please provide a longer description."),
});

const captionSchema = z.object({
  postDescription: z.string().min(3, "Please provide a longer description."),
});

const instagramBioSchema = z.object({
  description: z.string().min(10, "Please provide a longer description."),
  keywords: z.string().min(3, "Please provide some keywords."),
  tone: z.string(),
});

const facebookPostSchema = z.object({
  postDescription: z.string().min(3, "Please provide a longer description."),
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


export async function handleGenerateHashtags(prevState: any, formData: FormData) {
  const validatedFields = hashtagSchema.safeParse({
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const result = await generateInstagramHashtags(validatedFields.data.description);
    return {
      hashtags: result.hashtags,
    };
  } catch (error) {
    return {
      message: "Failed to generate hashtags. Please try again later.",
    };
  }
}


export async function handleGenerateCaption(prevState: any, formData: FormData) {
  const validatedFields = captionSchema.safeParse({
    postDescription: formData.get("postDescription"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(", "),
    };
  }
  
  try {
    const result = await generateCaption(validatedFields.data as GenerateCaptionInput);
    return {
      caption: result.caption,
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
      bio: result.bio,
    };
  } catch (error) {
    return {
      message: "Failed to generate bio. Please try again later.",
    };
  }
}

export async function handleGenerateFacebookHashtags(prevState: any, formData: FormData) {
  const validatedFields = hashtagSchema.safeParse({
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const result = await generateFacebookHashtags(validatedFields.data.description);
    return {
      hashtags: result.hashtags,
    };
  } catch (error) {
    return {
      message: "Failed to generate hashtags. Please try again later.",
    };
  }
}

export async function handleGenerateFacebookPost(prevState: any, formData: FormData) {
  const validatedFields = facebookPostSchema.safeParse({
    postDescription: formData.get("postDescription"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(", "),
    };
  }
  
  try {
    const result = await generateFacebookPost(validatedFields.data as GenerateFacebookPostInput);
    return {
      post: result.post,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to generate post. Please try again later.",
    };
  }
}

export async function handleGenerateXHashtags(prevState: any, formData: FormData) {
  const validatedFields = hashtagSchema.safeParse({
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const result = await generateXHashtags(validatedFields.data.description);
    return {
      hashtags: result.hashtags,
    };
  } catch (error) {
    return {
      message: "Failed to generate hashtags. Please try again later.",
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

export async function handleGenerateTikTokHashtags(prevState: any, formData: FormData) {
  const validatedFields = hashtagSchema.safeParse({
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const result = await generateTikTokHashtags(validatedFields.data.description);
    return {
      hashtags: result.hashtags,
    };
  } catch (error) {
    return {
      message: "Failed to generate hashtags. Please try again later.",
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