// src/pages/Overview/sections/Lubrication.tsx
import React from 'react';

const Lubrication: React.FC = () => {
    return (
        <div className="flex flex-col h-full gap-1 animate-in fade-in duration-500 font-mono">

            {/* A. CRITICAL OIL KPIs (30%) - Adjusted padding to prevent overflow */}
            <div className="h-[30%] grid grid-cols-4 gap-1">
                <LubeCard label="OIL_PRESSURE" value="4.8" unit="bar" trend="DOWN" alertThreshold={3.5} />
                <LubeCard label="OIL_TEMP_INLET" value="84.2" unit="°C" trend="UP" alertThreshold={90} />
                <LubeCard label="OIL_FLOW_RATE" value="42.5" unit="m³/h" trend="STABLE" />
                <LubeCard label="FILTER_DIFF_P" value="0.45" unit="bar" trend="UP" warningThreshold={1.5} />
                <LubeCard label="SUMP_LEVEL" value="78" unit="%" trend="STABLE" />
                <LubeCard label="METAL_PART" value="LOW" unit="PPM" trend="STABLE" />
                <LubeCard label="VISCOSITY" value="112" unit="cSt" trend="STABLE" />
                <LubeCard label="HEALTH_SCORE" value="72" unit="%" trend="DOWN" />
            </div>

            {/* B. OIL CIRCUIT MIMIC (45%) */}
            <div className="h-[45%] border-2 border-inset bg-[#eeeeee] flex relative overflow-hidden">
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                    <span className="text-[10px] font-black text-[#000080]">LUBE_OIL_SCHEMATIC</span>
                    <div className="flex gap-2 text-[8px] font-bold">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500" /> NORMAL_FLOW</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-600" /> FAULT_LOC</span>
                    </div>
                </div>

                <div className="w-full h-full flex items-center justify-center p-2">
                    <div className="w-[95%] h-[85%] border-2 border-dashed border-[#c0c0c0] flex items-center justify-around relative">
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-16 h-12 border-2 border-black bg-gray-300 flex items-center justify-center text-[8px] font-bold shadow-sm">SUMP_TANK</div>
                        </div>

                        <div className="w-12 h-[2px] bg-blue-500" />

                        <div className="flex flex-col items-center gap-1">
                            <div className="w-10 h-10 rounded-full border-2 border-black bg-green-400 flex items-center justify-center text-[10px] font-black shadow-md">P1</div>
                            <span className="text-[8px] font-bold">LUBE_PUMP</span>
                        </div>

                        <div className="w-12 h-[2px] bg-blue-500" />

                        <div className="flex flex-col items-center gap-1">
                            <div className="w-12 h-16 border-2 border-black bg-white flex flex-col items-center justify-center gap-1 shadow-sm">
                                <div className="w-8 h-[1px] bg-black" />
                                <span className="text-[7px] font-bold">FILTER</span>
                                <div className="w-8 h-[1px] bg-black" />
                            </div>
                        </div>

                        <div className="w-12 h-[2px] bg-blue-500" />

                        <div className="w-32 h-24 border-2 border-black bg-[#d4d0c8] flex flex-col items-center justify-center gap-2 shadow-md">
                            <span className="text-[9px] font-black text-center leading-tight">MAIN_BEARINGS<br />& CAMSHAFT</span>
                            <div className="flex gap-1">
                                {[...Array(4)].map((_, i) => <div key={i} className="w-2 h-4 border border-gray-500 bg-blue-200" />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* C. OIL HEALTH & TRENDS (25%) */}
            <div className="flex-1 flex gap-1">
                <div className="flex-[2] border-2 border-inset bg-[#eeeeee] p-2 flex flex-col">
                    <span className="text-[9px] font-bold text-[#808080] mb-2 uppercase">Condition_Monitoring_Matrix</span>
                    <div className="flex-1 grid grid-cols-3 gap-2">
                        <LubeSpark label="PRESS_STAB" data={[45, 46, 44, 45, 42, 40, 38]} color="stroke-blue-600" />
                        <LubeSpark label="THERMAL_L" data={[20, 22, 25, 30, 35, 38, 40]} color="stroke-red-600" />
                        <LubeSpark label="FILTER_CL" data={[10, 10, 11, 12, 12, 13, 15]} color="stroke-orange-500" />
                    </div>
                </div>

                <div className="flex-1 border-2 border-inset bg-[#eeeeee] p-2 flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-[#808080] uppercase">Oil_Health_Analysis</span>
                        <div className="mt-1 h-4 w-full bg-gray-300 border border-[#808080] relative overflow-hidden">
                            <div className="h-full bg-green-500 shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]" style={{ width: '72%' }} />
                            <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black">72% - SERVICEABLE</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[8px] font-bold border-t border-[#d4d0c8] pt-2">
                        <div className="flex flex-col">
                            <span className="text-[#808080]">NEXT_SMPL:</span>
                            <span className="text-[#000080]">240 HRS</span>
                        </div>
                        <div className="flex flex-col text-right">
                            <span className="text-[#808080]">REM_LIFE:</span>
                            <span className="text-green-700">1,240 HRS</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LubeCard = ({ label, value, unit, trend, alertThreshold, warningThreshold }: any) => {
    const isAlert = alertThreshold && (trend === 'DOWN' ? parseFloat(value) < alertThreshold : parseFloat(value) > alertThreshold);
    const isWarning = warningThreshold && parseFloat(value) > warningThreshold;

    return (
        <div className={`border-2 border-inset px-2 py-1 flex flex-col justify-between transition-colors ${isAlert ? 'bg-red-50' : isWarning ? 'bg-yellow-50' : 'bg-[#eeeeee]'
            }`}>
            <span className="text-[9px] font-black text-[#404040] border-b border-[#d4d0c8] pb-0.5 uppercase truncate">{label}</span>
            <div className="flex items-baseline justify-between">
                <span className={`text-2xl font-black tracking-tighter ${isAlert ? 'text-red-600 animate-pulse' : isWarning ? 'text-orange-600' : 'text-[#000080]'
                    }`}>
                    {value}
                </span>
                <div className="flex flex-col items-end leading-none">
                    <span className="text-[8px] font-bold text-[#808080] uppercase">{unit}</span>
                    <span className={`text-[12px] ${trend === 'UP' ? 'text-red-500' : trend === 'DOWN' ? 'text-blue-500' : 'text-gray-400'}`}>
                        {trend === 'UP' ? '▲' : trend === 'DOWN' ? '▼' : '━'}
                    </span>
                </div>
            </div>
        </div>
    );
};

const LubeSpark = ({ label, data, color }: { label: string, data: number[], color: string }) => (
    <div className="flex flex-col gap-1 bg-white border border-[#c0c0c0] p-1 shadow-inner">
        <span className="text-[7px] font-black text-[#808080] uppercase truncate">{label}</span>
        <div className="h-6 w-full">
            <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                <polyline fill="none" className={color} strokeWidth="4" points={data.map((val, i) => `${(i / (data.length - 1)) * 100},${50 - val}`).join(' ')} />
            </svg>
        </div>
    </div>
);

export default Lubrication;