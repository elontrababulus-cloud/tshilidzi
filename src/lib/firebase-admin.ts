import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK (server-side only)
function getFirebaseAdminApp() {
  const apps = getApps();
  if (apps.length > 0) {
    return apps[0];
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  
  if (!serviceAccountKey) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set');
  }

  let serviceAccount;
  try {
    serviceAccount = JSON.parse(serviceAccountKey);
  } catch {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON');
  }

  return initializeApp({
    credential: cert(serviceAccount),
  });
}

// Get Firestore instance (lazy initialization)
let adminDb: ReturnType<typeof getFirestore> | null = null;

export function getAdminFirestore() {
  if (!adminDb) {
    const app = getFirebaseAdminApp();
    adminDb = getFirestore(app);
  }
  return adminDb;
}
