import { createClient, type QueryParams } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false, // Webhook revalidation時の即時反映のためCDNを無効化
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
    companyAddress,
    "logoUrl": logo.asset->url,
    "logoAlt": logo.alt
  }`,
  hero: `*[_type == "hero"][0]{
    headlineOrange,
    headlineWhite,
    subHeadline,
    backgroundType,
    "backgroundImageUrl": backgroundImage.asset->url,
    "backgroundVideoUrl": backgroundVideo.asset->url,
    youtubeUrl,
    ctaText,
    ctaLink,
    trustBadge1,
    trustBadge2,
    trustBadge3
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
    },
    ctaButtonText,
    ctaButtonType,
    ctaButtonUrl
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
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    order
  }`,
  faqs: `*[_type == "faq"] | order(order asc){
    _id,
    category,
    question,
    answer,
    order
  }`,
  testimonialSection: `*[_type == "testimonialSection"][0]{
    ctaButtonText,
    ctaButtonType,
    ctaButtonUrl
  }`,
  faqSection: `*[_type == "faqSection"][0]{
    ctaButtonText,
    ctaButtonType,
    ctaButtonUrl
  }`,
  microMeshLed: `*[_type == "microMeshLed"][0]{
    catchcopy,
    "mobileImageUrl": mobileImage.asset->url,
    "mobileImageAlt": mobileImage.alt,
    "pcImageUrl": pcImage.asset->url,
    "pcImageAlt": pcImage.alt,
    sellingPointsTitle,
    sellingPoints
  }`,
  productLineup: `*[_type == "productLineup"][0]{
    sectionTitle,
    "products": products[]{
      "thumbnailUrl": thumbnail.asset->url,
      "thumbnailAlt": thumbnail.alt,
      subtitle,
      attributes
    }
  }`,
  beltSlider: `*[_type == "beltSlider"][0]{
    heading,
    "images": images[]{
      "url": asset->url,
      alt
    }
  }`,
  ledSales: `*[_type == "ledSales"][0]{
    subtitle,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    description,
    ctaButtonText,
    ctaButtonUrl
  }`,
  eventProduction: `*[_type == "eventProduction"][0]{
    subtitle,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    description,
    ctaButtonText,
    ctaButtonUrl
  }`,
  serviceFlow: `*[_type == "serviceFlow"][0]{
    sectionTitle,
    sectionSubtitle,
    steps[]{
      title,
      description
    }
  }`,
  ctaSection: `*[_type == "cta"][0]{
    headline,
    subHeadline,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink,
    contactInfo{ phone, phoneNote, email },
    "backgroundImageUrl": backgroundImage.asset->url
  }`,
  footer: `*[_type == "footer"][0]{
    companyDescription,
    linkCategories[]{ title, links[]{ label, href } },
    phone,
    phoneNote,
    address,
    email,
    copyright
  }`,
  pricingSection: `*[_type == "pricingSection"][0]{
    sectionTitle,
    sectionSubtitle
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
  logoUrl?: string;
  logoAlt?: string;
}

export interface HeroData {
  headlineOrange?: string;
  headlineWhite?: string;
  subHeadline?: string;
  backgroundType?: 'image' | 'video' | 'youtube';
  backgroundImageUrl?: string;
  backgroundVideoUrl?: string;
  youtubeUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  trustBadge1?: string;
  trustBadge2?: string;
  trustBadge3?: string;
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
  ctaButtonText?: string;
  ctaButtonType?: 'url' | 'scroll';
  ctaButtonUrl?: string;
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
  imageUrl?: string;
  imageAlt?: string;
  order: number;
}

export interface FAQData {
  _id: string;
  category: string;
  question: string;
  answer: unknown[]; // Portable Text blocks
  order: number;
}

export interface SectionCtaData {
  ctaButtonText?: string;
  ctaButtonType?: 'url' | 'scroll';
  ctaButtonUrl?: string;
}

export interface MicroMeshLedData {
  catchcopy?: string;
  mobileImageUrl?: string;
  mobileImageAlt?: string;
  pcImageUrl?: string;
  pcImageAlt?: string;
  sellingPointsTitle?: string;
  sellingPoints?: string[];
}

export interface ProductLineupProduct {
  thumbnailUrl?: string;
  thumbnailAlt?: string;
  subtitle: string;
  attributes?: string;
}

export interface ProductLineupData {
  sectionTitle?: string;
  products?: ProductLineupProduct[];
}

export interface BeltSliderImage {
  url: string;
  alt?: string;
}

export interface BeltSliderData {
  heading?: string;
  images?: BeltSliderImage[];
}

export interface LEDSalesData {
  subtitle?: string;
  imageUrl?: string;
  imageAlt?: string;
  description?: string;
  ctaButtonText?: string;
  ctaButtonUrl?: string;
}

export interface EventProductionData {
  subtitle?: string;
  imageUrl?: string;
  imageAlt?: string;
  description?: string;
  ctaButtonText?: string;
  ctaButtonUrl?: string;
}

export interface ServiceFlowStep {
  title: string;
  description?: string;
}

export interface ServiceFlowData {
  sectionTitle?: string;
  sectionSubtitle?: string;
  steps?: ServiceFlowStep[];
}

export interface CTASectionData {
  headline?: string;
  subHeadline?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  contactInfo?: {
    phone?: string;
    phoneNote?: string;
    email?: string;
  };
  backgroundImageUrl?: string;
}

export interface PricingSectionData {
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterLinkCategory {
  title: string;
  links?: FooterLinkItem[];
}

export interface FooterData {
  companyDescription?: string;
  linkCategories?: FooterLinkCategory[];
  phone?: string;
  phoneNote?: string;
  address?: string;
  email?: string;
  copyright?: string;
}
