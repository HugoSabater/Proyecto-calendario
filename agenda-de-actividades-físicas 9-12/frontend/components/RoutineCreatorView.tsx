import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const RoutineCreatorView: React.FC = () => {
    const [objective, setObjective] = useState('Perder peso');
    const [level, setLevel] = useState('Principiante');
    const [days, setDays] = useState(3);
    const [diet, setDiet] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedPlan, setGeneratedPlan] = useState('');
    const [error, setError] = useState('');

    const handleGenerateRoutine = async () => {
        setIsLoading(true);
        setGeneratedPlan('');
        setError('');

        try {
            const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

            if (!apiKey) {
                setError("Falta la API KEY. Asegúrate de definir VITE_GOOGLE_API_KEY en tu archivo .env");
                return;
            }

            const ai = new GoogleGenerativeAI(apiKey);

            const prompt = `
Actúa como un entrenador personal y nutricionista experto. Basándome en los siguientes datos del usuario, quiero que generes un plan de entrenamiento semanal y un plan de alimentación para un día.

Datos del usuario:

Objetivo Principal: ${objective}

Nivel de Experiencia: ${level}

Días de entrenamiento por semana: ${days}

Preferencias de Dieta: ${diet || 'Ninguna'}

IMPORTANTE:

Devuelve la respuesta exclusivamente en HTML con su propio CSS dentro de una etiqueta <style> al inicio.
El CSS debe ser moderno, minimalista, limpio y profesional.
Todo el contenido debe ir envuelto en un contenedor con clases creadas por ti.
NO uses Markdown.
NO uses texto plano.
NO uses Tailwind ni frameworks.
Solo HTML y CSS puro.
Puedes usar etiquetas como <h2>, <h3>, <p>, <div>, <ul>, <li>.
Las secciones deben estar visualmente separadas con tarjetas o bloques.
Usa colores suaves, bordes redondeados y buen espaciado.
Los títulos deben ser claros y resaltados visualmente.

Estructura del resultado (respétala, pero generada en HTML dentro de contenedores y usando tus clases CSS):

Plan de Entrenamiento Semanal:
Día X:
Ejercicio 1: Nombre, series y repeticiones
Ejercicio 2: Nombre, series y repeticiones
(Repetir según los días)

Plan de Alimentación (1 Día):
Desayuno:
Alimentos

Almuerzo:
Alimentos

Cena:
Alimentos

Snacks:
Alimentos

Recomendaciones adicionales de hidratación y motivación.

`;

            const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

            const result = await model.generateContent(prompt);
            const text = result.response.text();

            if (text) {
                setGeneratedPlan(text);
            } else {
                setError('No se pudo generar un plan. Inténtalo de nuevo.');
            }
        } catch (err) {
            console.error(err);
            setError('Error al contactar con la IA. Inténtalo más tarde.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 bg-gray-50 h-full overflow-y-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Crea tu Rutina Personalizada</h1>
            <p className="text-gray-600 mb-8">Usa la IA para generar un plan de entrenamiento y dieta a tu medida.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Form Section */}
                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Objetivo Principal</label>
                            <select value={objective} onChange={(e) => setObjective(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                                <option>Perder peso</option>
                                <option>Ganar músculo</option>
                                <option>Mantenerse en forma</option>
                                <option>Mejorar resistencia</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nivel de Experiencia</label>
                            <select value={level} onChange={(e) => setLevel(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                                <option>Principiante</option>
                                <option>Intermedio</option>
                                <option>Avanzado</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Días por semana ({days})</label>
                            <input type="range" min="1" max="7" value={days}
                                onChange={(e) => setDays(Number(e.target.value))}
                                className="w-full" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Preferencias de Dieta</label>
                            <input type="text" value={diet} onChange={(e) => setDiet(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                        </div>

                        <button
                            onClick={handleGenerateRoutine}
                            disabled={isLoading}
                            className="w-full bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg"
                        >
                            {isLoading ? 'Generando...' : 'Generar Rutina con IA'}
                        </button>
                    </div>
                </div>

                {/* Result Section */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">

                    {isLoading && (
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="w-16 h-16 border-4 border-t-cyan-500 border-gray-200 rounded-full animate-spin"></div>
                            <p className="mt-4 text-gray-600">Generando tu plan personalizado...</p>
                        </div>
                    )}

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    {!isLoading && !generatedPlan && !error && (
                        <div className="text-center text-gray-500 h-full flex items-center justify-center">
                            <p>Tu plan aparecerá aquí.</p>
                        </div>
                    )}

                    {generatedPlan && (
                        <div
                            className="prose prose-cyan max-w-none"
                            dangerouslySetInnerHTML={{ __html: generatedPlan }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoutineCreatorView;
