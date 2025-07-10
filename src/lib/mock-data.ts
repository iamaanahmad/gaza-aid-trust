import type { Alert, AidRequest, Contributor } from './types';

// This file is now used for seeding the database.
// The app will fetch data from Firestore directly.

export const mockAlerts: Omit<Alert, 'id'>[] = [
  {
    location: { lat: 31.3547, lng: 34.3088 },
    locationName: 'Khan Younis Center',
    description: 'Food aid distribution happening now. Water and bread available.',
    timestamp: Date.now() - 1000 * 60 * 30, // 30 mins ago
    reporterId: 'user1',
    confirmations: 12,
    disputes: 1,
    trustScore: 92,
  },
  {
    location: { lat: 31.5222, lng: 34.4533 },
    locationName: 'Gaza City Clinic',
    description: 'Medical supplies just arrived. Open for families with children.',
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    reporterId: 'user2',
    confirmations: 8,
    disputes: 3,
    trustScore: 65,
  },
  {
    location: { lat: 31.2913, lng: 34.2618 },
    locationName: 'Rafah Shelter',
    description: 'This location is reported to be full. Avoid for now.',
    timestamp: Date.now() - 1000 * 60 * 60 * 5, // 5 hours ago
    reporterId: 'user3',
    confirmations: 5,
    disputes: 5,
    trustScore: 50,
  },
];

export const mockAidRequests: Omit<AidRequest, 'id'>[] = [
  {
    requesterId: 'gaza-user-1',
    category: 'Food',
    description: 'Need rice, flour, and cooking oil for a family of 5.',
    familySize: 5,
    status: 'Needed',
    timestamp: Date.now() - 1000 * 60 * 60 * 8,
    locationName: 'Jabalia Camp',
  },
  {
    requesterId: 'gaza-user-2',
    category: 'Food',
    description: 'Urgently need baby formula and diapers.',
    familySize: 2,
    status: 'Pledged',
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    locationName: 'Deir al-Balah',
    photoUrl: 'https://placehold.co/600x400.png',
  },
  {
    requesterId: 'gaza-user-3',
    category: 'Food',
    description: 'Requesting canned goods and clean water for an elderly couple.',
    familySize: 2,
    status: 'Fulfilled',
    timestamp: Date.now() - 1000 * 60 * 60 * 48,
    locationName: 'Nuseirat Camp',
    feedback: 'We received the items quickly. Thank you for your kindness and support during these hard times. May you be rewarded.',
  },
];

export const mockContributors: Omit<Contributor, 'id'>[] = [
  {
    rank: 1,
    name: 'Generous Donor A',
    contributions: 25,
    type: 'Donor',
    avatarUrl: 'https://placehold.co/40x40.png',
  },
  {
    rank: 2,
    name: 'Vigilant Reporter 1',
    contributions: 18,
    type: 'Reporter',
    avatarUrl: 'https://placehold.co/40x40.png',
  },
  {
    rank: 3,
    name: 'Anonymous Giver',
    contributions: 15,
    type: 'Donor',
  },
  {
    rank: 4,
    name: 'Community Watcher',
    contributions: 12,
    type: 'Reporter',
    avatarUrl: 'https://placehold.co/40x40.png',
  },
  {
    rank: 5,
    name: 'Hope Spreader',
    contributions: 10,
    type: 'Donor',
  },
  {
    rank: 6,
    name: 'On-the-Ground Hero',
    contributions: 7,
    type: 'Reporter',
  },
];
