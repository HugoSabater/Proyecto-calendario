
import React, { useState, useEffect } from 'react';
import { Event } from '../types';
import { CloseIcon } from './icons/CloseIcon';

interface EditEventModalProps {
    event: Event;
    onSave: (eventData: Event) => void;
    onClose: () => void;
    onDelete: (id: number) => void;
}

const EditEventModal: React.FC<EditEventModalProps> = ({ event, onSave, onClose, onDelete }) => {
    const [title, setTitle] = useState(event.title);
    const [date, setDate] = useState(event.date.toISOString().split('T')[0]);
    const [checked, setChecked] = useState(event.checked);

    useEffect(() => {
        setTitle(event.title);
        setDate(event.date.toISOString().split('T')[0]);
        setChecked(event.checked);
    }, [event]);

    const handleSave = () => {
        if (title.trim() && date) {
            const dateParts = date.split('-').map(Number);
            const utcDate = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));
            onSave({ 
                ...event,
                title: title.trim(), 
                date: utcDate,
                checked: checked,
            });
        }
    };

    const handleDelete = () => {
        onDelete(event.id);
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    aria-label="Cerrar modal"
                >
                    <CloseIcon />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Editar Evento</h2>
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="event-title" className="block text-sm font-medium text-gray-700">
                            Título del Evento
                        </label>
                        <input
                            type="text"
                            id="event-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                            placeholder="Ej: Clase de Spinning"
                        />
                    </div>
                    <div>
                        <label htmlFor="event-date" className="block text-sm font-medium text-gray-700">
                            Fecha
                        </label>
                        <input
                            type="date"
                            id="event-date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            id="event-checked"
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                            className="h-4 w-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                        />
                        <label htmlFor="event-checked" className="ml-2 block text-sm text-gray-900">
                            Completado
                        </label>
                    </div>
                </div>

                <div className="mt-6 flex justify-between">
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Eliminar
                    </button>
                    <div className="flex space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="px-4 py-2 text-sm font-medium text-white bg-cyan-500 border border-transparent rounded-md shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditEventModal;
