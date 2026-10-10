import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "bc_admin";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12h

function secret(): string {
  return (
    process.env.SESSION_SECRET ??
    process.env.DATABASE_URL ??
    "brady-dev-secret-change-me"
  );
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createSessionToken(): string {
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = `admin.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [who, exp, sig] = parts;
  if (who !== "admin") return false;
  const expected = sign(`${who}.${exp}`);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  return Number(exp) > Date.now();
}

export function verifyCredentials(email: string, password: string): boolean {
  const wantEmail = (process.env.ADMIN_EMAIL ?? "admin@bradyremodel.com").toLowerCase();
  const wantPass = process.env.ADMIN_PASSWORD ?? "changeme";
  const okEmail = email.trim().toLowerCase() === wantEmail;
  const a = Buffer.from(password);
  const b = Buffer.from(wantPass);
  const okPass = a.length === b.length && timingSafeEqual(a, b);
  return okEmail && okPass;
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(COOKIE_NAME)?.value);
}

export const adminCookie = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  },
};
