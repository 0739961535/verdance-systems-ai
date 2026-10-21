import { NextResponse } from "next/server";
import { clientIp, tooMany } from "@/lib/api-guard";
import { dryRun, prepare } from "@/lib/booking-server";
import { cleanAnswers, prepareNote } from "@/components/booking/questions";

/**
 * POST /api/booking/prepare
 * The optional "help us prepare" answers, sent after the call is booked.
 * Only accepted with the ticket the booking returned (Ashford checks it),
 * so a stranger cannot write notes onto someone else's record. Answers
 * must be listed options.
 */
export async function POST(req: Request) {
  if (tooMany(`prep:${clientIp(req)}`, 6, 10 * 60_000)) return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  let body: { ticket?: unknown; answers?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }
  const answers = cleanAnswers(body?.answers);
  if (!Object.keys(answers).length) return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  const r = await prepare(body?.ticket, prepareNote(answers));
  if (r === "invalid_ticket") return NextResponse.json({ error: "invalid_ticket" }, { status: 403 });
  if (r !== "ok") return NextResponse.json({ error: "not_saved" }, { status: 502 });
  return NextResponse.json({ ok: true, ...(dryRun() ? { dryRun: true } : {}) });
}
