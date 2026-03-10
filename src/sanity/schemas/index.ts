import siteSettings from './siteSettings'
import hero from './hero'
import microMeshLed from './microMeshLed'
import problem from './problem'
import reason from './reason'
import productLineup from './productLineup'
import caseStudy from './caseStudy'
import testimonial from './testimonial'
import beltSlider from './beltSlider'
import pricingPlan from './pricingPlan'
import faq from './faq'
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
  caseStudy,         // 6. 導入事例
  testimonial,       // 7. 顧客の声
  beltSlider,        // 8. ベルトスライダー
  pricingPlan,       // 9. 価格透明性セクション
  faq,               // 10. FAQセクション
  ledSales,          // 11. LED販売セールス
  eventProduction,   // 12. イベント演出事業
  serviceFlow,       // 13. サービスフロー
  cta,               // 14. CTAセクション
  footer,            // 15. フッター設定
]
