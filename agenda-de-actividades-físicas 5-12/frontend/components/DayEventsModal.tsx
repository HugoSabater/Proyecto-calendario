
import React from 'react';
import { Event } from '../types';
import { CloseIcon } from './icons/CloseIcon';
import { EditIcon } from './icons/EditIcon';

interface DayEventsModalProps {
    events: Event[];
    date: Date | null;
    onClose: () => void;
    onToggleEvent: (id: number) => void;
    onEditEventClick: (event: Event) => void;
}

const DayEventsModal: React.FC<DayEventsModalProps> = ({ events, date, onClose, onToggleEvent, onEditEventClick }) => {
    const formattedDate = date ? new Intl.DateTimeFormat('es-ES', { dateStyle: 'full' }).format(date) : '';

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
            aria-modal="true"
            role="dialog"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    aria-label="Cerrar modal"
                >
                    <CloseIcon />
                </button>
                <h2 className="text-xl font-bold text-gray-800 mb-1">Eventos del día</h2>
                <p className="text-md text-cyan-600 font-semibold mb-4 capitalize">{formattedDate}</p>
                
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                    {events.map(event => (
                        <div key={event.id} className="group bg-gray-100 p-3 rounded-lg flex items-center relative">
                            <input
                                type="checkbox"
                                checked={event.checked}
                                onChange={() => onToggleEvent(event.id)}
                                className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 mr-3"
                            />
                            <p className={`flex-1 font-semibold text-gray-800 ${event.checked ? 'line-through text-gray-500' : ''}`}>{event.title}</p>
                            <button
                                onClick={() => onEditEventClick(event)}
                                className="ml-2 p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label={`Editar evento ${event.title}`}
                            >
                                <EditIcon />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DayEventsModal;
