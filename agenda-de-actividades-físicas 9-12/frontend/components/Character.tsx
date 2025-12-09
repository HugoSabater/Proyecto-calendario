import React from 'react';
import { HealthData } from '../types';
import HumanModel from './HumanModel'; // Importa el componente

interface CharacterProps {
    healthData: HealthData;
}

const Character: React.FC<CharacterProps> = ({ healthData }) => {
    const { steps, heartRate } = healthData;

    const getStatus = (): { text: string; emoji: string; filter: string } => {
        if (steps > 15000) {
            return { text: 'Agotado', emoji: '😴', filter: 'none' };
        }
        if (heartRate > 120) {
             return { text: '¡Entrenando!', emoji: '🔥', filter: 'saturate(1.5) hue-rotate(-20deg)' };
        }
        if (steps > 8000) {
            return { text: '¡Activo!', emoji: '🏃‍♀️', filter: 'saturate(1.2)' };
        }
        return { text: 'Relajado', emoji: '😊', filter: 'none' };
    };

    const status = getStatus();

    return (
        <div className="relative">
            <div className="absolute -top-4 -right-4 bg-cyan-500 text-white text-lg font-bold py-2 px-4 rounded-full shadow-lg transform rotate-6 transition-all duration-300 z-10">
                {status.emoji} {status.text}
            </div>
            <HumanModel
                className="w-64 h-auto object-contain transition-all duration-500"
                style={{ filter: status.filter }}
            />
        </div>
    );
};

export default Character;