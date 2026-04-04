export interface Hospital {
  id: string;
  name: string;
  distance: number;
  rating: number;
  beds: { total: number; available: number };
  oxygen: { total: number; available: number };
  icu: { total: number; available: number };
  specialties: string[];
  address: string;
  phone: string;
  lat: number;
  lng: number;
}

export interface UserProfile {
  name: string;
  age: number;
  bloodGroup: string;
  allergies: string[];
  medicalHistory: string[];
  emergencyContacts: { name: string; phone: string; relation: string }[];
  phone: string;
  address: string;
}

export interface SymptomResult {
  symptom: string;
  suggestedSpecialty: string;
  urgency: "low" | "medium" | "high" | "critical";
  hospitals: Hospital[];
}
