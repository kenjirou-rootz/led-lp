"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Phone,
  Mail,
  Clock,
  Loader2,
  CheckCircle,
  AlertCircle,
  Send,
  Zap,
  Package,
  ShoppingBag,
} from "lucide-react";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui";
import {
  sectionHeader,
  sectionOverline,
  sectionTitle,
  sectionSubtitle,
} from "@/lib/animations";
import {
  contactSchema,
  type ContactFormData,
} from "@/lib/validations/contact";
import type { SiteSettings } from "@/lib/sanity";

interface CTAProps {
  headline?: string;
  subheadline?: string;
  phone?: string;
  phoneNote?: string;
  email?: string;
  siteSettings?: SiteSettings;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FieldErrors {
  inquiryType?: string[];
  companyName?: string[];
  name?: string[];
  email?: string[];
  message?: string[];
}

export function CTA({
  headline = "まずはお気軽にご相談ください",
  subheadline = "専門スタッフが最適なプランをご提案します。お見積りは無料です。",
  phone,
  phoneNote = "平日 9:00-18:00",
  email,
  siteSettings,
}: CTAProps) {
  // siteSettingsからのデータまたはprops、最後にデフォルト値
  const displayPhone = phone || siteSettings?.contactPhone || "0120-XXX-XXX";
  const displayEmail = email || siteSettings?.contactEmail || "info@example.com";
  const [formData, setFormData] = useState<ContactFormData>({
    inquiryType: "rental",
    companyName: "",
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    setFieldErrors({});

    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      setFieldErrors(errors);
      setStatus("error");
      setErrorMessage("入力内容をご確認ください");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "送信に失敗しました");
      }

      setStatus("success");
      setFormData({ inquiryType: "rental", companyName: "", name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "送信に失敗しました"
      );
    }
  };

  const getFieldClassName = (fieldName: keyof FieldErrors) => {
    const baseClass =
      "w-full px-4 py-3.5 bg-[var(--bg-elevated)] border rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-all duration-300 font-sans";
    const hasError = fieldErrors[fieldName]?.length;
    return `${baseClass} ${
      hasError
        ? "border-[var(--accent-error)] focus:border-[var(--accent-error)] focus:shadow-[0_0_20px_rgba(239,68,68,0.15)]"
        : "border-[var(--border-default)] focus:border-[var(--accent-primary)] focus:shadow-[0_0_20px_rgba(0,240,255,0.15)]"
    }`;
  };

