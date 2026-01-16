import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations/contact";
import { ContactNotificationEmail } from "@/emails/ContactNotification";

export async function POST(request: NextRequest) {
  try {
    // 環境変数チェック
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { success: false, error: "サーバー設定エラー" },
        { status: 500 }
      );
    }

    if (!process.env.CONTACT_EMAIL) {
      console.error("CONTACT_EMAIL is not set");
      return NextResponse.json(
        { success: false, error: "サーバー設定エラー" },
        { status: 500 }
      );
    }

    // Resendクライアントをランタイムで初期化（ビルド時エラー回避）
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        { success: false, error: "入力内容に誤りがあります", details: errors },
        { status: 400 }
      );
    }

    const { inquiryType, companyName, name, email, message } = result.data;

    // お問い合わせ種別のラベル
    const inquiryTypeLabel = inquiryType === "rental" ? "レンタル" : "購入";

    const { data, error } = await resend.emails.send({
      from: "LEDビジョンレンタル <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL],
      subject: `【LEDビジョンレンタル】新規お問い合わせ（${inquiryTypeLabel}）`,
      react: ContactNotificationEmail({
        inquiryType,
        companyName: companyName || "",
        name,
        email,
        message: message || "",
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "メール送信に失敗しました",
          details: process.env.NODE_ENV === "development" ? error : undefined,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "お問い合わせを受け付けました",
      id: data?.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "サーバーエラーが発生しました",
        details:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
      { status: 500 }
    );
  }
}
