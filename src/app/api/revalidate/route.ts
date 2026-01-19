import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity Webhook Payload Type
 * @see https://www.sanity.io/docs/webhooks
 */
type WebhookPayload = {
  _type: string;
  _id?: string;
};

/**
 * Sanity Webhook Handler for On-Demand Revalidation
 *
 * Sanity Studio でコンテンツが公開されると、このエンドポイントが呼び出され、
 * 関連するキャッシュタグを無効化します。
 *
 * @example
 * POST /api/revalidate
 * Headers: { "sanity-webhook-signature": "..." }
 * Body: { "_type": "hero", "_id": "..." }
 */
export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;

    if (!secret) {
      console.error("[Revalidate] Missing SANITY_REVALIDATE_SECRET");
      return new Response("Missing environment variable SANITY_REVALIDATE_SECRET", {
        status: 500,
      });
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      secret,
      true // 3秒待機: Sanity Content Lake の eventual consistency 対応
    );

    if (!isValidSignature) {
      console.warn("[Revalidate] Invalid signature received");
      return new Response(
        JSON.stringify({ message: "Invalid signature", isValidSignature, body }),
        { status: 401 }
      );
    }

    if (!body?._type) {
      console.warn("[Revalidate] Bad request: missing _type");
      return new Response(JSON.stringify({ message: "Bad Request", body }), {
        status: 400,
      });
    }

    // ドキュメントタイプに対応するタグを revalidate
    // page.tsx の sanityFetch で設定されているタグと一致させる
    // 'max' プロファイル: stale-while-revalidate セマンティクス
    revalidateTag(body._type, "max");

    console.log(`[Revalidate] Successfully revalidated tag: ${body._type}`);

    return NextResponse.json({
      revalidated: true,
      tag: body._type,
      now: Date.now(),
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("[Revalidate] Error:", errorMessage);
    return new Response(errorMessage, { status: 500 });
  }
}
