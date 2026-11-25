import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "werb_admin_session";
const TTL_SECONDS = 60 * 60 * 12;

function config() {
  return {
    email: process.env.ADMIN_EMAIL?.trim().toLowerCase(),
    hash: process.env.ADMIN_PASSWORD_HASH,
    secret: process.env.ADMIN_SESSION_SECRET,
  };
}

export function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${derived}`;
}

function verifyPassword(password: string, encoded?: string) {
  if (!encoded?.startsWith("scrypt:")) return false;
  const [, salt, expected] = encoded.split(":");
  if (!salt || !expected) return false;
  const actual = scryptSync(password, salt, 64);
  const target = Buffer.from(expected, "hex");
  return target.length === actual.length && timingSafeEqual(actual, target);
}

function signature(value: string, secret: string) {
  return createHash("sha256").update(`${value}.${secret}`).digest("hex");
}

export function isAuthConfigured() {
  const { email, hash, secret } = config();
  return Boolean(email && hash && secret);
}

export function verifyCredentials(email: string, password: string) {
  const current = config();
  return Boolean(
    current.email && current.hash && current.secret &&
      email.trim().toLowerCase() === current.email &&
      verifyPassword(password, current.hash),
  );
}

export async function createSession(email: string) {
  const { secret } = config();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured");
  const expires = Math.floor(Date.now() / 1000) + TTL_SECONDS;
  const value = `${email.toLowerCase()}.${expires}`;
  (await cookies()).set(COOKIE, `${value}.${signature(value, secret)}`, {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax",
    path: "/", maxAge: TTL_SECONDS,
  });
}

export async function clearSession() {
  (await cookies()).set(COOKIE, "", { httpOnly: true, expires: new Date(0), path: "/" });
}

export async function requireAdmin() {
  const { secret } = config();
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!secret || !raw) return null;
  const parts = raw.split(".");
  if (parts.length !== 3) return null;
  const [email, expiry, provided] = parts;
  const value = `${email}.${expiry}`;
  if (Number(expiry) < Math.floor(Date.now() / 1000)) return null;
  const expected = signature(value, secret);
  return provided === expected ? email : null;
}

