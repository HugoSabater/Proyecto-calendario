
import React, { useState } from 'react';
import Character from './Character';
import Stats from './Stats';
import { HealthData } from '../types';

const ProfileView: React.FC = () => {
    const [healthData, setHealthData] = useState<HealthData>({
        heartRate: 80,
        steps: 5230,
    });

    return (
        <div className="p-8 h-full bg-gray-50 overflow-y-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Tu Perfil Físico</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <Stats healthData={healthData} setHealthData={setHealthData} />
                </div>
                <div className="flex justify-center items-center h-full">
                    <Character healthData={healthData} />
                </div>
            </div>
        </div>
    );
};

export default ProfileView;