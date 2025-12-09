export type View = 'home' | 'activities' | 'calendar' | 'profile' | 'settings' | 'routine';

export interface Event {
  id: number;
  title: string;
  date: Date;
  checked: boolean;
}

export interface Activity {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  checked: boolean;
}

export interface User {
  name: string;
  avatarUrl: string;
}

export interface ChatMessage {
  id: number;
  user: User;
  message: string;
}

export interface HealthData {
  heartRate: number; // in bpm
  steps: number;
}