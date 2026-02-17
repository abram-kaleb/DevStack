// src/pages/Monitoring/Monitoring.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Monitoring: React.FC = () => {
    const navigate = useNavigate();

    const units = [
        { id: 'main-engine', name: 'MAIN_ENGINE_SYSTEM', icon: '🛳️', enabled: false, desc: 'PRIMARY_PROPULSION' },
        { id: 'auxiliary', name: 'AUXILIARY_GENSET', icon: '⚙️', enabled: true, desc: 'POWER_GENERATION' },
        { id: 'other', name: 'AUX_SYSTEMS', icon: '🔧', enabled: false, desc: 'SUPPORT_EQUIPMENT' }
    ];

    return (
        <div className="w-full h-full bg-[#c0c0c0] p-6 flex flex-col items-center justify-center font-mono overflow-hidden">
            <div className="w-full max-w-5xl">
                <div className="bg-[#000080] text-white px-3 py-1.5 text-[11px] font-black flex items-center justify-between mb-4 border-2 border-t-[#ffffff40] border-l-[#ffffff40] border-b-black border-r-black">
                    <div className="flex items-center gap-2">
                        <span>📡</span> SELECT_HARDWARE_INTERFACE_FOR_DIAGNOSTICS
                    </div>
                    <span className="opacity-50 text-[9px]">V3.4.0_PROD</span>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {units.map((unit) => (
                        <button
                            key={unit.id}
                            disabled={!unit.enabled}
                            onClick={() => navigate(`/monitoring/${unit.id}`)}
                            className={`group relative p-1 border-2 transition-all ${unit.enabled
                                ? 'bg-[#d4d0c8] border-t-white border-l-white border-b-black border-r-black hover:bg-[#ffffff] active:border-inset shadow-md'
                                : 'bg-gray-300 border-[#808080] opacity-60 cursor-not-allowed'
                                }`}
                        >
                            <div className={`border p-8 flex flex-col items-center gap-4 ${unit.enabled ? 'border-black/10' : 'border-transparent'}`}>
                                <div className={`text-6xl transition-transform duration-300 ${unit.enabled ? 'group-hover:scale-110 group-hover:rotate-3' : 'grayscale'}`}>
                                    {unit.icon}
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <span className={`text-[13px] font-black tracking-tighter ${unit.enabled ? 'text-[#000080]' : 'text-gray-500'}`}>
                                        {unit.name}
                                    </span>
                                    <span className="text-[9px] font-bold text-gray-500 uppercase italic">
                                        {unit.desc}
                                    </span>
                                </div>

                                {unit.enabled ? (
                                    <div className="mt-4 px-4 py-1.5 bg-[#808080] text-white text-[10px] font-black group-hover:bg-[#000080] shadow-[1px_1px_0px_white]">
                                        CONNECT_INTERFACE
                                    </div>
                                ) : (
                                    <div className="mt-4 px-4 py-1.5 bg-gray-400 text-gray-200 text-[10px] font-black">
                                        OFFLINE
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-12 flex justify-center">
                    <button
                        onClick={() => navigate('/home')}
                        className="flex items-center gap-2 px-8 py-2.5 bg-[#d4d0c8] border-2 border-t-white border-l-white border-b-black border-r-black text-[11px] font-black hover:bg-white active:border-inset"
                    >
                        <span>◀</span> RETURN_TO_SYSTEM_LAUNCHER
                    </button>
                </div>
            </div>

            <div className="absolute bottom-4 right-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] opacity-40">
                System_Ref: ACKERMAN_MON_SRV_01
            </div>
        </div>
    );
};

export default Monitoring;