  return (
    <Section id="cta" variant="spotlight" className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-pixel-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[60%] bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,107,0,0.08)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[60%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,240,255,0.06)_0%,transparent_50%)] pointer-events-none" />

      {/* Decorative LED Lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-cta)]/40 to-transparent" />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-14"
        >
          {/* Overline */}
          <motion.div variants={sectionOverline} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-cta-muted)] border border-[rgba(255,107,0,0.3)]">
              <Send className="w-3.5 h-3.5 text-[var(--accent-cta)]" />
              <span className="font-display text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--accent-cta)]">
                Contact Us
              </span>
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2 variants={sectionTitle} className="section-title">
            <span className="text-gradient-orange">{headline.slice(0, 4)}</span>
            <span>{headline.slice(4)}</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={sectionSubtitle}
            className="mt-4 section-subtitle max-w-2xl mx-auto"
          >
            {subheadline}
          </motion.p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl bg-[var(--bg-card)] border border-[var(--accent-cta)]/30 overflow-hidden shadow-[0_0_60px_rgba(255,107,0,0.1)]">
            {/* Card Top Glow Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-cta)] to-transparent" />

            {/* Card Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,107,0,0.03)] to-transparent pointer-events-none" />

            <div className="p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-10">
                {/* Contact Form */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-cta)]/10 border border-[var(--accent-cta)]/30 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-[var(--accent-cta)]" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)] tracking-wide">
                      お問い合わせフォーム
                    </h3>
                  </div>

                  {status === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="relative mb-6">
                        <div className="w-20 h-20 rounded-full bg-[var(--accent-success)]/10 border border-[var(--accent-success)]/30 flex items-center justify-center">
                          <CheckCircle className="w-10 h-10 text-[var(--accent-success)]" />
                        </div>
                        {/* Success glow effect */}
                        <div className="absolute inset-0 rounded-full bg-[var(--accent-success)]/20 blur-xl" />
                      </div>
                      <h4 className="font-display text-xl font-bold text-[var(--text-primary)] mb-2 tracking-wide">
                        お問い合わせありがとうございます
                      </h4>
                      <p className="text-[var(--text-secondary)] mb-6">
                        通常1営業日以内にご返信いたします。
                      </p>
                      <button
                        onClick={() => setStatus("idle")}
                        className="text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] font-medium transition-colors"
                      >
                        新しいお問い合わせ
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Inquiry Type Toggle */}
                      <div>
                        <label
                          className="block text-sm font-medium text-[var(--text-secondary)] mb-3"
                        >
                          お問い合わせ種別{" "}
                          <span className="text-[var(--accent-cta)]">*</span>
                        </label>
                        <div
                          className="relative p-1 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-default)]"
                          role="radiogroup"
                          aria-label="お問い合わせ種別"
                        >
                          {/* Sliding Indicator */}
                          <motion.div
                            className="absolute top-1 bottom-1 rounded-lg bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-primary)]/80"
                            initial={false}
                            animate={{
                              left: formData.inquiryType === "rental" ? "4px" : "calc(50% + 2px)",
                              width: "calc(50% - 6px)",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            }}
                            style={{
                              boxShadow: "0 0 20px rgba(0, 240, 255, 0.4), 0 0 40px rgba(0, 240, 255, 0.2)",
                            }}
                          />

                          <div className="relative grid grid-cols-2 gap-1">
                            {/* Rental Option */}
                            <button
                              type="button"
                              role="radio"
                              aria-checked={formData.inquiryType === "rental"}
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, inquiryType: "rental" }));
                                if (fieldErrors.inquiryType) {
                                  setFieldErrors((prev) => ({ ...prev, inquiryType: undefined }));
                                }
                              }}
                              disabled={status === "submitting"}
                              className={`relative z-10 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-display text-sm font-semibold tracking-wide transition-colors duration-200 ${
                                formData.inquiryType === "rental"
                                  ? "text-[var(--bg-primary)]"
                                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                              } ${status === "submitting" ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                            >
                              <Package className={`w-4 h-4 transition-transform duration-300 ${
                                formData.inquiryType === "rental" ? "scale-110" : ""
                              }`} />
                              <span>レンタル</span>
                            </button>

                            {/* Purchase Option */}
                            <button
                              type="button"
                              role="radio"
                              aria-checked={formData.inquiryType === "purchase"}
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, inquiryType: "purchase" }));
                                if (fieldErrors.inquiryType) {
                                  setFieldErrors((prev) => ({ ...prev, inquiryType: undefined }));
                                }
                              }}
                              disabled={status === "submitting"}
                              className={`relative z-10 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-display text-sm font-semibold tracking-wide transition-colors duration-200 ${
                                formData.inquiryType === "purchase"
                                  ? "text-[var(--bg-primary)]"
                                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                              } ${status === "submitting" ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                            >
                              <ShoppingBag className={`w-4 h-4 transition-transform duration-300 ${
                                formData.inquiryType === "purchase" ? "scale-110" : ""
                              }`} />
                              <span>購入</span>
                            </button>
                          </div>
                        </div>
                        {fieldErrors.inquiryType && (
                          <p className="mt-2 text-sm text-[var(--accent-error)]">
                            {fieldErrors.inquiryType[0]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="companyName"
                          className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                        >
                          会社名
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          className={getFieldClassName("companyName")}
                          placeholder="株式会社○○"
                          disabled={status === "submitting"}
                        />
                        {fieldErrors.companyName && (
                          <p className="mt-1.5 text-sm text-[var(--accent-error)]">
                            {fieldErrors.companyName[0]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                        >
                          お名前{" "}
                          <span className="text-[var(--accent-cta)]">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={getFieldClassName("name")}
                          placeholder="山田 太郎"
                          disabled={status === "submitting"}
                        />
                        {fieldErrors.name && (
                          <p className="mt-1.5 text-sm text-[var(--accent-error)]">
                            {fieldErrors.name[0]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                        >
                          メールアドレス{" "}
                          <span className="text-[var(--accent-cta)]">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={getFieldClassName("email")}
                          placeholder="email@example.com"
                          disabled={status === "submitting"}
                        />
                        {fieldErrors.email && (
                          <p className="mt-1.5 text-sm text-[var(--accent-error)]">
                            {fieldErrors.email[0]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                        >
                          ご相談内容
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className={`${getFieldClassName("message")} resize-none`}
                          placeholder="ご利用予定日、規模、ご予算など"
                          disabled={status === "submitting"}
                        />
                        {fieldErrors.message && (
                          <p className="mt-1.5 text-sm text-[var(--accent-error)]">
                            {fieldErrors.message[0]}
                          </p>
                        )}
                      </div>

                      {status === "error" && errorMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 p-4 bg-[var(--accent-error)]/10 border border-[var(--accent-error)]/30 rounded-xl"
                        >
                          <AlertCircle className="w-5 h-5 text-[var(--accent-error)] flex-shrink-0" />
                          <p className="text-sm text-[var(--accent-error)]">
                            {errorMessage}
                          </p>
                        </motion.div>
                      )}

                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full bg-[var(--accent-cta)] hover:bg-[var(--accent-cta-hover)] shadow-[var(--glow-orange)] group"
                        disabled={status === "submitting"}
                        rightIcon={
                          status === "submitting" ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          )
                        }
                      >
                        {status === "submitting" ? "送信中..." : "無料で相談する"}
                      </Button>
                    </form>
                  )}
                </div>

                {/* Contact Info */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[var(--accent-primary)]" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)] tracking-wide">
                      お電話・メールでも
                    </h3>
                  </div>

                  <div className="space-y-6 flex-1">
                    {/* Phone */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="group flex items-start gap-4 p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-default)] transition-all duration-300 hover:border-[var(--accent-primary)]/40 hover:shadow-[var(--glow-card-hover)]"
                    >
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-primary)]/60 flex items-center justify-center flex-shrink-0 shadow-[var(--glow-cyan-subtle)]">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-display text-[10px] text-[var(--text-muted)] uppercase tracking-[0.15em] mb-1">
                          Telephone
                        </p>
                        <a
                          href={`tel:${displayPhone.replace(/-/g, "")}`}
                          className="font-display text-2xl font-bold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors tracking-wide"
                        >
                          {displayPhone}
                        </a>
                        <p className="text-sm text-[var(--text-muted)] flex items-center gap-1.5 mt-2">
                          <Clock className="w-3.5 h-3.5" />
                          {phoneNote}
                        </p>
                      </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="group flex items-start gap-4 p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-default)] transition-all duration-300 hover:border-[var(--accent-cta)]/40 hover:shadow-[0_0_30px_rgba(255,107,0,0.1)]"
                    >
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--accent-cta)] to-[var(--accent-cta)]/60 flex items-center justify-center flex-shrink-0 shadow-[var(--glow-orange)]">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-display text-[10px] text-[var(--text-muted)] uppercase tracking-[0.15em] mb-1">
                          Email
                        </p>
                        <a
                          href={`mailto:${displayEmail}`}
                          className="font-display text-lg font-bold text-[var(--text-primary)] hover:text-[var(--accent-cta)] transition-colors tracking-wide break-all"
                        >
                          {displayEmail}
                        </a>
                        <p className="text-sm text-[var(--text-muted)] mt-2">
                          24時間受付
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Quick Response Promise */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 pt-6 border-t border-[var(--border-default)]"
                  >
                    <div className="relative rounded-xl bg-gradient-to-r from-[var(--accent-success)]/5 to-transparent border border-[var(--accent-success)]/20 p-5 overflow-hidden">
                      {/* Decorative corner */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[var(--accent-success)]/10 to-transparent" />
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent-success)]/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-[var(--accent-success)]" />
                        </div>
                        <p className="text-sm text-[var(--text-secondary)]">
                          <span className="text-[var(--accent-success)] font-display font-bold">
                            通常1営業日以内
                          </span>
                          にご返信いたします。
                          <br />
                          お急ぎの場合はお電話ください。
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
