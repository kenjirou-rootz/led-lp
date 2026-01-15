"use client";

import { useState } from "react";
import { ArrowRight, Phone, Mail, Clock, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Section } from "@/components/layout";
import { Heading, Button, Card } from "@/components/ui";
import { FadeInView } from "@/components/animation";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
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
    companyName: "",
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      setFormData({ companyName: "", name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "送信に失敗しました"
      );
    }
  };

  const getFieldClassName = (fieldName: keyof FieldErrors) => {
    const baseClass =
      "w-full px-4 py-3 bg-[--bg-elevated] border rounded-lg text-[--text-primary] placeholder-[--text-muted] focus:outline-none transition-colors";
    const hasError = fieldErrors[fieldName]?.length;
    return `${baseClass} ${
      hasError
        ? "border-[--accent-error] focus:border-[--accent-error]"
        : "border-[--border-default] focus:border-[--border-focus]"
    }`;
  };

  return (
    <Section id="cta" variant="gradient" className="relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_60%)]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(139,92,246,0.15)_0%,transparent_60%)]" />

      <div className="relative z-10">
        <FadeInView className="text-center mb-12">
          <Heading as="h2" gradient animateOnScroll={false} className="mb-4">
            {headline}
          </Heading>
          <p className="text-[--text-secondary] max-w-2xl mx-auto text-lg">
            {subheadline}
          </p>
        </FadeInView>

        <FadeInView delay={0.2}>
          <Card variant="glow" hoverEffect={false} className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div>
                <h3 className="text-lg font-semibold text-[--text-primary] mb-6">
                  お問い合わせフォーム
                </h3>

                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-[rgba(34,197,94,0.1)] flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-[--accent-success]" />
                    </div>
                    <h4 className="text-xl font-semibold text-[--text-primary] mb-2">
                      お問い合わせありがとうございます
                    </h4>
                    <p className="text-[--text-secondary] mb-6">
                      通常1営業日以内にご返信いたします。
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-[--accent-primary] hover:underline"
                    >
                      新しいお問い合わせ
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="companyName"
                        className="block text-sm text-[--text-secondary] mb-2"
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
                        <p className="mt-1 text-sm text-[--accent-error]">
                          {fieldErrors.companyName[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm text-[--text-secondary] mb-2"
                      >
                        お名前 <span className="text-[--accent-error]">*</span>
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
                        <p className="mt-1 text-sm text-[--accent-error]">
                          {fieldErrors.name[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm text-[--text-secondary] mb-2"
                      >
                        メールアドレス{" "}
                        <span className="text-[--accent-error]">*</span>
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
                        <p className="mt-1 text-sm text-[--accent-error]">
                          {fieldErrors.email[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm text-[--text-secondary] mb-2"
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
                        <p className="mt-1 text-sm text-[--accent-error]">
                          {fieldErrors.message[0]}
                        </p>
                      )}
                    </div>

                    {status === "error" && errorMessage && (
                      <div className="flex items-center gap-2 p-3 bg-[rgba(239,68,68,0.1)] border border-[--accent-error] rounded-lg">
                        <AlertCircle className="w-5 h-5 text-[--accent-error] flex-shrink-0" />
                        <p className="text-sm text-[--accent-error]">
                          {errorMessage}
                        </p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={status === "submitting"}
                      rightIcon={
                        status === "submitting" ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <ArrowRight className="w-4 h-4" />
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
                <h3 className="text-lg font-semibold text-[--text-primary] mb-6">
                  お電話・メールでも
                </h3>

                <div className="space-y-6 flex-1">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[rgba(59,130,246,0.1)] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[--accent-primary]" />
                    </div>
                    <div>
                      <p className="text-xs text-[--text-muted] uppercase tracking-wide mb-1">
                        お電話
                      </p>
                      <a
                        href={`tel:${displayPhone.replace(/-/g, "")}`}
                        className="text-xl font-bold text-[--text-primary] hover:text-[--accent-primary] transition-colors"
                      >
                        {displayPhone}
                      </a>
                      <p className="text-sm text-[--text-muted] flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {phoneNote}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[rgba(139,92,246,0.1)] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[--accent-secondary]" />
                    </div>
                    <div>
                      <p className="text-xs text-[--text-muted] uppercase tracking-wide mb-1">
                        メール
                      </p>
                      <a
                        href={`mailto:${displayEmail}`}
                        className="text-lg font-semibold text-[--text-primary] hover:text-[--accent-secondary] transition-colors"
                      >
                        {displayEmail}
                      </a>
                      <p className="text-sm text-[--text-muted] mt-1">
                        24時間受付
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Response Promise */}
                <div className="mt-auto pt-6 border-t border-[--border-default]">
                  <div className="bg-[--bg-elevated] rounded-lg p-4">
                    <p className="text-sm text-[--text-secondary]">
                      <span className="text-[--accent-success] font-semibold">
                        通常1営業日以内
                      </span>
                      にご返信いたします。
                      お急ぎの場合はお電話ください。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </FadeInView>
      </div>
    </Section>
  );
}
