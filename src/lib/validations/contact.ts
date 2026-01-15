import { z } from "zod";

export const contactSchema = z.object({
  companyName: z
    .string()
    .max(100, "会社名は100文字以内で入力してください")
    .optional()
    .or(z.literal("")),
  name: z
    .string()
    .min(1, "お名前を入力してください")
    .max(50, "お名前は50文字以内で入力してください"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスを入力してください"),
  message: z
    .string()
    .max(1000, "ご相談内容は1000文字以内で入力してください")
    .optional()
    .or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactSchema>;
