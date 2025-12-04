import React from 'react';
import { View, Event as EventType } from '../types';
import { currentUser } from '../constants';
import { HomeIcon } from './icons/HomeIcon';
import { ActivitiesIcon } from './icons/ActivitiesIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { ProfileIcon } from './icons/ProfileIcon';
import ChatWindow from './ChatWindow';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';

interface SidebarProps {
    currentView: View;
    setCurrentView: (view: View) => void;
    events: EventType[];
    onDeleteRequest: (id: number) => void;
    isEditMode: boolean;
    onToggleEditMode: () => void;
    onToggleEvent: (id: number) => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-slate-700 hover:text-white'
            }`}
        >
            {icon}
            <span className="ml-3">{label}</span>
        </button>
    );
};

const EventItem: React.FC<{ event: EventType, isEditMode: boolean, onDelete: (id: number) => void, onToggle: (id: number) => void }> = ({ event, isEditMode, onDelete, onToggle }) => {
    return (
        <div className="flex items-center justify-between px-4 py-2 text-gray-300 group">
            <div className="flex items-center">
                {!isEditMode && (
                    <input
                        type="checkbox"
                        checked={event.checked}
                        onChange={() => onToggle(event.id)}
                        className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 mr-3"
                    />
                )}
                <span className={`text-sm ${event.checked ? 'line-through text-gray-500' : ''}`}>{event.title}</span>
            </div>
            {isEditMode && (
                 <button 
                    onClick={() => onDelete(event.id)}
                    className="text-gray-500 hover:text-red-500"
                    aria-label={`Eliminar evento ${event.title}`}
                >
                    <TrashIcon />
                </button>
            )}
        </div>
    );
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, events, onDeleteRequest, isEditMode, onToggleEditMode, onToggleEvent }) => {
    return (
        <aside className="w-64 bg-slate-800 text-white flex flex-col p-4 shrink-0">
            <div className="border-b border-slate-700 pb-4 mb-4 flex items-center space-x-3 shrink-0">
                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full" />
                <h2 className="font-bold text-lg truncate">{currentUser.name}</h2>
            </div>

            <nav className="flex flex-col space-y-2 shrink-0">
                <NavItem icon={<HomeIcon />} label="Inicio" isActive={currentView === 'home'} onClick={() => setCurrentView('home')} />
                <NavItem icon={<ActivitiesIcon />} label="Mis actividades" isActive={currentView === 'activities'} onClick={() => setCurrentView('activities')} />
                <NavItem icon={<CalendarIcon />} label="Calendario" isActive={currentView === 'calendar'} onClick={() => setCurrentView('calendar')} />
                <NavItem icon={<ProfileIcon />} label="Perfil" isActive={currentView === 'profile'} onClick={() => setCurrentView('profile')} />
            </nav>

            <div className="flex-1 flex flex-col min-h-0">
                {currentView === 'calendar' && (
                    <div className="mt-8 border-t border-slate-700 pt-4 flex-1 flex flex-col min-h-0">
                        <div className="flex justify-between items-center px-4 pb-2 shrink-0">
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Eventos</h3>
                            <button 
                                onClick={onToggleEditMode} 
                                className={`p-1 rounded ${isEditMode ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:text-white'}`}
                                aria-label="Editar eventos"
                            >
                                <EditIcon />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {events.map(event => (
                                <EventItem key={event.id} event={event} isEditMode={isEditMode} onDelete={onDeleteRequest} onToggle={onToggleEvent} />
                            ))}
                        </div>
                    </div>
                )}
                 <div className={`mt-auto pt-4 ${currentView === 'calendar' ? 'border-t border-slate-700' : 'mt-8 border-t border-slate-700'}`}>
                    <h3 className="pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider shrink-0 px-4">Chat de equipo</h3>
                    <div className="h-[350px]">
                        <ChatWindow />
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;