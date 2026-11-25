import fs from 'node:fs';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

function readServiceAccountFromFile() {
  const filePath = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH?.trim();
  if (!filePath || !fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function getCredentials() {
  const fromFile = readServiceAccountFromFile();
  if (fromFile) return fromFile;
  const json = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON?.trim();
  if (json) return JSON.parse(json);
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL?.trim();
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (!projectId || !clientEmail || !privateKey) return null;
  return { project_id: projectId, client_email: clientEmail, private_key: privateKey };
}

export function isFirebaseAdminConfigured() {
  try {
    return Boolean(getCredentials());
  } catch {
    return false;
  }
}

export function getFirebaseAdminApp() {
  const existing = getApps()[0];
  if (existing) return existing;
  const credentials = getCredentials();
  if (!credentials) throw new Error('Firebase Admin is not configured');
  return initializeApp({ credential: cert(credentials) });
}

export function getFirebaseAdminAuth() {
  return getAuth(getFirebaseAdminApp());
}

export function getFirebaseAdminDb() {
  return getFirestore(getFirebaseAdminApp());
}
