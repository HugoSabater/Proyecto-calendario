
import { Event, Activity, User, ChatMessage } from './types.ts';

export const currentUser: User = {
    name: 'María Tomillos García',
    avatarUrl: 'https://picsum.photos/seed/maria/40/40',
};

export const users: { [key: string]: User } = {
    'maria': currentUser,
    'julian': { name: 'Julián Álvarez Ruiz', avatarUrl: 'https://picsum.photos/seed/julian/40/40' },
    'eduard': { name: 'Eduard Martín Martí...', avatarUrl: 'https://picsum.photos/seed/eduard/40/40' },
};

export const MOCK_EVENTS: Event[] = [
    { id: 1, title: 'Carrera Matutina', date: new Date(new Date().getFullYear(), new Date().getMonth(), 12), checked: true },
    { id: 2, title: 'Clase de Yoga', date: new Date(new Date().getFullYear(), new Date().getMonth(), 27), checked: false },
    { id: 3, title: 'Entrenamiento de Fuerza', date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 4), checked: true },
];

export const MOCK_ACTIVITIES: Activity[] = [
    { id: 1, time: '08:00', title: 'Desayuno', description: 'Leche con cereales', checked: true },
    { id: 2, time: '10:00', title: 'Correr 5km', description: 'Ritmo suave por el parque.', checked: false },
    { id: 3, time: '17:00', title: 'Entrenamiento fuerza', description: 'Rutina de cuerpo completo en el gimnasio.', checked: false },
];

export const SUGGESTED_ACTIVITIES: Omit<Activity, 'id' | 'checked'>[] = [
    { time: '09:00', title: 'Paseo matutino', description: '30 minutos de caminata ligera.' },
    { time: '12:00', title: 'Estiramientos', description: '15 minutos de estiramientos de cuerpo completo.' },
    { time: '14:00', title: 'Comida saludable', description: 'Preparar una ensalada nutritiva.' },
    { time: '18:00', title: 'Sesión de yoga', description: 'Clase de Vinyasa online.' },
    { time: '21:00', title: 'Meditación', description: '10 minutos de meditación guiada.' }
];

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
    { id: 1, user: users.maria, message: 'Necesito ayuda para hacer la dieta del fin de semana.' },
    { id: 2, user: users.julian, message: '¿Alguien me acompaña por la sierra el domingo a las 7:40?' },
    { id: 3, user: users.eduard, message: 'Yo me iré a la sierra... pero de los Pirineos a esquiar jejeje.' },
    { id: 4, user: users.maria, message: '¡Qué envidia! Bueno, pues a ver si alguien más se anima.' },
];