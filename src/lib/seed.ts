// A script to seed the Firestore database with mock data.
// This is useful for development and testing.
//
// To run this script, use: `npm run seed-firestore`
//
// NOTE: This will overwrite existing data in the collections.
// You must have service account credentials set up in your environment.
// See: https://firebase.google.com/docs/admin/setup#initialize-sdk

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { config } from 'dotenv';
import { mockAlerts, mockAidRequests, mockContributors } from './mock-data';

config(); // Load environment variables from .env file

async function seedDatabase() {
  try {
    const serviceAccountKey = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
    if (!serviceAccountKey) {
      throw new Error(
        'GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable not set.'
      );
    }

    initializeApp({
      credential: cert(JSON.parse(serviceAccountKey)),
    });

    const db = getFirestore();
    console.log('Firebase Admin Initialized. Seeding database...');

    // Seed Alerts
    console.log('Seeding alerts...');
    const alertsBatch = db.batch();
    const alertsCollection = db.collection('alerts');
    const existingAlerts = await alertsCollection.get();
    existingAlerts.forEach(doc => alertsBatch.delete(doc.ref));
    mockAlerts.forEach(alert => {
      const docRef = alertsCollection.doc();
      alertsBatch.set(docRef, alert);
    });
    await alertsBatch.commit();
    console.log(`${mockAlerts.length} alerts seeded.`);

    // Seed Aid Requests
    console.log('Seeding aid requests...');
    const aidRequestsBatch = db.batch();
    const aidRequestsCollection = db.collection('aidRequests');
    const existingAidRequests = await aidRequestsCollection.get();
    existingAidRequests.forEach(doc => aidRequestsBatch.delete(doc.ref));
    mockAidRequests.forEach(request => {
        const docRef = aidRequestsCollection.doc();
        aidRequestsBatch.set(docRef, request);
    });
    await aidRequestsBatch.commit();
    console.log(`${mockAidRequests.length} aid requests seeded.`);

    // Seed Contributors
    console.log('Seeding contributors...');
    const contributorsBatch = db.batch();
    const contributorsCollection = db.collection('contributors');
    const existingContributors = await contributorsCollection.get();
    existingContributors.forEach(doc => contributorsBatch.delete(doc.ref));
    mockContributors.forEach(contributor => {
        const docRef = contributorsCollection.doc();
        contributorsBatch.set(docRef, contributor);
    });
    await contributorsBatch.commit();
    console.log(`${mockContributors.length} contributors seeded.`);

    console.log('Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
