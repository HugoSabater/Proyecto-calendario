import React, { useState } from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface AddEventModalProps {
    onSave: (eventData: { title: string, date: Date }) => void;
    onClose: () => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ onSave, onClose }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // YYYY-MM-DD format

    const handleSave = () => {
        if (title.trim() && date) {
            // The date from input is a string. We need to parse it correctly, accounting for timezones.
            const dateParts = date.split('-').map(Number);
            const utcDate = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));
            onSave({ title: title.trim(), date: utcDate });
        }
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
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Añadir Nuevo Evento</h2>
                
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
                </div>

                <div className="mt-6 flex justify-end space-x-3">
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
                        Guardar Evento
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEventModal;