import { createClient, type QueryParams } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false, // 開発時はfalse、本番ではrevalidateで制御
});

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}): Promise<T> {
  // 開発環境ではキャッシュを無効化
  const isDev = process.env.NODE_ENV === "development";

  return client.fetch<T>(query, params, {
    cache: isDev ? "no-store" : "force-cache",
    next: isDev ? undefined : {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  });
}

// GROQクエリ定義
export const queries = {
  siteSettings: `*[_type == "siteSettings"][0]{
    siteName,
    siteDescription,
    contactEmail,
    contactPhone,
    companyName,
    companyAddress
  }`,
  hero: `*[_type == "hero"][0]{
    headline,
    subHeadline,
    backgroundType,
    "backgroundImageUrl": backgroundImage.asset->url,
    "backgroundVideoUrl": backgroundVideo.asset->url,
    youtubeUrl,
    ctaText,
    ctaLink,
    trustBadges[]{
      text,
      "iconUrl": icon.asset->url
    }
  }`,
  problemSection: `*[_type == "problem"][0]{
    sectionTitle,
    sectionSubtitle,
    transitionText,
    "items": items[]{
      title,
      description,
      "backgroundImageUrl": backgroundImage.asset->url,
      "backgroundImageAlt": backgroundImage.alt
    }
  }`,
  reasonSection: `*[_type == "reason"][0]{
    sectionTitle,
    sectionSubtitle,
    "items": items[]{
      number,
      title,
      description,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      highlights
    }
  }`,
  caseStudies: `*[_type == "caseStudy"] | order(order asc){
    _id,
    clientName,
    industry,
    eventType,
    summary,
    result,
    "images": images[]{
      "url": asset->url,
      alt,
      caption
    },
    order
  }`,
  testimonials: `*[_type == "testimonial"] | order(order asc){
    _id,
    quote,
    authorName,
    authorRole,
    companyName,
    "avatarUrl": avatar.asset->url,
    rating,
    order
  }`,
  pricingPlans: `*[_type == "pricingPlan"] | order(order asc){
    _id,
    planName,
    price,
    priceNote,
    recommendedFor,
    features,
    isPopular,
    order
  }`,
  faqs: `*[_type == "faq"] | order(order asc){
    _id,
    category,
    question,
    answer,
    order
  }`,
  clientLogos: `*[_type == "clientLogo"] | order(order asc){
    _id,
    companyName,
    "logoUrl": logo.asset->url,
    "logoAlt": logo.alt,
    websiteUrl,
    order
  }`,
  useCases: `*[_type == "useCase"] | order(order asc){
    _id,
    category,
    tabLabel,
    description,
    recommendedEquipment[]{
      name,
      spec,
      note
    },
    "images": images[]{
      "url": asset->url,
      alt,
      caption
    },
    order
  }`,
};

// 型定義
export interface SiteSettings {
  siteName?: string;
  siteDescription?: string;
  contactEmail?: string;
  contactPhone?: string;
  companyName?: string;
  companyAddress?: string;
}

export interface HeroData {
  headline?: string;
  subHeadline?: string;
  backgroundType?: 'image' | 'video' | 'youtube';
  backgroundImageUrl?: string;
  backgroundVideoUrl?: string;
  youtubeUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  trustBadges?: Array<{
    text?: string;
    iconUrl?: string;
  }>;
}

export interface ProblemItemData {
  title: string;
  description: string;
  backgroundImageUrl?: string;
  backgroundImageAlt?: string;
}

export interface ProblemSectionData {
  sectionTitle?: string;
  sectionSubtitle?: string;
  transitionText?: string;
  items?: ProblemItemData[];
}

export interface ReasonItemData {
  number: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  highlights?: string[];
}

export interface ReasonSectionData {
  sectionTitle?: string;
  sectionSubtitle?: string;
  items?: ReasonItemData[];
}

export interface CaseStudyData {
  _id: string;
  clientName: string;
  industry?: string;
  eventType?: string;
  summary?: string;
  result?: unknown[]; // Portable Text blocks
  images?: Array<{
    url: string;
    alt?: string;
    caption?: string;
  }>;
  order: number;
}

export interface TestimonialData {
  _id: string;
  quote: string;
  authorName?: string;
  authorRole?: string;
  companyName?: string;
  avatarUrl?: string;
  rating?: number;
  order: number;
}

export interface PricingPlanData {
  _id: string;
  planName: string;
  price: string;
  priceNote?: string;
  recommendedFor?: string;
  features?: string[];
  isPopular?: boolean;
  order: number;
}

export interface FAQData {
  _id: string;
  category: string;
  question: string;
  answer: unknown[]; // Portable Text blocks
  order: number;
}

export interface ClientLogoData {
  _id: string;
  companyName: string;
  logoUrl?: string;
  logoAlt?: string;
  websiteUrl?: string;
  order: number;
}

export interface UseCaseData {
  _id: string;
  category: string;
  tabLabel: string;
  description?: unknown[]; // Portable Text blocks
  recommendedEquipment?: Array<{
    name?: string;
    spec?: string;
    note?: string;
  }>;
  images?: Array<{
    url: string;
    alt?: string;
    caption?: string;
  }>;
  order: number;
}
