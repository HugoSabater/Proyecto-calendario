import React from 'react';

const userProfile = {
    name: 'Maria',
    lastName: 'Tomillos Garcia',
    dob: '15/02/2001',
    height: '158 cm',
    weight: '50 Kg',
    gender: 'Mujer',
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex justify-between items-center py-5 px-6">
        <p className="text-xl text-black">{label}</p>
        <p className="text-xl text-black">{value}</p>
    </div>
);


const SettingsView: React.FC = () => {
    return (
        <div className="bg-slate-100 h-full">
            <div className="bg-white text-center py-8">
                <div className="h-24" /> {/* Spacer for photo */}
                <h1 className="text-4xl font-bold">María</h1>
                <p className="text-xl text-gray-600">Tomillos García</p>
                <button className="text-purple-700 font-semibold mt-4 text-sm">
                    Editar foto
                </button>
            </div>

            <div className="bg-white mt-px">
                <div className="divide-y divide-gray-200">
                    <InfoRow label="Nombre" value={userProfile.name} />
                    <InfoRow label="Apellidos" value={userProfile.lastName} />
                    <div className="flex justify-between items-center py-5 px-6">
                        <p className="text-xl text-black">Fecha de<br/>nacimiento</p>
                        <p className="text-xl text-black">{userProfile.dob}</p>
                    </div>
                    <InfoRow label="Altura" value={userProfile.height} />
                    <InfoRow label="Peso" value={userProfile.weight} />
                    <InfoRow label="Género" value={userProfile.gender} />
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
