
export type AlertPriority = 'High' | 'Medium' | 'Low';
export type AlertType = 'triage' | 'general';

export interface Alert {
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  locationName: string;
  description: string;
  timestamp: number;
  reporterId: string;
  confirmations: number;
  disputes: number;
  trustScore: number;
  voiceNoteUrl?: string;
  type: AlertType;
  priority: AlertPriority;
}

export interface AidRequest {
  id: string;
  requesterId: string;
  category: 'Food' | 'Medicine' | 'Shelter';
  priority: AlertPriority;
  description: string;
  familySize: number;
  photoUrl?: string;
  status: 'Needed' | 'Pledged' | 'Fulfilled';
  timestamp: number;
  locationName: string;
  feedback?: string;
}

export interface Contributor {
  id:string;
  rank: number;
  name: string;
  avatarUrl?: string;
  contributions: number;
  type: 'Donor' | 'Reporter';
}

export interface PrayerTimesData {
    timings: {
        Fajr: string;
        Dhuhr: string;
        Asr: string;
        Maghrib: string;
        Isha: string;
    };
    date: string;
}
