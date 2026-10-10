import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { verifyCredentials, createSessionToken, adminCookie } from "@/lib/auth";


const creds = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid" }, { status: 400 });
  }
  const parsed = creds.safeParse(body);
  if (!parsed.success || !verifyCredentials(parsed.data.email, parsed.data.password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(adminCookie.name, createSessionToken(), adminCookie.options);
  return res;
}
