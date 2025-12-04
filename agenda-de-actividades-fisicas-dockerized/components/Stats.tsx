
import React from 'react';
import { HealthData } from '../types';
import { HeartOutlineIcon } from './icons/HeartOutlineIcon';
import { LightningBoltIcon } from './icons/LightningBoltIcon';

interface StatsProps {
    healthData: HealthData;
    setHealthData: React.Dispatch<React.SetStateAction<HealthData>>;
}

const Stats: React.FC<StatsProps> = ({ healthData, setHealthData }) => {
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setHealthData(prev => ({
            ...prev,
            [name]: Number(value),
        }));
    };

    const getHeartRateContext = (rate: number): string => {
        if (rate < 60) return "Ritmo cardíaco bajo. ¿Descansando?";
        if (rate <= 100) return "Ritmo cardíaco normal en reposo.";
        if (rate <= 130) return "Ejercicio ligero. ¡Buen trabajo!";
        if (rate <= 150) return "Ejercicio moderado. ¡Sigue así!";
        return "Ejercicio intenso. ¡Estás a tope!";
    };

    const getStepsContext = (steps: number): string => {
        if (steps === 0) return "¡Es hora de moverse!";
        if (steps < 2000) return "Un buen comienzo del día.";
        if (steps < 5000) return "Estás a mitad de camino del objetivo diario.";
        if (steps < 10000) return "¡Objetivo diario casi alcanzado!";
        if (steps < 15000) return "¡Excelente! Muy por encima de la media.";
        return "¡Increíble! Es casi una media maratón.";
    };

    const heartRateProgress = ((healthData.heartRate - 50) / (160 - 50)) * 100;
    const stepsProgress = (healthData.steps / 20000) * 100;

    return (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b pb-2">Estadísticas Vitales</h2>
        
        {/* Heart Rate */}
        <div className="space-y-2">
            <label htmlFor="heartRate" className="text-lg font-semibold text-gray-600 flex items-center">
                <HeartOutlineIcon />
                <span className="ml-2">Ritmo Cardíaco</span>
            </label>
            <div className="flex items-center space-x-4">
            <input
                id="heartRate"
                name="heartRate"
                type="range"
                min="50"
                max="160"
                value={healthData.heartRate}
                onChange={handleSliderChange}
                className="flex-1 custom-slider"
                aria-label="Simulador de ritmo cardíaco"
                style={{
                    '--progress-percent': `${heartRateProgress}%`,
                    '--track-color': '#ec4899',
                } as React.CSSProperties}
            />
            <span className="font-bold text-xl text-pink-500 w-28 text-right">{healthData.heartRate} BPM</span>
        </div>
            <p className="text-sm text-gray-500 text-center pt-1 h-10 flex items-center justify-center">{getHeartRateContext(healthData.heartRate)}</p>
        </div>

        {/* Steps */}
        <div className="space-y-2">
            <label htmlFor="steps" className="text-lg font-semibold text-gray-600 flex items-center">
                <LightningBoltIcon />
                <span className="ml-2">Pasos Realizados</span>
            </label>
            <div className="flex items-center space-x-4">

                    <input
                        id="steps"
                        name="steps"
                        type="range"
                        min="0"
                        max="20000"
                        step="100"
                        value={healthData.steps}
                        onChange={handleSliderChange}
                        className="custom-slider"
                        aria-label="Simulador de pasos realizados"
                        style={{
                            '--progress-percent': `${stepsProgress}%`,
                            '--track-color': '#06b6d4',
                        } as React.CSSProperties}
                    />

                <span className="font-bold text-xl text-cyan-600 w-28 text-right">{new Intl.NumberFormat('es-ES').format(healthData.steps)}</span>
            </div>
            <p className="text-sm text-gray-500 text-center pt-1 h-10 flex items-center justify-center">{getStepsContext(healthData.steps)}</p>
        </div>
        
        <p className="text-sm text-gray-500 pt-4 text-center border-t mt-4">
            Mueve los deslizadores para simular tus datos de salud y ver cómo reacciona tu personaje.
        </p>
    </div>
);
};

export default Stats;