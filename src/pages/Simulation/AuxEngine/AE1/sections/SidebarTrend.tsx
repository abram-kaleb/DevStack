// src/pages/TrendAnalysis/components/SidebarTrend.tsx
import React, { useState } from 'react';

interface SidebarTrendProps {
    onParameterToggle: (paramId: string) => void;
    selectedParams: string[];
    onTimeRangeChange: (range: string) => void;
}

const SidebarTrend: React.FC<SidebarTrendProps> = ({
    onParameterToggle,
    selectedParams,
    onTimeRangeChange
}) => {
    const [expandedGroup, setExpandedGroup] = useState<string | null>('CORE');

    const subsystems = [
        {
            id: 'CORE',
            label: '01_ENGINE_CORE',
            params: [
                { id: 'RPM', name: 'Engine Speed' },
                { id: 'LOAD', name: 'Engine Load' },
                { id: 'TORQUE', name: 'Torque Output' },
                { id: 'EXH_AVG', name: 'Exh. Temp Avg' }
            ]
        },
        {
            id: 'LUBE',
            label: '02_LUBRICATION',
            params: [
                { id: 'OIL_PRES', name: 'Oil Pressure' },
                { id: 'OIL_TEMP', name: 'Oil Temperature' },
                { id: 'FILTER_DP', name: 'Filter Delta P' }
            ]
        },
        {
            id: 'FUEL',
            label: '03_FUEL_SYSTEM',
            params: [
                { id: 'CONS_RATE', name: 'Fuel Consumption' },
                { id: 'FUEL_TEMP', name: 'Fuel Inlet Temp' },
                { id: 'INJ_PRES', name: 'Injection Press' }
            ]
        },
        {
            id: 'AIR',
            label: '04_AIR_TURBO',
            params: [
                { id: 'BOOST_P', name: 'Boost Pressure' },
                { id: 'TC_SPEED', name: 'Turbo Speed' },
                { id: 'INTAKE_T', name: 'Intake Air Temp' }
            ]
        }
    ];

    return (
        <aside className="w-56 h-full border-r-2 border-[#808080] bg-[#d4d0c8] flex flex-col font-mono text-black select-none overflow-hidden shrink-0">
            {/* 1. HEADER EXPLORER */}
            <div className="bg-[#000080] text-white px-2 py-1 text-[10px] font-bold flex justify-between items-center">
                <span>TREND_EXPLORER</span>
                <span className="opacity-50 text-[8px]">V3.0</span>
            </div>

            {/* 2. PARAMETER ACCORDION */}
            <div className="flex-1 overflow-y-auto p-1 space-y-1 bg-[#c0c0c0] custom-scrollbar shadow-inner">
                {subsystems.map((sub) => (
                    <div key={sub.id} className="border border-white/40 shadow-sm">
                        <button
                            onClick={() => setExpandedGroup(expandedGroup === sub.id ? null : sub.id)}
                            className={`w-full flex items-center px-2 py-1.5 text-[10px] font-black transition-colors ${expandedGroup === sub.id
                                ? 'bg-[#000080] text-white'
                                : 'bg-[#d4d0c8] text-black border-t-white border-l-white border-b-[#808080] border-r-[#808080] border-2'
                                }`}
                        >
                            <span className="mr-2 w-3 text-center">{expandedGroup === sub.id ? '−' : '+'}</span>
                            {sub.label}
                        </button>

                        {expandedGroup === sub.id && (
                            <div className="bg-[#eeeeee] py-1 flex flex-col shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
                                {sub.params.map((param) => {
                                    const isSelected = selectedParams.includes(param.id);
                                    return (
                                        <div
                                            key={param.id}
                                            onClick={() => onParameterToggle(param.id)}
                                            className={`group flex items-center gap-2 px-3 py-1 cursor-pointer transition-all hover:bg-[#000080] hover:text-white ${isSelected ? 'bg-blue-100 text-[#000080]' : 'text-[#404040]'
                                                }`}
                                        >
                                            <div className={`w-3 h-3 border border-black flex items-center justify-center shrink-0 ${isSelected ? 'bg-[#000080]' : 'bg-white'
                                                }`}>
                                                {isSelected && <div className="w-1.5 h-1.5 bg-white" />}
                                            </div>
                                            <div className="flex flex-col leading-tight">
                                                <span className="text-[10px] font-black truncate">{param.id}</span>
                                                <span className="text-[8px] font-bold opacity-70 truncate uppercase">{param.name}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* 3. TIME WINDOW SELECTOR */}
            <div className="p-2 border-t-2 border-[#808080] bg-[#d4d0c8] space-y-2">
                <div className="flex justify-between items-center border-b border-[#808080] pb-1">
                    <span className="text-[9px] font-black text-[#404040]">TIME_WINDOW</span>
                    <span className="text-[8px] text-blue-800 font-bold bg-blue-100 px-1 border border-blue-300">LIVE</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                    {['1H', '12H', '24H', '7D', '30D', 'YTD'].map((range) => (
                        <button
                            key={range}
                            onClick={() => onTimeRangeChange(range)}
                            className="py-1 text-[9px] font-black bg-[#d4d0c8] border-2 border-t-white border-l-white border-b-black border-r-black active:shadow-[inset_2px_2px_0px_#000] hover:bg-white transition-colors"
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            {/* 4. ANALYSIS OPTIONS */}
            <div className="p-2 border-t-2 border-[#808080] bg-[#c0c0c0] space-y-1">
                <span className="text-[9px] font-black text-[#404040] block mb-1">OVERLAY_MODES</span>
                <div className="space-y-1">
                    <label className="flex items-center gap-2 text-[9px] font-black cursor-pointer">
                        <input type="checkbox" className="w-3 h-3 accent-black" defaultChecked /> BASELINE_REF
                    </label>
                    <label className="flex items-center gap-2 text-[9px] font-black text-red-700 cursor-pointer">
                        <input type="checkbox" className="w-3 h-3 accent-red-700" defaultChecked /> ALARM_LIMITS
                    </label>
                </div>
            </div>

            {/* 5. ACTIONS */}
            <div className="p-1.5 bg-[#808080] flex gap-1">
                <button className="flex-1 py-1.5 bg-[#008000] text-white text-[9px] font-black border-2 border-t-[#ffffff80] border-l-[#ffffff80] border-b-black border-r-black hover:brightness-110 active:border-inset">
                    EXPORT_CSV
                </button>
                <button className="flex-1 py-1.5 bg-[#d4d0c8] text-black text-[9px] font-black border-2 border-t-white border-l-white border-b-black border-r-black hover:bg-white active:border-inset">
                    PRINT
                </button>
            </div>
        </aside>
    );
};

export default SidebarTrend;