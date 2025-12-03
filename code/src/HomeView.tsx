import React, { useState, useEffect } from 'react';
import { UserProfile } from './types'; // Fixed import path

interface HomeViewProps {
    profile: UserProfile;
    onSave: (profile: UserProfile) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ profile, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UserProfile>(profile);
    const [imgSrc, setImgSrc] = useState(profile.imageUrl);

    useEffect(() => {
        setFormData(profile);
        setImgSrc(profile.imageUrl);
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'age' || name === 'weight' || name === 'height' ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        setIsEditing(false);
    };

    const handleImageError = () => {
        // Fallback to the human model asset with gray background (simulated by container bg) if image fails
        setImgSrc('/assets/human-model.svg');
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Información del Usuario</h1>

            <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Image Section */}
                    <div className="w-full md:w-1/3 flex flex-col items-center">
                        <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-300 border-4 border-gray-200 relative">
                            <img
                                src={imgSrc}
                                alt="Profile"
                                className="w-full h-full object-cover"
                                onError={handleImageError}
                            />
                        </div>
                    </div>

                    {/* Info/Form Section */}
                    <div className="w-full md:w-2/3">
                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Género</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                    >
                                        <option value="male">Masculino</option>
                                        <option value="female">Femenino</option>
                                        <option value="other">Otro</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Edad</label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Peso (kg)</label>
                                        <input
                                            type="number"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Altura (cm)</label>
                                    <input
                                        type="number"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">URL de Imagen</label>
                                    <input
                                        type="text"
                                        name="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                    />
                                </div>
                                <div className="flex justify-end space-x-3 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                                    <p className="text-sm text-gray-500">Perfil de Usuario</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Género</p>
                                        <p className="text-lg text-gray-900 capitalize">{profile.gender === 'male' ? 'Masculino' : profile.gender === 'female' ? 'Femenino' : 'Otro'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Edad</p>
                                        <p className="text-lg text-gray-900">{profile.age} años</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Peso</p>
                                        <p className="text-lg text-gray-900">{profile.weight} kg</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Altura</p>
                                        <p className="text-lg text-gray-900">{profile.height} cm</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Editar Perfil
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeView;