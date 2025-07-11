
import type { Alert, AidRequest, Contributor } from './types';

export const mockAlerts: Omit<Alert, 'id'>[] = [
  {
    location: { lat: 31.5222, lng: 34.4533 },
    locationName: 'Al-Shifa Hospital',
    description: 'Urgent trauma case, need immediate surgical support. Multiple GSWs.',
    timestamp: Date.now() - 1000 * 60 * 5, // 5 mins ago
    reporterId: 'doctor.ahmad',
    type: 'triage',
    priority: 'High',
    confirmations: 2,
    disputes: 0,
    trustScore: 80,
  },
  {
    location: { lat: 31.4158, lng: 34.3496 },
    locationName: 'Nasser Medical Complex, Khan Younis',
    description: 'Low on pediatric antibiotics, need resupply for childrens ward.',
    timestamp: Date.now() - 1000 * 60 * 60, // 1 hour ago
    reporterId: 'nurse.fatima',
    type: 'triage',
    priority: 'Medium',
    confirmations: 5,
    disputes: 0,
    trustScore: 85,
  },
  {
    location: { lat: 31.3547, lng: 34.3088 },
    locationName: 'European Gaza Hospital',
    description: 'Field clinic requires more bandages and antiseptic wipes for routine care.',
    timestamp: Date.now() - 1000 * 60 * 120, // 2 hours ago
    reporterId: 'medic.yusuf',
    type: 'triage',
    priority: 'Low',
    confirmations: 8,
    disputes: 1,
    trustScore: 78,
  },
  {
    location: { lat: 31.2913, lng: 34.2618 },
    locationName: 'Rafah Field Clinic',
    description: 'Patient with severe dehydration and fever reported. Needs assessment.',
    timestamp: Date.now() - 1000 * 60 * 30, // 30 mins ago
    reporterId: 'volunteer.sara',
    type: 'triage',
    priority: 'Medium',
    confirmations: 3,
    disputes: 0,
    trustScore: 75,
  },
];

export const mockAidRequests: Omit<AidRequest, 'id'>[] = [
  {
    requesterId: 'clinic-1',
    category: 'Medicine',
    description: 'Urgent need for insulin and diabetes testing strips for Al-Amal Hospital.',
    familySize: 50, // Represents patients
    status: 'Needed',
    priority: 'High',
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
    locationName: 'Al-Amal Hospital, Khan Younis',
    photoUrl: 'https://placehold.co/600x400.png',
  },
  {
    requesterId: 'clinic-2',
    category: 'Medicine',
    description: 'Requesting a supply of bandages, gauze, and medical tape for a field clinic.',
    familySize: 100, // Represents patients
    status: 'Pledged',
    priority: 'Medium',
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    locationName: 'Deir al-Balah Clinic',
    photoUrl: 'https://placehold.co/600x400.png',
  },
  {
    requesterId: 'family-1',
    category: 'Food',
    description: 'Family of 6 needs baby formula and basic food supplies.',
    familySize: 6,
    status: 'Needed',
    priority: 'Low',
    timestamp: Date.now() - 1000 * 60 * 60 * 12,
    locationName: 'Jabalia Camp',
    photoUrl: 'https://placehold.co/600x400.png',
  },
  {
    requesterId: 'shelter-1',
    category: 'Shelter',
    description: 'Our tent was damaged. We need tarps and blankets to stay dry. Thank you.',
    familySize: 4,
    status: 'Fulfilled',
    priority: 'Medium',
    timestamp: Date.now() - 1000 * 60 * 60 * 48,
    locationName: 'Nuseirat Camp',
    feedback: 'Alhamdulillah, we received the new tarp and blankets. Your help kept my children warm. Shukran.',
    photoUrl: 'https://placehold.co/600x400.png',
  },
];

export const mockContributors: Omit<Contributor, 'id'>[] = [
  {
    id: 'contrib-1',
    rank: 1,
    name: 'Fatima A.',
    contributions: 28,
    type: 'Donor',
    avatarUrl: 'https://placehold.co/40x40.png',
  },
  {
    id: 'contrib-2',
    rank: 2,
    name: 'Dr. Ahmed K.',
    contributions: 21,
    type: 'Reporter',
    avatarUrl: 'https://placehold.co/40x40.png',
  },
  {
    id: 'contrib-3',
    rank: 3,
    name: 'Anonymous Giver',
    contributions: 19,
    type: 'Donor',
  },
  {
    id: 'contrib-4',
    rank: 4,
    name: 'Layla M.',
    contributions: 15,
    type: 'Reporter',
    avatarUrl: 'https://placehold.co/40x40.png',
  },
  {
    id: 'contrib-5',
    rank: 5,
    name: 'Yusuf I.',
    contributions: 11,
    type: 'Donor',
    avatarUrl: 'https://placehold.co/40x40.png',
  },
  {
    id: 'contrib-6',
    rank: 6,
    name: 'Community Watcher',
    contributions: 9,
    type: 'Reporter',
  },
];
