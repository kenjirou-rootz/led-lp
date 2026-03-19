import siteSettings from './siteSettings'
import hero from './hero'
import microMeshLed from './microMeshLed'
import problem from './problem'
import reason from './reason'
import productLineup from './productLineup'
import testimonial from './testimonial'
import testimonialSection from './testimonialSection'
import beltSlider from './beltSlider'
import pricingPlan from './pricingPlan'
import { pricingSection } from './pricingSection'
import faq from './faq'
import faqSection from './faqSection'
import ledSales from './ledSales'
import eventProduction from './eventProduction'
import serviceFlow from './serviceFlow'
import cta from './cta'
import footer from './footer'

export const schemaTypes = [
  // グローバル設定
  siteSettings,

  // セクション別スキーマ
  hero,              // 1. ヒーローセクション
  microMeshLed,      // 2. マイクロメッシュLED
  problem,           // 3. 課題共感セクション
  reason,            // 4. 解決策提示セクション
  productLineup,     // 5. 商品ラインナップ
  testimonial,       // 6. 顧客の声
  testimonialSection, // 6b. 顧客の声CTRボタン
  beltSlider,        // 7. ベルトスライダー
  pricingPlan,       // 8. 価格透明性セクション
  pricingSection,    // 8b. 料金プランセクション設定
  faq,               // 9. FAQセクション
  faqSection,        // 9b. FAQ-CTRボタン
  ledSales,          // 10. LED販売セールス
  eventProduction,   // 11. イベント演出事業
  serviceFlow,       // 12. サービスフロー
  cta,               // 13. CTAセクション
  footer,            // 14. フッター設定
]
