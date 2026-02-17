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
        { id: 'CORE', label: '01_ENGINE_CORE', params: ['RPM', 'LOAD', 'TORQUE', 'EXH_AVG'] },
        { id: 'LUBE', label: '02_LUBRICATION', params: ['OIL_PRES', 'OIL_TEMP', 'FILTER_DP'] },
        { id: 'COOL', label: '03_COOLING', params: ['JW_TEMP', 'AC_TEMP', 'PUMP_PRES'] },
        { id: 'FUEL', label: '04_FUEL_SYSTEM', params: ['CONS_RATE', 'FUEL_TEMP', 'INJ_PRES'] },
        { id: 'AIR', label: '05_AIR_TURBO', params: ['BOOST_P', 'TC_SPEED', 'INTAKE_T'] },
    ];

    return (
        <aside className="w-56 h-full border-r-2 border-[#808080] bg-[#d4d0c8] flex flex-col font-mono text-black select-none overflow-hidden">
            {/* 1. SUBSYSTEM ACCORDION */}
            <div className="bg-[#000080] text-white px-2 py-1 text-[10px] font-bold">
                PARAMETER_EXPLORER
            </div>
            <div className="flex-1 overflow-y-auto p-1 space-y-1 bg-[#c0c0c0]">
                {subsystems.map((sub) => (
                    <div key={sub.id} className="border border-white/50">
                        <button
                            onClick={() => setExpandedGroup(expandedGroup === sub.id ? null : sub.id)}
                            className={`w-full flex items-center px-2 py-1.5 text-[11px] font-black border-b ${expandedGroup === sub.id ? 'bg-[#808080] text-white' : 'bg-[#d4d0c8] text-black'
                                }`}
                        >
                            <span className="mr-2">{expandedGroup === sub.id ? '▼' : '▶'}</span>
                            {sub.label}
                        </button>

                        {expandedGroup === sub.id && (
                            <div className="bg-[#eeeeee] p-1 flex flex-col gap-1 shadow-inner">
                                {sub.params.map((param) => (
                                    <label
                                        key={param}
                                        className="flex items-center gap-2 px-2 py-1 hover:bg-[#000080]/10 cursor-pointer text-[10px] font-bold border border-transparent active:border-black"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedParams.includes(param)}
                                            onChange={() => onParameterToggle(param)}
                                            className="w-3 h-3 accent-[#000080]"
                                        />
                                        {param}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* 2. TIME RANGE SELECTOR */}
            <div className="p-2 border-t-2 border-[#808080] bg-[#d4d0c8] space-y-2">
                <span className="text-[9px] font-black text-[#404040]">TIME_WINDOW</span>
                <div className="grid grid-cols-3 gap-1">
                    {['1H', '12H', '24H', '7D', '30D', 'CUST'].map((range) => (
                        <button
                            key={range}
                            onClick={() => onTimeRangeChange(range)}
                            className="py-1 text-[9px] font-black border-2 border-t-white border-l-white border-b-black border-r-black active:border-inset hover:bg-[#eeeeee]"
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            {/* 3. TREND OPTIONS */}
            <div className="p-2 border-t-2 border-[#808080] bg-[#c0c0c0] space-y-1">
                <label className="flex items-center gap-2 text-[9px] font-black">
                    <input type="checkbox" className="w-3 h-3" defaultChecked /> BASELINE_REF
                </label>
                <label className="flex items-center gap-2 text-[9px] font-black text-red-700">
                    <input type="checkbox" className="w-3 h-3" defaultChecked /> SHOW_ALERTS
                </label>
            </div>

            {/* 4. QUICK ACCESS */}
            <div className="p-1.5 bg-[#808080]">
                <button className="w-full py-1 bg-[#008000] text-white text-[10px] font-black border-2 border-t-[#ffffff80] border-l-[#ffffff80] border-b-black border-r-black hover:brightness-110 active:shadow-inner">
                    EXPORT_CSV_DATA
                </button>
            </div>
        </aside>
    );
};

export default SidebarTrend;