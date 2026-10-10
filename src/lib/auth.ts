import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "bc_admin";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12h

function secret(): string | null {
  const s = process.env.SESSION_SECRET;
  if (s) return s;
  // Production must set SESSION_SECRET — a guessable fallback would let
  // anyone forge admin cookies.
  if (process.env.NODE_ENV === "production") return null;
  return process.env.DATABASE_URL ?? "brady-dev-secret-change-me";
}

function sign(payload: string): string | null {
  const s = secret();
  return s ? createHmac("sha256", s).update(payload).digest("hex") : null;
}

export function createSessionToken(): string | null {
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = `admin.${exp}`;
  const sig = sign(payload);
  return sig ? `${payload}.${sig}` : null;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [who, exp, sig] = parts;
  if (who !== "admin") return false;
  const expected = sign(`${who}.${exp}`);
  if (!expected) return false;
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

// Middleware only shape-checks the cookie — pages must call this before
// querying data so forged "admin.<future-ts>.x" cookies can't read anything.
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
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
