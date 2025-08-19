import type { LucideIcon } from "lucide-react";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Image,
  Sparkles,
  Scissors,
  FileText,
  Type,
  Hash,
  Lightbulb,
} from "lucide-react";

export type ToolCategory =
  | "Productive Tools"
  | "Instagram"
  | "Facebook"
  | "X (Twitter)"
  | "YouTube";

export interface Tool {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  category: ToolCategory;
  comingSoon?: boolean;
}

export const tools: Tool[] = [
  // Productive Tools
  {
    title: "Image Converter",
    description: "Convert images between JPG, PNG, and WebP formats.",
    href: "/tools/image-converter",
    icon: Image,
    category: "Productive Tools",
  },
  {
    title: "Image Resizer",
    description: "Quickly resize your images to the perfect dimensions.",
    href: "/tools/image-resizer",
    icon: Scissors,
    category: "Productive Tools",
  },
  // Instagram
  {
    title: "Instagram Hashtag Generator",
    description: "Generate trending hashtags for your Instagram posts.",
    href: "/tools/instagram-hashtag-generator",
    icon: Hash,
    category: "Instagram",
  },
  {
    title: "Instagram Caption Generator",
    description: "Create engaging captions to boost your post performance.",
    href: "/tools/caption-generator",
    icon: Type,
    category: "Instagram",
  },
  {
    title: "Instagram Bio Generator",
    description: "Craft the perfect bio to attract followers.",
    href: "/tools/instagram-bio-generator",
    icon: Sparkles,
    category: "Instagram",
  },
  // Facebook
  {
    title: "Facebook Hashtag Generator",
    description: "Find the best hashtags for your Facebook content.",
    href: "/tools/facebook-hashtag-generator",
    icon: Hash,
    category: "Facebook",
  },
  {
    title: "Facebook Post Generator",
    description: "Generate compelling posts to engage your audience.",
    href: "/tools/facebook-post-generator",
    icon: Type,
    category: "Facebook",
  },
  // X (Twitter)
  {
    title: "X Hashtag Generator",
    description: "Discover trending hashtags for your posts on X.",
    href: "/tools/x-hashtag-generator",
    icon: Hash,
    category: "X (Twitter)",
  },
  {
    title: "X Content Ideas",
    description: "Get inspiration for your next viral tweet.",
    href: "/tools/x-content-ideas",
    icon: Lightbulb,
    category: "X (Twitter)",
  },
  // YouTube
  {
    title: "YouTube Video Idea Generator",
    description: "Generate creative video ideas for your channel.",
    href: "/tools/youtube-idea-generator",
    icon: Lightbulb,
    category: "YouTube",
  },
  {
    title: "YouTube Title Generator",
    description: "Create catchy titles to increase your video views.",
    href: "/tools/youtube-title-generator",
    icon: Type,
    category: "YouTube",
  },
];

export const toolCategories: ToolCategory[] = [
  "Productive Tools",
  "Instagram",
  "Facebook",
  "X (Twitter)",
  "YouTube",
];

export const categoryIcons: Record<ToolCategory, LucideIcon> = {
  "Productive Tools": Sparkles,
  Instagram: Instagram,
  Facebook: Facebook,
  "X (Twitter)": Twitter,
  YouTube: Youtube,
};
