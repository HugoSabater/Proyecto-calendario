
import React, { useState } from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface AddActivityModalProps {
    onSave: (activityData: { title: string, description: string, time: string }) => void;
    onClose: () => void;
}

const AddActivityModal: React.FC<AddActivityModalProps> = ({ onSave, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState(new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));

    const handleSave = () => {
        if (title.trim() && time) {
            onSave({ title: title.trim(), description: description.trim(), time });
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
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Añadir Nueva Actividad</h2>
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="activity-title" className="block text-sm font-medium text-gray-700">
                            Título de la Actividad
                        </label>
                        <input
                            type="text"
                            id="activity-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                            placeholder="Ej: Correr 5km"
                            autoFocus
                        />
                    </div>
                    <div>
                        <label htmlFor="activity-description" className="block text-sm font-medium text-gray-700">
                            Descripción
                        </label>
                        <textarea
                            id="activity-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ritmo suave por el parque..."
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm resize-none"
                            rows={3}
                        />
                    </div>
                    <div>
                        <label htmlFor="activity-time" className="block text-sm font-medium text-gray-700">
                            Hora
                        </label>
                        <input
                            type="time"
                            id="activity-time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
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
                        Añadir Actividad
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddActivityModal;