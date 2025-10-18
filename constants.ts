
import type { EmergencyService } from './types';

export const MOCK_HOSPITALS: EmergencyService[] = [
  { id: 1, name: 'City General Hospital', address: '123 Main St, Anytown', phone: '555-1234', type: 'hospital', lat: 34.0522, lng: -118.2437 },
  { id: 2, name: 'St. Mary\'s Medical Center', address: '456 Oak Ave, Anytown', phone: '555-5678', type: 'hospital', lat: 34.056, lng: -118.251 },
  { id: 3, name: 'Community Health Clinic', address: '789 Pine Ln, Anytown', phone: '555-8765', type: 'hospital', lat: 34.049, lng: -118.239 },
];

export const MOCK_PHARMACIES: EmergencyService[] = [
    { id: 1, name: 'Wellness Pharmacy', address: '101 Health Blvd, Anytown', phone: '555-1111', type: 'pharmacy', lat: 34.053, lng: -118.245 },
    { id: 2, name: 'The Drug Store', address: '202 Cure Rd, Anytown', phone: '555-2222', type: 'pharmacy', lat: 34.058, lng: -118.249 },
];

export const FIRST_AID_TOPICS = [
    { title: "Stopping Severe Bleeding", content: "Apply firm, direct pressure on the wound with a clean cloth or bandage. If bleeding is severe, call emergency services immediately. If an object is in the wound, do not remove it; apply pressure around it." },
    { title: "Performing CPR (Cardiopulmonary Resuscitation)", content: "For adults, place the heel of one hand on the center of the chest, then the other hand on top. Push hard and fast at a rate of 100-120 compressions per minute. If trained, give 2 rescue breaths after every 30 compressions." },
    { title: "Treating Burns", content: "For minor burns, cool the burn with cool (not cold) running water for 10-20 minutes. Cover with a sterile, non-adhesive bandage. For major burns, call emergency services and do not apply water or ointments." },
    { title: "Recognizing a Stroke (F.A.S.T.)", content: "Face: Ask the person to smile. Does one side of the face droop? Arms: Ask the person to raise both arms. Does one arm drift downward? Speech: Ask the person to repeat a simple phrase. Is their speech slurred or strange? Time: If you see any of these signs, call emergency services immediately." },
    { title: "Stabilizing Fractures", content: "Do not try to realign the bone. Immobilize the injured area by using a splint and padding. Keep the injured person still and calm until medical help arrives." },
];
