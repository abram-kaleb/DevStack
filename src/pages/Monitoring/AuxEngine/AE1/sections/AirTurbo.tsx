// src/pages/Overview/sections/AirTurbo.tsx
import React from 'react';

const AirTurbo: React.FC = () => {
    return (
        <div className="flex flex-col h-full gap-1 animate-in fade-in duration-500 font-mono">

            {/* A. TURBO / AIR KPIs (30%) - Standardized 4-column grid */}
            <div className="h-[30%] grid grid-cols-4 gap-1">
                <AirCard label="TURBO_SPEED" value="14250" unit="RPM" trend="STABLE" alertThreshold={18000} />
                <AirCard label="BOOST_PRESS" value="2.15" unit="bar" trend="UP" />
                <AirCard label="INTAKE_AIR_T" value="42.5" unit="°C" trend="STABLE" warningThreshold={55} />
                <AirCard label="AIR_FILTER_DP" value="250" unit="mmWC" trend="UP" warningThreshold={450} />
                <AirCard label="WASTEGATE_POS" value="12.5" unit="%" trend="DOWN" />
                <AirCard label="CHARGE_AIR_DEW" value="32.1" unit="°C" trend="STABLE" />
                <AirCard label="SCAVENGE_P" value="2.24" unit="bar" trend="UP" />
                <AirCard label="EXH_GAS_IN_T" value="415" unit="°C" trend="STABLE" />
            </div>

            {/* B. TURBO & INTAKE MIMIC (45%) */}
            <div className="h-[45%] border-2 border-inset bg-[#eeeeee] flex relative overflow-hidden">
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                    <span className="text-[10px] font-black text-[#000080]">AIR_INTAKE_EXHAUST_MIMIC</span>
                    <div className="flex gap-2 text-[8px] font-bold">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500" /> CHARGE_AIR</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 bg-orange-600" /> EXHAUST_GAS</span>
                    </div>
                </div>

                <div className="w-full h-full flex items-center justify-center p-2">
                    <div className="w-[95%] h-[85%] border-2 border-dashed border-[#c0c0c0] flex items-center justify-around relative bg-white/30">
                        {/* Compressor Side */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 border-4 border-black rounded-full bg-white flex items-center justify-center relative shadow-lg">
                                <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin duration-[3000ms]" />
                                <span className="text-[9px] font-black">COMP</span>
                            </div>
                            <span className="text-[8px] font-bold bg-[#808080] text-white px-1 uppercase">Ambient_In</span>
                        </div>

                        {/* Intercooler */}
                        <div className="w-16 h-24 border-2 border-black bg-blue-50 flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
                            <div className="absolute inset-0 opacity-10">
                                {[...Array(6)].map((_, i) => <div key={i} className="h-[2px] bg-blue-800 my-2" />)}
                            </div>
                            <span className="text-[8px] font-black text-center z-10">CHARGE_AIR<br />COOLER</span>
                            <div className="absolute bottom-1 text-[8px] font-bold text-blue-600">42.5°C</div>
                        </div>

                        {/* Engine Block */}
                        <div className="w-36 h-28 border-2 border-black bg-[#d4d0c8] flex flex-col items-center justify-center relative shadow-md">
                            <span className="text-[9px] font-black mb-2 uppercase tracking-tighter">6L23/30_BLOCK</span>
                            <div className="flex gap-1">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="w-3 h-8 border border-gray-600 bg-white/50 flex items-end">
                                        <div className="w-full bg-blue-400" style={{ height: '60%' }} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Turbine Side */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 border-4 border-black rounded-full bg-gray-200 flex items-center justify-center relative shadow-lg">
                                <div className="absolute inset-0 border-t-4 border-orange-600 rounded-full animate-spin duration-[2000ms]" />
                                <span className="text-[9px] font-black">TURB</span>
                            </div>
                            <span className="text-[8px] font-bold bg-orange-600 text-white px-1 uppercase">Exhaust_Out</span>
                        </div>

                        {/* Visual Flow Indicators */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                            <path d="M 80 140 L 140 140" stroke="blue" strokeWidth="2" strokeDasharray="4" fill="none" />
                            <path d="M 210 140 L 260 140" stroke="blue" strokeWidth="2" strokeDasharray="4" fill="none" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* C. MINI TRENDS (25%) */}
            <div className="flex-1 flex gap-1">
                <div className="flex-[2] border-2 border-inset bg-[#eeeeee] p-2 flex flex-col">
                    <span className="text-[9px] font-bold text-[#808080] mb-2 uppercase">Turbo_Response_Dynamics</span>
                    <div className="flex-1 grid grid-cols-3 gap-2">
                        <AirSpark label="BOOST_STABILITY" data={[60, 62, 65, 68, 70, 71, 72]} color="stroke-blue-600" />
                        <AirSpark label="TURBO_LOAD" data={[40, 45, 50, 55, 60, 65, 70]} color="stroke-orange-600" />
                        <AirSpark label="AIR_DENSITY" data={[90, 89, 90, 91, 90, 89, 90]} color="stroke-green-600" />
                    </div>
                </div>

                <div className="flex-1 border-2 border-inset bg-[#eeeeee] p-2 flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-[#808080] uppercase">Surge_Margin_Safety</span>
                        <div className="mt-1 h-4 w-full bg-gray-300 border border-[#808080] relative overflow-hidden">
                            <div className="h-full bg-green-500 shadow-[inset_0_0_8px_rgba(0,0,0,0.2)]" style={{ width: '82%' }} />
                            <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black">82% SAFE</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-black border-t border-[#d4d0c8] pt-2">
                        <span className="text-[#808080]">EFFICIENCY:</span>
                        <span className="text-[#000080]">74.5%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AirCard = ({ label, value, unit, trend, alertThreshold, warningThreshold }: any) => {
    const valNum = parseFloat(value);
    const isAlert = alertThreshold && valNum > alertThreshold;
    const isWarning = warningThreshold && valNum > warningThreshold;

    return (
        <div className={`border-2 border-inset px-2 py-1 flex flex-col justify-between transition-colors ${isAlert ? 'bg-red-50' : isWarning ? 'bg-yellow-50' : 'bg-[#eeeeee]'
            }`}>
            <span className="text-[9px] font-black text-[#404040] border-b border-[#d4d0c8] pb-0.5 uppercase truncate">{label}</span>
            <div className="flex items-baseline justify-between mt-1">
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

const AirSpark = ({ label, data, color }: { label: string, data: number[], color: string }) => (
    <div className="flex flex-col gap-1 bg-white border border-[#c0c0c0] p-1 shadow-inner">
        <span className="text-[7px] font-black text-[#808080] uppercase truncate">{label}</span>
        <div className="h-6 w-full">
            <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                <polyline fill="none" className={color} strokeWidth="4" points={data.map((val, i) => `${(i / (data.length - 1)) * 100},${50 - (val % 50)}`).join(' ')} />
            </svg>
        </div>
    </div>
);

export default AirTurbo;