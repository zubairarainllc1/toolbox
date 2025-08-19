"use server";

import {
  generateCaption,
  GenerateCaptionInput,
} from "@/ai/flows/caption-generator";
import { generateInstagramHashtags } from "@/ai/flows/instagram-hashtag-generator";
import { z } from "zod";

const hashtagSchema = z.object({
  description: z.string().min(3, "Please provide a longer description."),
});

const captionSchema = z.object({
  postDescription: z.string().min(3, "Please provide a longer description."),
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
