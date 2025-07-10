import type { Alert, AidRequest, Contributor } from './types';

export const mockAlerts: Omit<Alert, 'id'>[] = [
  {
    location: { lat: 31.3547, lng: 34.3088 },
    locationName: 'Khan Younis Training College',
    description: 'Confirmed safe route for passage. UNRWA is present. Route is clear of debris.',
    timestamp: Date.now() - 1000 * 60 * 30, // 30 mins ago
    reporterId: 'user1',
    confirmations: 18,
    disputes: 1,
    trustScore: 95,
  },
  {
    location: { lat: 31.5222, lng: 34.4533 },
    locationName: 'Al-Shifa Hospital Area',
    description: 'Distribution of first aid kits and wound dressings happening now at the main gate.',
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    reporterId: 'user2',
    confirmations: 12,
    disputes: 4,
    trustScore: 71,
  },
  {
    location: { lat: 31.2913, lng: 34.2618 },
    locationName: 'Rafah Border Crossing',
    description: 'Reports of heavy crowds and long waits. Aid trucks are attempting to pass. Not a safe area for civilians.',
    timestamp: Date.now() - 1000 * 60 * 45, // 45 mins ago
    reporterId: 'user3',
    confirmations: 6,
    disputes: 9,
    trustScore: 38,
  },
];

export const mockAidRequests: Omit<AidRequest, 'id'>[] = [
  {
    requesterId: 'gaza-user-1',
    category: 'Medicine',
    description: 'Urgently need insulin and diabetes testing strips for an elderly parent. Current supply will run out in 2 days.',
    familySize: 3,
    status: 'Needed',
    timestamp: Date.now() - 1000 * 60 * 60 * 8,
    locationName: 'Jabalia Camp',
    photoUrl: 'https://placehold.co/600x400.png',
  },
  {
    requesterId: 'gaza-user-2',
    category: 'Food',
    description: 'We are a family of 6 with small children. We need baby formula, diapers, and canned goods like beans and lentils.',
    familySize: 6,
    status: 'Pledged',
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    locationName: 'Deir al-Balah',
  },
  {
    requesterId: 'gaza-user-3',
    category: 'Shelter',
    description: 'Our tent was damaged in the recent storm. We need tarps, rope, and blankets to stay dry. Thank you.',
    familySize: 4,
    status: 'Fulfilled',
    timestamp: Date.now() - 1000 * 60 * 60 * 48,
    locationName: 'Nuseirat Camp',
    feedback: 'Alhamdulillah, we received the new tarp and blankets just before the rain started. Your help kept my children warm. Shukran.',
    photoUrl: 'https://placehold.co/600x400.png',
  },
];

export const mockContributors: Omit<Contributor, 'id'>[] = [
  {
    rank: 1,
    name: 'Fatima A.',
    contributions: 28,
    type: 'Donor',
    avatarUrl: 'https://placehold.co/40x40.png',
  },
  {
    rank: 2,
    name: 'Ahmed K.',
    contributions: 21,
    type: 'Reporter',
    avatarUrl: 'https://placehold.co/40x40.png',
  },
  {
    rank: 3,
    name: 'Anonymous Giver',
    contributions: 19,
    type: 'Donor',
  },
  {
    rank: 4,
    name: 'Layla M.',
    contributions: 15,
    type: 'Reporter',
    avatarUrl: 'https://placehold.co/40x40.png',
  },
  {
    rank: 5,
    name: 'Yusuf I.',
    contributions: 11,
    type: 'Donor',
  },
  {
    rank: 6,
    name: 'Community Watcher',
    contributions: 9,
    type: 'Reporter',
  },
];
