export enum Page {
  Landing,
  Home,
  Profile,
  FirstAid,
  About,
  Login,
  SignUp,
  // FIX: Add ApiKey to allow navigation to the API key configuration page.
  ApiKey,
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  image?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  bloodGroup: string;
  age: number;
  emergencyContact: string;
}

export interface EmergencyService {
  id: number;
  name: string;
  address: string;
  phone: string;
  type: 'hospital' | 'pharmacy';
  lat: number;
  lng: number;
}