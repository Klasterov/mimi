import { NextRequest, NextResponse } from "next/server";

export function rejectCrossOriginMutation(request: NextRequest) {
  if (["GET", "HEAD", "OPTIONS"].includes(request.method)) return null;
  const origin = request.headers.get("origin");
  const allowed = new Set([
    request.nextUrl.origin,
    ...(process.env.APP_ORIGINS || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  ]);
  if (
    request.headers.get("sec-fetch-site") === "cross-site" ||
    (origin && !allowed.has(origin))
  ) {
    return NextResponse.json({ error: "Origin not allowed" }, { status: 403 });
  }
  return null;
}

const attempts = new Map<string, { count: number; reset: number }>();
export function rateLimitRequest(
  key: string,
  limit: number,
  windowMs = 15 * 60 * 1000,
) {
  const now = Date.now();
  for (const [entry, value] of attempts)
    if (value.reset <= now) attempts.delete(entry);
  const current = attempts.get(key) || { count: 0, reset: now + windowMs };
  // Bound memory even when an attacker supplies many distinct names.
  if (!attempts.has(key) && attempts.size >= 10000)
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  current.count++;
  attempts.set(key, current);
  if (current.count > limit)
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((current.reset - now) / 1000)),
        },
      },
    );
  return null;
}
