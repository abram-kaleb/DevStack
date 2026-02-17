// src/pages/Monitoring/AuxEngine/AuxEngine.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Info as AE1Info } from './AE1/Info';

const AuxEngine: React.FC = () => {
    const navigate = useNavigate();

    const engines = [
        {
            id: 'ae1',
            info: AE1Info,
            hasLayout: true,
            status: 'CONNECTED',
            health: '82%'
        },
        {
            id: 'ae2',
            info: null,
            hasLayout: false,
            status: 'OFFLINE',
            health: '---'
        }
    ];

    return (
        <div className="w-full h-full bg-[#c0c0c0] p-6 flex flex-col items-center justify-center font-mono overflow-hidden">
            <div className="w-full max-w-6xl">
                <div className="bg-[#000080] text-white px-3 py-1.5 text-[11px] font-black flex items-center justify-between mb-4 border-2 border-t-[#ffffff40] border-l-[#ffffff40] border-b-black border-r-black">
                    <div className="flex items-center gap-2">
                        <span>📂</span> ENGINE_REGISTRY_DATABASE
                    </div>
                    <span className="opacity-50 text-[9px]">REG_SYS_V3.4</span>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {engines.map((engine) => (
                        <div
                            key={engine.id}
                            className={`group relative p-1 border-2 transition-all ${engine.hasLayout
                                ? 'bg-[#d4d0c8] border-t-white border-l-white border-b-black border-r-black shadow-md'
                                : 'bg-gray-300 border-[#808080] opacity-70 grayscale'
                                }`}
                        >
                            <div className={`border p-5 flex flex-col gap-4 ${engine.hasLayout ? 'border-black/10' : 'border-transparent'}`}>
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 ${engine.hasLayout ? 'bg-green-500 animate-pulse' : 'bg-red-600'}`} />
                                            <span className="text-[14px] font-black text-[#000080]">{engine.info?.model || 'UNIT_EMPTY'}</span>
                                        </div>
                                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">
                                            {engine.info?.manufacturer || 'NO_DATA'} // {engine.id.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[8px] font-black text-gray-400 uppercase">Health_Index</div>
                                        <div className={`text-[18px] font-black ${engine.hasLayout ? 'text-green-700' : 'text-gray-400'}`}>
                                            {engine.health}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 bg-black/5 p-3 border border-inset text-[9px]">
                                    <div className="flex flex-col border-r border-black/10">
                                        <span className="text-gray-500 font-black text-[7px]">POWER</span>
                                        <span className="font-black truncate">{engine.info?.power_output || '---'}</span>
                                    </div>
                                    <div className="flex flex-col border-r border-black/10 px-1">
                                        <span className="text-gray-500 font-black text-[7px]">SPEED</span>
                                        <span className="font-black truncate">{engine.info?.speed_range || '---'}</span>
                                    </div>
                                    <div className="flex flex-col px-1">
                                        <span className="text-gray-500 font-black text-[7px]">BMEP</span>
                                        <span className="font-black truncate">{engine.info?.bmep || '---'}</span>
                                    </div>
                                    <div className="flex flex-col border-r border-black/10 pt-1">
                                        <span className="text-gray-500 font-black text-[7px]">BORE/STROKE</span>
                                        <span className="font-black truncate">{engine.info ? `${engine.info.bore}/${engine.info.stroke}` : '---'}</span>
                                    </div>
                                    <div className="flex flex-col border-r border-black/10 px-1 pt-1">
                                        <span className="text-gray-500 font-black text-[7px]">SFC</span>
                                        <span className="font-black truncate">{engine.info?.sfc || '---'}</span>
                                    </div>
                                    <div className="flex flex-col px-1 pt-1">
                                        <span className="text-gray-500 font-black text-[7px]">COOLING</span>
                                        <span className="font-black truncate text-[8px]">{engine.info?.cooling?.split('_')[0] || '---'}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between text-[8px] font-black uppercase text-gray-500 px-1">
                                        <span>Initial_State: {engine.status}</span>
                                        <span>App: {engine.info?.application?.replace('_', ' ') || 'NONE'}</span>
                                    </div>
                                    <button
                                        disabled={!engine.hasLayout}
                                        onClick={() => navigate(`/monitoring/auxiliary/${engine.id}/summary`)}
                                        className={`w-full py-2 border-2 text-[10px] font-black transition-all ${engine.hasLayout
                                                ? 'bg-[#d4d0c8] border-t-white border-l-white border-b-black border-r-black hover:bg-white active:border-inset text-[#000080]'
                                                : 'bg-gray-400 border-gray-500 text-gray-200 cursor-not-allowed uppercase'
                                            }`}
                                    >
                                        {engine.hasLayout ? '▶ LOAD_DIAGNOSTIC_MODULE' : 'LAYOUT_FILE_NOT_FOUND'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex justify-center">
                    <button
                        onClick={() => navigate('/monitoring')}
                        className="flex items-center gap-3 px-10 py-2.5 bg-[#d4d0c8] border-2 border-t-white border-l-white border-b-black border-r-black text-[11px] font-black hover:bg-white active:border-inset"
                    >
                        <span>◀</span> RETURN_TO_MONITORING_INDEX
                    </button>
                </div>
            </div>

            <div className="absolute bottom-4 right-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] opacity-40">
                DB_ENTRY_REF: MAN_ES_6L23_30_X2
            </div>
        </div>
    );
};

export default AuxEngine;