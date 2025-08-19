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
  QrCode,
  KeyRound,
} from "lucide-react";
import * as React from 'react';

// Custom TikTok Icon
const TikTokIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => 
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props
  }, React.createElement('path', { d: "M16.17 6.17a4.004 4.004 0 0 0-3.34-3.34V16a4 4 0 1 1-4-4h2.5" }));


export type ToolCategory =
  | "Productive Tools"
  | "Instagram"
  | "Facebook"
  | "YouTube"
  | "TikTok";

export interface Tool {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
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
  {
    title: "QR Code Generator",
    description: "Generate a QR code from a URL or text.",
    href: "/tools/qr-code-generator",
    icon: QrCode,
    category: "Productive Tools",
  },
  {
    title: "Password Generator",
    description: "Create strong, secure, and random passwords.",
    href: "/tools/password-generator",
    icon: KeyRound,
    category: "Productive Tools",
  },
  // Instagram
  {
    title: "Instagram Caption Generator",
    description: "Create engaging captions to boost your post performance.",
    href: "/tools/instagram-caption-generator",
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
  {
    title: "Instagram Hashtag Generator",
    description: "Generate viral hashtags to boost your reach.",
    href: "/tools/instagram-hashtag-generator",
    icon: Hash,
    category: "Instagram",
  },
  // Facebook
  {
    title: "Facebook Caption Generator",
    description: "Create engaging captions for your Facebook posts.",
    href: "/tools/facebook-caption-generator",
    icon: Type,
    category: "Facebook",
  },
  {
    title: "Facebook Hashtag Generator",
    description: "Generate viral hashtags to boost your reach.",
    href: "/tools/facebook-hashtag-generator",
    icon: Hash,
    category: "Facebook",
  },
  // YouTube
  {
    title: "YouTube Content Idea Generator",
    description: "Get viral video ideas for your YouTube channel.",
    href: "/tools/youtube-content-idea-generator",
    icon: Lightbulb,
    category: "YouTube",
  },
  {
    title: "YouTube Viral Hooks Generator",
    description: "Generate catchy hooks to make your videos go viral.",
    href: "/tools/youtube-viral-hooks-generator",
    icon: Sparkles,
    category: "YouTube",
  },
  {
    title: "YouTube Description Generator",
    description: "Generate SEO-friendly descriptions for your videos.",
    href: "/tools/youtube-description-generator",
    icon: FileText,
    category: "YouTube",
  },
  {
    title: "YouTube Title Generator",
    description: "Generate SEO-optimized and catchy titles for your videos.",
    href: "/tools/youtube-title-generator",
    icon: Type,
    category: "YouTube",
  },
  // TikTok
  {
    title: "TikTok Content Idea Generator",
    description: "Get viral video ideas for your TikTok channel.",
    href: "/tools/tiktok-content-idea-generator",
    icon: Lightbulb,
    category: "TikTok",
  },
  {
    title: "TikTok Viral Hooks Generator",
    description: "Generate catchy hooks to make your TikToks go viral.",
    href: "/tools/tiktok-viral-hooks-generator",
    icon: Sparkles,
    category: "TikTok",
  },
  {
    title: "TikTok Description Generator",
    description: "Generate engaging descriptions for your TikTok videos.",
    href: "/tools/tiktok-description-generator",
    icon: FileText,
    category: "TikTok",
  },
  {
    title: "TikTok Title Generator",
    description: "Generate SEO-optimized and catchy titles for your videos.",
    href: "/tools/tiktok-title-generator",
    icon: Type,
    category: "TikTok",
  },
];

export const toolCategories: ToolCategory[] = [
  "Productive Tools",
  "Instagram",
  "Facebook",
  "YouTube",
  "TikTok",
];

export const categoryIcons: Record<ToolCategory, LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>> = {
  "Productive Tools": Sparkles,
  Instagram: Instagram,
  Facebook: Facebook,
  YouTube: Youtube,
  TikTok: TikTokIcon,
};
