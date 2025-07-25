import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from './firebase-config';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

// Firestore collection references
export const alertsCollection = collection(db, 'alerts');
export const aidRequestsCollection = collection(db, 'aidRequests');
export const contributorsCollection = collection(db, 'contributors');

export { db, storage };
