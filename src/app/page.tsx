import { Header, Footer } from "@/components/layout";
import {
  Hero,
  Problem,
  Reason,
  CaseStudy,
  Testimonials,
  ClientLogos,
  UseCases,
  Pricing,
  FAQ,
  CTA,
} from "@/components/sections";
import {
  sanityFetch,
  queries,
  type SiteSettings,
  type HeroData,
  type ProblemSectionData,
  type ReasonSectionData,
  type CaseStudyData,
  type TestimonialData,
  type PricingPlanData,
  type FAQData,
  type ClientLogoData,
  type UseCaseData,
  type CTASectionData,
  type FooterData,
} from "@/lib/sanity";

export default async function Home() {
  // Sanityからデータを取得（並列）
  const [
    siteSettings,
    heroData,
    problemsData,
    reasonsData,
    caseStudiesData,
    testimonialsData,
    pricingPlansData,
    faqsData,
    clientLogosData,
    useCasesData,
    ctaData,
    footerData,
  ] = await Promise.all([
    sanityFetch<SiteSettings>({
      query: queries.siteSettings,
      tags: ["siteSettings"],
    }),
    sanityFetch<HeroData>({
      query: queries.hero,
      tags: ["hero"],
    }),
    sanityFetch<ProblemSectionData>({
      query: queries.problemSection,
      tags: ["problem"],
    }),
    sanityFetch<ReasonSectionData>({
      query: queries.reasonSection,
      tags: ["reason"],
    }),
    sanityFetch<CaseStudyData[]>({
      query: queries.caseStudies,
      tags: ["caseStudy"],
    }),
    sanityFetch<TestimonialData[]>({
      query: queries.testimonials,
      tags: ["testimonial"],
    }),
    sanityFetch<PricingPlanData[]>({
      query: queries.pricingPlans,
      tags: ["pricingPlan"],
    }),
    sanityFetch<FAQData[]>({
      query: queries.faqs,
      tags: ["faq"],
    }),
    sanityFetch<ClientLogoData[]>({
      query: queries.clientLogos,
      tags: ["clientLogo"],
    }),
    sanityFetch<UseCaseData[]>({
      query: queries.useCases,
      tags: ["useCase"],
    }),
    sanityFetch<CTASectionData>({
      query: queries.ctaSection,
      tags: ["cta"],
    }),
    sanityFetch<FooterData>({
      query: queries.footer,
      tags: ["footer"],
    }),
  ]);

  return (
    <>
      <Header siteSettings={siteSettings} />
      <main>
        <Hero
          headline={heroData?.headline}
          subheadline={heroData?.subHeadline}
          backgroundType={heroData?.backgroundType}
          backgroundImageUrl={heroData?.backgroundImageUrl}
          backgroundVideoUrl={heroData?.backgroundVideoUrl}
          youtubeUrl={heroData?.youtubeUrl}
          ctaText={heroData?.ctaText}
          ctaLink={heroData?.ctaLink}
        />
        <Problem problemSectionData={problemsData} />
        <Reason reasonSectionData={reasonsData} />
        <CaseStudy caseStudiesData={caseStudiesData} />
        <Testimonials testimonialsData={testimonialsData} />
        <ClientLogos clientLogosData={clientLogosData} />
        <UseCases useCasesData={useCasesData} />
        <Pricing pricingPlansData={pricingPlansData} />
        <FAQ faqsData={faqsData} />
        <CTA siteSettings={siteSettings} ctaData={ctaData} />
      </main>
      <Footer siteSettings={siteSettings} footerData={footerData} />
    </>
  );
}
