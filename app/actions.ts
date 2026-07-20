"use server";

import { kv } from "@vercel/kv";

export type QuietMessage = {
  text: string;
  date: string;
};

export type SendResult = {
  ok: boolean;
  error?: string;
};

function kvConfigured() {
  return Boolean(
    process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN,
  );
}

export async function sendQuietMessage(raw: string): Promise<SendResult> {
  const text = raw.trim();
  if (!text) {
    return { ok: false, error: "empty" };
  }
  if (text.length > 2000) {
    return { ok: false, error: "too_long" };
  }

  if (!kvConfigured()) {
    return { ok: false, error: "unavailable" };
  }

  try {
    const payload: QuietMessage = {
      text,
      date: new Date().toISOString(),
    };
    await kv.lpush("messages", payload);
    return { ok: true };
  } catch {
    return { ok: false, error: "failed" };
  }
}

export async function getQuietMessages(): Promise<QuietMessage[]> {
  if (!kvConfigured()) return [];

  try {
    const rows = await kv.lrange<QuietMessage>("messages", 0, -1);
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}
