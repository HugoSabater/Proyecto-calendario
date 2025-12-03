export type View = 'home' | 'activities' | 'calendar' | 'profile';

export interface UserProfile {
    name: string;
    gender: 'male' | 'female' | 'other';
    age: number;
    weight: number;
    height: number;
    imageUrl: string;
}

export interface Event {
    id: number;
    title: string;
    date: Date;
    checked: boolean;
}

export interface Activity {
    id: number;
    time: string;
    title:string;
    description: string;
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