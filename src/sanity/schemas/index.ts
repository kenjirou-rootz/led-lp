import siteSettings from './siteSettings'
import hero from './hero'
import problem from './problem'
import reason from './reason'
import caseStudy from './caseStudy'
import testimonial from './testimonial'
import clientLogo from './clientLogo'
import useCase from './useCase'
import pricingPlan from './pricingPlan'
import faq from './faq'
import cta from './cta'

export const schemaTypes = [
  // グローバル設定
  siteSettings,

  // セクション別スキーマ
  hero,           // 1. ヒーローセクション
  problem,        // 2. 課題共感セクション
  reason,         // 3. 解決策提示セクション
  caseStudy,      // 4. 社会的証明 - 導入事例
  testimonial,    // 4. 社会的証明 - 顧客の声
  clientLogo,     // 4. 社会的証明 - 取引先ロゴ
  useCase,        // 5. 用途別提案セクション
  pricingPlan,    // 6. 価格透明性セクション
  faq,            // 7. FAQセクション
  cta,            // 8. CTAセクション
]
