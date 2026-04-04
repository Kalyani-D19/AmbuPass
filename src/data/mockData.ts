import { Hospital, UserProfile } from "@/types";

export const mockHospitals: Hospital[] = [
  {
    id: "1", name: "City General Hospital", distance: 1.2, rating: 4.5,
    beds: { total: 200, available: 34 }, oxygen: { total: 50, available: 12 },
    icu: { total: 20, available: 3 }, specialties: ["Cardiology", "Neurology", "Orthopedics", "Emergency"],
    address: "123 Medical Ave, Downtown", phone: "+1-555-0101", lat: 28.6139, lng: 77.209,
  },
  {
    id: "2", name: "St. Mary's Medical Center", distance: 2.8, rating: 4.8,
    beds: { total: 350, available: 67 }, oxygen: { total: 80, available: 25 },
    icu: { total: 30, available: 8 }, specialties: ["Cardiology", "Oncology", "Pediatrics", "Emergency", "Trauma"],
    address: "456 Health Blvd, Midtown", phone: "+1-555-0102", lat: 28.6229, lng: 77.2195,
  },
  {
    id: "3", name: "Apollo Emergency Care", distance: 0.8, rating: 4.2,
    beds: { total: 120, available: 5 }, oxygen: { total: 30, available: 3 },
    icu: { total: 10, available: 1 }, specialties: ["Emergency", "Trauma", "Burns"],
    address: "789 Urgent St, Eastside", phone: "+1-555-0103", lat: 28.6089, lng: 77.2190,
  },
  {
    id: "4", name: "National Heart Institute", distance: 4.1, rating: 4.9,
    beds: { total: 150, available: 22 }, oxygen: { total: 40, available: 15 },
    icu: { total: 25, available: 6 }, specialties: ["Cardiology", "Cardiac Surgery", "Vascular"],
    address: "321 Cardiac Lane, Westend", phone: "+1-555-0104", lat: 28.6319, lng: 77.2050,
  },
  {
    id: "5", name: "Trauma Care Hospital", distance: 3.5, rating: 4.3,
    beds: { total: 180, available: 41 }, oxygen: { total: 60, available: 20 },
    icu: { total: 15, available: 4 }, specialties: ["Trauma", "Orthopedics", "Neurosurgery", "Emergency"],
    address: "654 Recovery Rd, Northside", phone: "+1-555-0105", lat: 28.6439, lng: 77.2100,
  },
  {
    id: "6", name: "Children's Specialty Hospital", distance: 5.2, rating: 4.7,
    beds: { total: 100, available: 18 }, oxygen: { total: 25, available: 8 },
    icu: { total: 12, available: 5 }, specialties: ["Pediatrics", "Neonatal", "Pediatric Surgery"],
    address: "987 Kids Ave, Southtown", phone: "+1-555-0106", lat: 28.5989, lng: 77.2250,
  },
];

export const defaultProfile: UserProfile = {
  name: "John Doe",
  age: 32,
  bloodGroup: "O+",
  allergies: ["Penicillin", "Peanuts"],
  medicalHistory: ["Appendectomy (2018)", "Fractured Tibia (2020)"],
  emergencyContacts: [
    { name: "Jane Doe", phone: "+1-555-0201", relation: "Spouse" },
    { name: "Robert Doe", phone: "+1-555-0202", relation: "Father" },
  ],
  phone: "+1-555-0100",
  address: "42 Elm Street, Downtown",
};

export const symptomMap: Record<string, { specialty: string; urgency: "low" | "medium" | "high" | "critical" }> = {
  "Chest Pain": { specialty: "Cardiology", urgency: "critical" },
  "Difficulty Breathing": { specialty: "Cardiology", urgency: "critical" },
  "Head Injury": { specialty: "Neurosurgery", urgency: "critical" },
  "Severe Bleeding": { specialty: "Trauma", urgency: "critical" },
  "Fracture": { specialty: "Orthopedics", urgency: "high" },
  "Burns": { specialty: "Burns", urgency: "high" },
  "Stroke Symptoms": { specialty: "Neurology", urgency: "critical" },
  "Abdominal Pain": { specialty: "Emergency", urgency: "medium" },
  "High Fever": { specialty: "Emergency", urgency: "medium" },
  "Allergic Reaction": { specialty: "Emergency", urgency: "high" },
  "Seizure": { specialty: "Neurology", urgency: "critical" },
  "Child Emergency": { specialty: "Pediatrics", urgency: "high" },
};
