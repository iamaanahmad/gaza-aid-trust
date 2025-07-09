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
}

export interface AidRequest {
  id: string;
  requesterId: string;
  category: 'Food' | 'Medicine' | 'Shelter';
  description: string;
  familySize: number;
  photoUrl?: string;
  status: 'Needed' | 'Pledged' | 'Fulfilled';
  timestamp: number;
  locationName: string;
}
