import React from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface DeleteConfirmationModalProps {
    onClose: () => void;
    onConfirm: () => void;
    dontAskAgain: boolean;
    onDontAskAgainChange: (value: boolean) => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ onClose, onConfirm, dontAskAgain, onDontAskAgainChange }) => {
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
                <h2 className="text-xl font-bold text-gray-800 mb-4">Confirmar Eliminación</h2>
                <p className="text-gray-600 mb-6">¿Estás seguro que quieres eliminar este evento?</p>

                <div className="flex items-center mb-6">
                    <input
                        id="dont-ask-again"
                        type="checkbox"
                        checked={dontAskAgain}
                        onChange={(e) => onDontAskAgainChange(e.target.checked)}
                        className="h-4 w-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                    />
                    <label htmlFor="dont-ask-again" className="ml-2 block text-sm text-gray-900">
                        No volver a preguntar
                    </label>
                </div>
                
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
