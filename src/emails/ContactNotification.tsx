import * as React from "react";

interface ContactNotificationEmailProps {
  companyName: string;
  name: string;
  email: string;
  message: string;
}

export function ContactNotificationEmail({
  companyName,
  name,
  email,
  message,
}: ContactNotificationEmailProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9fafb",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          padding: "32px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            color: "#1f2937",
            fontSize: "24px",
            marginBottom: "24px",
            borderBottom: "2px solid #3b82f6",
            paddingBottom: "12px",
          }}
        >
          新規お問い合わせ
        </h1>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #e5e7eb",
                  color: "#6b7280",
                  width: "120px",
                  verticalAlign: "top",
                }}
              >
                会社名
              </td>
              <td
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #e5e7eb",
                  color: "#1f2937",
                }}
              >
                {companyName || "（未入力）"}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #e5e7eb",
                  color: "#6b7280",
                  verticalAlign: "top",
                }}
              >
                お名前
              </td>
              <td
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #e5e7eb",
                  color: "#1f2937",
                  fontWeight: "600",
                }}
              >
                {name}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #e5e7eb",
                  color: "#6b7280",
                  verticalAlign: "top",
                }}
              >
                メールアドレス
              </td>
              <td
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <a
                  href={`mailto:${email}`}
                  style={{
                    color: "#3b82f6",
                    textDecoration: "none",
                  }}
                >
                  {email}
                </a>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "12px 0",
                  color: "#6b7280",
                  verticalAlign: "top",
                }}
              >
                ご相談内容
              </td>
              <td
                style={{
                  padding: "12px 0",
                  color: "#1f2937",
                  whiteSpace: "pre-wrap",
                }}
              >
                {message || "（未入力）"}
              </td>
            </tr>
          </tbody>
        </table>

        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            backgroundColor: "#f3f4f6",
            borderRadius: "6px",
            fontSize: "14px",
            color: "#6b7280",
          }}
        >
          <p style={{ margin: "0 0 8px 0" }}>
            このメールはLEDビジョンレンタルのお問い合わせフォームから送信されました。
          </p>
          <p style={{ margin: 0 }}>
            送信日時: {new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}
          </p>
        </div>
      </div>
    </div>
  );
}
