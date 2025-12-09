
import React from 'react';
import { Activity, Event } from '../types';
import { currentUser } from '../constants';
import { PlusIcon } from './icons/PlusIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { ClipboardListIcon } from './icons/ClipboardListIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { CalendarIcon } from './icons/CalendarIcon';


interface HomeViewProps {
    activities: Activity[];
    events: Event[];
    onAddActivityClick: () => void;
    onAddEventClick: () => void;
}

const motivationalQuotes = [
    "La única mala sesión de entrenamiento es la que no se hizo.",
    "Cree en ti mismo y todo lo que eres. Reconoce que hay algo dentro de ti que es más grande que cualquier obstáculo.",
    "El dolor que sientes hoy será la fuerza que sentirás mañana.",
    "Tu cuerpo puede soportar casi cualquier cosa. Es tu mente la que tienes que convencer.",
    "No se trata de ser el mejor. Se trata de ser mejor de lo que eras ayer."
];

const HomeView: React.FC<HomeViewProps> = ({ activities, events, onAddActivityClick, onAddEventClick }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysActivities = activities; // Assuming all activities in state are for "today" as per ActivitiesView
    const completedActivities = todaysActivities.filter(a => a.checked).length;
    const totalActivities = todaysActivities.length;
    const progress = totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0;
    
    const upcomingEvents = events
        .filter(event => event.date >= today)
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, 3);
        
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Buenos días';
        if (hour < 18) return 'Buenas tardes';
        return 'Buenas noches';
    }

    const formatDateDifference = (date: Date) => {
        const diffTime = date.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Hoy';
        if (diffDays === 1) return 'Mañana';
        return `en ${diffDays} días`;
    }

    const randomQuote = React.useMemo(() => motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)], []);

    return (
        <div className="p-8 bg-gray-50 h-full overflow-y-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">{`${getGreeting()}, ${currentUser.name.split(' ')[0]}!`}</h1>
                <p className="text-gray-500">{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Progress Card */}
                <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-700 mb-4">Progreso del Día</h2>
                        <div className="flex justify-around items-center text-center my-4">
                            <div>
                                <ClipboardListIcon className="h-8 w-8 text-gray-400 mx-auto" />
                                <p className="text-2xl font-bold">{totalActivities}</p>
                                <p className="text-sm text-gray-500">Planificadas</p>
                            </div>
                             <div>
                                <CheckCircleIcon className="h-8 w-8 text-cyan-500 mx-auto" />
                                <p className="text-2xl font-bold text-cyan-600">{completedActivities}</p>
                                <p className="text-sm text-gray-500">Completadas</p>
                            </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 my-4">
                            <div className="bg-cyan-500 h-4 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                    <div className="text-center text-gray-500 italic mt-4 flex items-center justify-center space-x-2">
                        <SparklesIcon className="h-5 w-5 text-yellow-400" />
                        <span>{randomQuote}</span>
                    </div>
                </div>
                
                {/* Quick Actions Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Accesos Rápidos</h2>
                    <div className="space-y-4">
                        <button onClick={onAddActivityClick} className="w-full flex items-center justify-center bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-600 transition-colors">
                           <PlusIcon className="h-5 w-5 mr-2" /> Añadir Actividad
                        </button>
                        <button onClick={onAddEventClick} className="w-full flex items-center justify-center bg-slate-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-800 transition-colors">
                           <PlusIcon className="h-5 w-5 mr-2" /> Añadir Evento
                        </button>
                    </div>
                </div>

                {/* Upcoming Events Card */}
                <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Próximos Eventos</h2>
                     {upcomingEvents.length > 0 ? (
                        <ul className="space-y-3">
                            {upcomingEvents.map(event => (
                                <li key={event.id} className="flex items-center p-3 bg-gray-50 rounded-md">
                                    <div className="p-2 bg-cyan-100 text-cyan-600 rounded-full mr-4">
                                        <CalendarIcon />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-800">{event.title}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-500">{formatDateDifference(event.date)}</p>
                                </li>
                            ))}
                        </ul>
                     ) : (
                        <p className="text-gray-500 text-center py-4">No tienes eventos próximos en tu calendario.</p>
                     )}
                </div>

            </div>
        </div>
    );
};

export default HomeView;
