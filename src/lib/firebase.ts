import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, collection } from 'firebase/firestore';
import { firebaseConfig } from './firebase-config';
import type { Alert, AidRequest, Contributor } from './types';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one tab at a time.
    console.warn('Firebase persistence failed: multiple tabs open.');
  } else if (err.code == 'unimplemented') {
    // The current browser does not support all of the features required to enable persistence.
     console.warn('Firebase persistence not available in this browser.');
  }
});

// Firestore collection references
export const alertsCollection = collection(db, 'alerts');
export const aidRequestsCollection = collection(db, 'aidRequests');
export const contributorsCollection = collection(db, 'contributors');

export { db };
