import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const lines = content.split('\n');
    return (
        <div className="prose prose-cyan max-w-none">
            {lines.map((line, index) => {
                if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-lg font-semibold mt-4 mb-2 text-slate-700">{line.substring(4)}</h3>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-bold mt-6 mb-3 border-b pb-2 text-cyan-600">{line.substring(3)}</h2>;
                }
                if (line.startsWith('- **')) {
                    const boldEnd = line.indexOf('**', 4);
                    const boldText = line.substring(4, boldEnd);
                    const restText = line.substring(boldEnd + 2);
                    return <p key={index} className="my-1"><strong className="font-semibold text-gray-800">{boldText}</strong>{restText}</p>;
                }
                if (line.startsWith('- ')) {
                    return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
                }
                return <p key={index} className="my-1">{line}</p>;
            })}
        </div>
    );
};

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
            // ✔ API key desde Vite (no process.env)
            const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

            if (!apiKey) {
                setError("Falta la API KEY. Asegúrate de definir VITE_GOOGLE_API_KEY en tu archivo .env");
                return;
            }

            // ✔ Clase correcta
            const ai = new GoogleGenerativeAI(apiKey);

            const prompt = `
Actúa como un entrenador personal y nutricionista experto. Basándote en los siguientes datos de un usuario, crea un plan de entrenamiento semanal y un plan de alimentación detallado para un día.

Datos del usuario:
- Objetivo Principal: ${objective}
- Nivel de Experiencia: ${level}
- Días de entrenamiento por semana: ${days}
- Preferencias/Restricciones dietéticas: ${diet || 'Ninguna'}

Estructura la respuesta en Markdown.

## 🏋️‍♂️ Plan de Entrenamiento Semanal

### Día X
- **Ejercicio:** Nombre, series y repeticiones.

(Repite según los días)

## 🥗 Plan de Alimentación (1 Día)

### Desayuno
- Alimento 1

### Almuerzo
### Cena
### Snacks

Añade recomendaciones de hidratación y motivación.
            `;

            // ✔ Sintaxis correcta
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
                            <select value={objective} onChange={(e) => setObjective(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                                <option>Perder peso</option>
                                <option>Ganar músculo</option>
                                <option>Mantenerse en forma</option>
                                <option>Mejorar resistencia</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nivel de Experiencia</label>
                            <select value={level} onChange={(e) => setLevel(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                                <option>Principiante</option>
                                <option>Intermedio</option>
                                <option>Avanzado</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Días por semana ({days})</label>
                            <input type="range" min="1" max="7" value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Preferencias de Dieta</label>
                            <input type="text" value={diet} onChange={(e) => setDiet(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
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

                    {generatedPlan && <MarkdownRenderer content={generatedPlan} />}
                </div>
            </div>
        </div>
    );
};

export default RoutineCreatorView;
