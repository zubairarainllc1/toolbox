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
import { generateYoutubeViralHooks, GenerateYoutubeViralHooksInput } from "@/ai/flows/youtube-viral-hooks-generator";
import { generateYoutubeDescription, GenerateYoutubeDescriptionInput } from "@/ai/flows/youtube-description-generator";
import { generateTikTokViralHooks, GenerateTikTokViralHooksInput } from "@/ai/flows/tiktok-viral-hooks-generator";
import { generateTikTokDescription, GenerateTikTokDescriptionInput } from "@/ai/flows/tiktok-description-generator";
import { generateYoutubeContentIdeas, GenerateYoutubeContentIdeasInput } from "@/ai/flows/youtube-content-idea-generator";
import { generateTikTokContentIdeas, GenerateTikTokContentIdeasInput } from "@/ai/flows/tiktok-content-idea-generator";


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

const instagramCaptionSchema = z.object({
  topic: z.string().min(3, 'Please enter a topic with at least 3 characters.'),
  includeEmojis: z.boolean().optional(),
});

const facebookCaptionSchema = z.object({
  topic: z.string().min(3, 'Please enter a topic with at least 3 characters.'),
  includeEmojis: z.boolean().optional(),
});

const youtubeViralHooksSchema = z.object({
  topic: z.string().min(3, 'Please enter a topic with at least 3 characters.'),
});

const youtubeDescriptionSchema = z.object({
  title: z.string().min(10, 'Please provide a longer title.'),
  keywords: z.string().optional(),
});

const tiktokViralHooksSchema = z.object({
  topic: z.string().min(3, 'Please enter a topic with at least 3 characters.'),
});

const tiktokDescriptionSchema = z.object({
  title: z.string().min(10, 'Please provide a longer title.'),
  keywords: z.string().optional(),
});

const youtubeContentIdeasSchema = z.object({
  topic: z.string().min(3, 'Please enter a topic with at least 3 characters.'),
});

const tiktokContentIdeasSchema = z.object({
    topic: z.string().min(3, 'Please enter a topic with at least 3 characters.'),
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

export async function handleGenerateTikTokViralHooks(prevState: any, formData: FormData) {
  const validatedFields = tiktokViralHooksSchema.safeParse({
    topic: formData.get("topic"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const result = await generateTikTokViralHooks(validatedFields.data as GenerateTikTokViralHooksInput);
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

export async function handleGenerateTikTokDescription(
  input: GenerateTikTokDescriptionInput
): Promise<{ description?: string; message?: string }> {
  const validatedFields = tiktokDescriptionSchema.safeParse(input);

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(', '),
    };
  }

  try {
    const result = await generateTikTokDescription(validatedFields.data);
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

export async function handleGenerateYoutubeContentIdeas(
    prevState: any,
    formData: FormData
  ) {
    const validatedFields = youtubeContentIdeasSchema.safeParse({
      topic: formData.get('topic'),
    });
  
    if (!validatedFields.success) {
      return {
        message: validatedFields.error.errors.map((e) => e.message).join(', '),
      };
    }
  
    try {
      const result = await generateYoutubeContentIdeas(
        validatedFields.data as GenerateYoutubeContentIdeasInput
      );
      return {
        ideas: result.ideas,
      };
    } catch (error) {
      console.error(error);
      return {
        message: 'Failed to generate ideas. Please try again later.',
      };
    }
  }

  export async function handleGenerateTikTokContentIdeas(
    prevState: any,
    formData: FormData
  ) {
    const validatedFields = tiktokContentIdeasSchema.safeParse({
      topic: formData.get('topic'),
    });
  
    if (!validatedFields.success) {
      return {
        message: validatedFields.error.errors.map((e) => e.message).join(', '),
      };
    }
  
    try {
      const result = await generateTikTokContentIdeas(
        validatedFields.data as GenerateTikTokContentIdeasInput
      );
      return {
        ideas: result.ideas,
      };
    } catch (error) {
      console.error(error);
      return {
        message: 'Failed to generate ideas. Please try again later.',
      };
    }
  }
