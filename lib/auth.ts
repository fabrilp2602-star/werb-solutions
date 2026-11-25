import { cookies } from 'next/headers';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { getFirebaseAdminAuth, getFirebaseAdminDb, isFirebaseAdminConfigured } from '@/lib/firebase/admin';

const COOKIE = 'werb_admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 5;

export type AdminRole = 'super' | 'admin' | 'tec';

export interface AdminProfile {
  uid: string;
  name: string;
  email: string;
  identification: string;
  role: AdminRole;
  forcePasswordChange: boolean;
  emailVerified: boolean;
}

function normalizeRole(value: unknown): AdminRole | null {
  if (value === 'super' || value === 'admin' || value === 'tec') return value;
  return null;
}

async function profileFromToken(token: DecodedIdToken): Promise<AdminProfile | null> {
  const db = getFirebaseAdminDb();
  const candidates = [
    await db.collection('user').doc(token.uid).get(),
    await db.collection('users').doc(token.uid).get(),
  ];
  const doc = candidates.find((candidate) => candidate.exists);
  const data = doc?.data() || {};
  const role = normalizeRole(data.role) || normalizeRole(token.role) || normalizeRole(token.adminRole);
  if (role !== 'super' && role !== 'admin') return null;

  return {
    uid: token.uid,
    name: String(data.name || token.name || 'Administrador'),
    email: String(token.email || data.email || ''),
    identification: String(data.identification || ''),
    role,
    forcePasswordChange: data.forcePasswordChange === true,
    emailVerified: token.email_verified === true,
  };
}

export async function authenticateFirebaseToken(idToken: string) {
  if (!isFirebaseAdminConfigured() || !idToken) return null;
  try {
    const decoded = await getFirebaseAdminAuth().verifyIdToken(idToken);
    return await profileFromToken(decoded);
  } catch {
    return null;
  }
}

export async function createSession(idToken: string) {
  const profile = await authenticateFirebaseToken(idToken);
  if (!profile) return null;
  const sessionCookie = await getFirebaseAdminAuth().createSessionCookie(idToken, {
    expiresIn: SESSION_TTL_MS,
  });
  (await cookies()).set(COOKIE, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  });
  return profile;
}

export async function clearSession() {
  (await cookies()).set(COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(0),
    path: '/',
  });
}

export async function requireAdmin() {
  if (!isFirebaseAdminConfigured()) return null;
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return null;
  try {
    const decoded = await getFirebaseAdminAuth().verifySessionCookie(raw, true);
    return await profileFromToken(decoded);
  } catch {
    return null;
  }
}
