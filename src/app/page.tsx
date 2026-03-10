import { Header, Footer } from "@/components/layout";
import {
  Hero,
  MicroMeshLED,
  Problem,
  Reason,
  ProductLineup,
  Testimonials,
  BeltSlider,
  Pricing,
  FAQ,
  LEDSales,
  EventProduction,
  ServiceFlow,
  CTA,
} from "@/components/sections";
import {
  sanityFetch,
  queries,
  type SiteSettings,
  type HeroData,
  type MicroMeshLedData,
  type ProblemSectionData,
  type ReasonSectionData,
  type ProductLineupData,
  type TestimonialData,
  type BeltSliderData,
  type PricingPlanData,
  type FAQData,
  type SectionCtaData,
  type LEDSalesData,
  type EventProductionData,
  type ServiceFlowData,
  type CTASectionData,
  type FooterData,
} from "@/lib/sanity";

export default async function Home() {
  // Sanityからデータを取得（並列）
  const [
    siteSettings,
    heroData,
    microMeshLedData,
    problemsData,
    reasonsData,
    productLineupData,
    testimonialsData,
    testimonialSectionData,
    beltSliderData,
    pricingPlansData,
    faqsData,
    faqSectionData,
    ledSalesData,
    eventProductionData,
    serviceFlowData,
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
    sanityFetch<MicroMeshLedData>({
      query: queries.microMeshLed,
      tags: ["microMeshLed"],
    }),
    sanityFetch<ProblemSectionData>({
      query: queries.problemSection,
      tags: ["problem"],
    }),
    sanityFetch<ReasonSectionData>({
      query: queries.reasonSection,
      tags: ["reason"],
    }),
    sanityFetch<ProductLineupData>({
      query: queries.productLineup,
      tags: ["productLineup"],
    }),
    sanityFetch<TestimonialData[]>({
      query: queries.testimonials,
      tags: ["testimonial"],
    }),
    sanityFetch<SectionCtaData>({
      query: queries.testimonialSection,
      tags: ["testimonialSection"],
    }),
    sanityFetch<BeltSliderData>({
      query: queries.beltSlider,
      tags: ["beltSlider"],
    }),
    sanityFetch<PricingPlanData[]>({
      query: queries.pricingPlans,
      tags: ["pricingPlan"],
    }),
    sanityFetch<FAQData[]>({
      query: queries.faqs,
      tags: ["faq"],
    }),
    sanityFetch<SectionCtaData>({
      query: queries.faqSection,
      tags: ["faqSection"],
    }),
    sanityFetch<LEDSalesData>({
      query: queries.ledSales,
      tags: ["ledSales"],
    }),
    sanityFetch<EventProductionData>({
      query: queries.eventProduction,
      tags: ["eventProduction"],
    }),
    sanityFetch<ServiceFlowData>({
      query: queries.serviceFlow,
      tags: ["serviceFlow"],
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
        {/* 1. ヒーロー */}
        <Hero
          headlineOrange={heroData?.headlineOrange}
          headlineWhite={heroData?.headlineWhite}
          subheadline={heroData?.subHeadline}
          backgroundType={heroData?.backgroundType}
          backgroundImageUrl={heroData?.backgroundImageUrl}
          backgroundVideoUrl={heroData?.backgroundVideoUrl}
          youtubeUrl={heroData?.youtubeUrl}
          ctaText={heroData?.ctaText}
          ctaLink={heroData?.ctaLink}
          trustBadge1={heroData?.trustBadge1}
          trustBadge2={heroData?.trustBadge2}
          trustBadge3={heroData?.trustBadge3}
        />
        {/* 2. マイクロメッシュLED */}
        <MicroMeshLED data={microMeshLedData} />
        {/* 3. 課題 */}
        <Problem problemSectionData={problemsData} />
        {/* 4. 選ばれる理由 */}
        <Reason reasonSectionData={reasonsData} />
        {/* 5. 商品ラインナップ */}
        <ProductLineup data={productLineupData} />
        {/* 6. お客様の声 */}
        <Testimonials testimonialsData={testimonialsData} sectionCta={testimonialSectionData} />
        {/* 7. ベルトスライダー #1 */}
        <BeltSlider id="belt-slider-1" data={beltSliderData} />
        {/* 8. 料金プラン */}
        <Pricing pricingPlansData={pricingPlansData} />
        {/* 9. FAQ */}
        <FAQ faqsData={faqsData} sectionCta={faqSectionData} />
        {/* 10. ベルトスライダー #2 */}
        <BeltSlider id="belt-slider-2" data={beltSliderData} />
        {/* 11. LED販売 */}
        <LEDSales data={ledSalesData} />
        {/* 12. イベント演出 */}
        <EventProduction data={eventProductionData} />
        {/* 13. サービスフロー */}
        <ServiceFlow data={serviceFlowData} />
        {/* 14. お問い合わせ */}
        <CTA siteSettings={siteSettings} ctaData={ctaData} />
      </main>
      <Footer siteSettings={siteSettings} footerData={footerData} />
    </>
  );
}
