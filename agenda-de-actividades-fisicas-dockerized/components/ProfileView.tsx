import React, { useState } from 'react';
import { HealthData } from '../types';
import Character from './Character';
import Stats from './Stats';

const ProfileView: React.FC = () => {
    const [healthData, setHealthData] = useState<HealthData>({
        heartRate: 72,
        steps: 1250,
    });

    return (
        <div className="p-8 h-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Tu Progreso de Salud</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex justify-center items-center">
                    <Character healthData={healthData} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <Stats healthData={healthData} setHealthData={setHealthData} />
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
