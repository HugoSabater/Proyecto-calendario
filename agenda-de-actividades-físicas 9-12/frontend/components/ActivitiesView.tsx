import React from 'react';
import { Activity } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';
import { EditIcon } from './icons/EditIcon';
import { SUGGESTED_ACTIVITIES } from '../constants';

interface ActivitiesViewProps {
    activities: Activity[];
    onAddActivity: (activityData: Omit<Activity, 'id' | 'checked'>) => void;
    onDeleteActivity: (id: number) => void;
    onToggleActivity: (id: number) => void;
    onUpdateActivity: (activity: Activity) => void;
    onAddActivityClick: () => void;
}

interface ActivityItemProps {
    activity: Activity;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
    onUpdate: (activity: Activity) => void;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity, onDelete, onToggle, onUpdate }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedNombre, setEditedNombre] = React.useState(activity.nombre);
    const [editedDescripcion, setEditedDescripcion] = React.useState(activity.descripcion);

    const handleEdit = () => {
        setEditedNombre(activity.nombre);
        setEditedDescripcion(activity.descripcion);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = () => {
        onUpdate({ 
            ...activity, 
            nombre: editedNombre.trim(), 
            descripcion: editedDescripcion.trim() 
        });
        setIsEditing(false);
    };

    return (
        <div className="group relative bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-6">
                <div className="w-16 text-right font-semibold text-gray-500 pt-1">
                    {activity.fecha}
                </div>

                <div className="flex-1 border-l border-gray-200 pl-6 relative">
                    <div className="absolute -left-3 top-1 bg-white p-0.5 rounded-full">
                        <input
                            type="checkbox"
                            checked={activity.checked}
                            onChange={() => onToggle(activity.id)}
                            className="h-5 w-5 rounded-full border-gray-300 text-cyan-600 focus:ring-cyan-500"
                            aria-label={`Marcar ${activity.nombre} como completada`}
                        />
                    </div>

                    {isEditing ? (
                        <div className="space-y-2 pb-2">
                            <input
                                type="text"
                                value={editedNombre}
                                onChange={(e) => setEditedNombre(e.target.value)}
                                className="w-full text-lg font-bold text-gray-800 border-b-2 border-cyan-500 focus:outline-none bg-transparent"
                                autoFocus
                            />
                            <textarea
                                value={editedDescripcion}
                                onChange={(e) => setEditedDescripcion(e.target.value)}
                                className="w-full text-gray-600 border-b-2 border-cyan-500 focus:outline-none resize-none bg-transparent"
                                rows={2}
                            />
                            <div className="flex justify-end space-x-2 pt-2">
                                <button 
                                    onClick={handleCancel} 
                                    className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={handleSave} 
                                    className="px-3 py-1 text-sm font-medium text-white bg-cyan-500 rounded hover:bg-cyan-600"
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="pb-4 min-h-[68px]">
                            <h3 className={`font-bold text-lg text-gray-800 ${activity.checked ? 'line-through text-gray-400' : ''}`}>
                                {activity.nombre}
                            </h3>
                            <p className={`text-gray-600 ${activity.checked ? 'line-through text-gray-400' : ''}`}>
                                {activity.descripcion}
                            </p>
                        </div>
                    )}

                    {!isEditing && (
                        <div className="absolute -left-3 bottom-2 bg-white p-0.5 rounded-full transition-opacity opacity-0 group-hover:opacity-100">
                            {!activity.checked ? (
                                <button 
                                    onClick={handleEdit} 
                                    className="h-5 w-5 flex items-center justify-center rounded-full text-gray-400 hover:text-cyan-500 hover:bg-gray-100"
                                    aria-label="Editar actividad"
                                >
                                    <EditIcon />
                                </button>
                            ) : (
                                <button
                                    onClick={() => onDelete(activity.id)}
                                    className="h-5 w-5 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100"
                                    aria-label="Eliminar actividad"
                                >
                                    <TrashIcon />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const SuggestedActivityItem: React.FC<{
    activity: Omit<Activity, 'id' | 'checked'>;
    onAdd: (activityData: Omit<Activity, 'id' | 'checked'>) => void;
}> = ({ activity, onAdd }) => {
    return (
        <div className="group relative bg-white p-4 rounded-lg border-2 border-dashed border-gray-300">
            <div className="flex items-start space-x-6">
                <div className="w-16 text-right font-semibold text-gray-400 pt-1">
                    {activity.fecha}
                </div>

                <div className="flex-1 border-l border-gray-200 pl-6 relative flex justify-between items-center">
                    <div className="absolute -left-3 top-1 bg-white p-0.5 rounded-full">
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300 bg-white" />
                    </div>

                    <div>
                        <h3 className="font-bold text-lg text-gray-500">{activity.nombre}</h3>
                        <p className="text-gray-400">{activity.descripcion}</p>
                    </div>

                    <button
                        onClick={() => onAdd(activity)}
                        className="text-gray-400 hover:text-cyan-500 hover:bg-cyan-50 rounded-full p-2 transition-colors"
                        aria-label={`Añadir ${activity.nombre}`}
                    >
                        <PlusIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const ActivitiesView: React.FC<ActivitiesViewProps> = ({ activities, onAddActivity, onDeleteActivity, onToggleActivity, onUpdateActivity, onAddActivityClick }) => {
    const sortedActivities = [...activities].sort((a, b) => a.fecha.localeCompare(b.fecha));

    const now = new Date();
    const currentTime = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    const futureSuggestions = SUGGESTED_ACTIVITIES.filter(s => s.fecha > currentTime);

    return (
        <div className="p-8 relative h-full bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Hoy</h1>

            <div className="space-y-4">
                {sortedActivities.map((activity) => (
                    <ActivityItem
                        key={activity.id}
                        activity={activity}
                        onDelete={onDeleteActivity}
                        onToggle={onToggleActivity}
                        onUpdate={onUpdateActivity}
                    />
                ))}
            </div>

            {sortedActivities.length === 0 && futureSuggestions.length > 0 && (
                <div>
                    <p className="text-sm text-gray-500 mb-4 text-center">Aquí tienes algunas sugerencias para hoy:</p>
                    <div className="space-y-4">
                        {futureSuggestions.map((suggestion) => (
                            <SuggestedActivityItem
                                key={suggestion.fecha}
                                activity={suggestion}
                                onAdd={onAddActivity}
                            />
                        ))}
                    </div>
                </div>
            )}

            {sortedActivities.length === 0 && futureSuggestions.length === 0 && (
                <div className="text-center text-gray-500 mt-16">
                    <p className="text-lg">¡Día completado!</p>
                    <p>No hay más actividades sugeridas para hoy.</p>
                </div>
            )}

            <button
                onClick={onAddActivityClick}
                className="fixed bottom-10 right-10 bg-cyan-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-cyan-600 transition-transform transform hover:scale-110"
                aria-label="Añadir actividad"
            >
                <PlusIcon />
            </button>
        </div>
    );
};

export default ActivitiesView;
