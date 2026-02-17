// src/pages/Overview/sections/CoolingSystem.tsx
import React from 'react';

const CoolingSystem: React.FC = () => {
    return (
        <div className="flex flex-col h-full gap-1 animate-in fade-in duration-500 font-mono">

            {/* A. COOLING KPIs (30%) - Standardized grid size and card padding */}
            <div className="h-[30%] grid grid-cols-4 gap-1">
                <CoolingCard label="JACKET_WATER_OUT" value="86.4" unit="°C" trend="UP" alertThreshold={95} />
                <CoolingCard label="JACKET_WATER_IN" value="74.2" unit="°C" trend="STABLE" />
                <CoolingCard label="SYSTEM_DELTA_T" value="12.2" unit="°C" trend="UP" isDelta />
                <CoolingCard label="LT_WATER_TEMP" value="38.5" unit="°C" trend="STABLE" />
                <CoolingCard label="PUMP_DISCH_P" value="3.2" unit="bar" trend="STABLE" />
                <CoolingCard label="CHARGE_AIR_T" value="48.2" unit="°C" trend="UP" warningThreshold={55} />
                <CoolingCard label="LT_FLOW_RATE" value="28.5" unit="m³/h" trend="STABLE" />
                <CoolingCard label="GLYCOL_CONC" value="32" unit="%" trend="STABLE" />
            </div>

            {/* B. COOLING LOOP MIMIC (45%) */}
            <div className="h-[45%] border-2 border-inset bg-[#eeeeee] flex relative overflow-hidden">
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                    <span className="text-[10px] font-black text-[#000080]">HT_LT_COOLING_MIMIC</span>
                    <div className="flex gap-2 text-[8px] font-bold">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-400" /> HT_LOOP</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 bg-cyan-300" /> LT_LOOP</span>
                    </div>
                </div>

                <div className="w-full h-full flex items-center justify-center p-2">
                    <div className="w-[95%] h-[85%] border-2 border-dashed border-[#c0c0c0] flex items-center justify-around relative">
                        {/* Heat Exchanger */}
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-14 h-20 border-2 border-black bg-blue-100 flex items-center justify-center relative overflow-hidden shadow-sm">
                                <div className="absolute inset-0 opacity-20 flex flex-col justify-between p-1">
                                    {[...Array(4)].map((_, i) => <div key={i} className="h-[2px] bg-blue-600" />)}
                                </div>
                                <span className="text-[8px] font-black text-center">MAIN<br />COOLER</span>
                            </div>
                            <span className="text-[7px] font-bold bg-white border px-1">E-201</span>
                        </div>

                        {/* Connection Lines */}
                        <div className="w-12 h-[2px] bg-blue-400 relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] font-bold">74°C</div>
                        </div>

                        {/* Pump */}
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-10 h-10 rounded-full border-2 border-black bg-green-400 flex items-center justify-center text-[10px] font-black shadow-md">P2</div>
                            <span className="text-[8px] font-bold">HT_PUMP</span>
                        </div>

                        <div className="w-12 h-[2px] bg-blue-400" />

                        {/* Engine Block */}
                        <div className="w-32 h-24 border-2 border-black bg-[#d4d0c8] flex flex-col items-center justify-center gap-2 shadow-md">
                            <span className="text-[9px] font-black">ENGINE_BLOCK</span>
                            <div className="flex gap-1">
                                {[...Array(3)].map((_, i) => <div key={i} className="w-4 h-6 border border-gray-500 bg-red-100" />)}
                            </div>
                        </div>

                        {/* Return Line Visual Decoration */}
                        <div className="absolute top-[15%] right-[20%] w-[45%] h-2 border-t-2 border-r-2 border-red-400 rounded-tr-lg" />
                        <div className="absolute top-[10%] left-[35%] text-[8px] font-bold text-red-600">86°C RETURN</div>
                    </div>
                </div>
            </div>

            {/* C. DELTA-T & TRENDS (25%) */}
            <div className="flex-1 flex gap-1">
                <div className="flex-[2] border-2 border-inset bg-[#eeeeee] p-2 flex flex-col">
                    <span className="text-[9px] font-bold text-[#808080] mb-2 uppercase">Thermal_Trend_Matrix</span>
                    <div className="flex-1 grid grid-cols-3 gap-2">
                        <CoolingSpark label="JW_OUT_TEMP" data={[70, 72, 75, 80, 84, 85, 86]} color="stroke-red-600" />
                        <CoolingSpark label="COOLER_EFF" data={[95, 94, 94, 92, 90, 88, 86]} color="stroke-green-600" />
                        <CoolingSpark label="DELTA_P_CLR" data={[20, 21, 20, 22, 23, 24, 25]} color="stroke-blue-600" />
                    </div>
                </div>

                <div className="flex-1 border-2 border-inset bg-[#eeeeee] p-2 flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-[#808080] uppercase">Heat_Exchanger_Fouling</span>
                        <div className="mt-1 h-4 w-full bg-gray-300 border border-[#808080] relative overflow-hidden">
                            <div className="h-full bg-yellow-400 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]" style={{ width: '35%' }} />
                            <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black uppercase">FOULING: MEDIUM</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[8px] font-bold border-t border-[#d4d0c8] pt-2">
                        <div className="flex flex-col">
                            <span className="text-[#808080]">VALVE_POS:</span>
                            <span className="text-[#000080]">42% OPEN</span>
                        </div>
                        <div className="flex flex-col text-right">
                            <span className="text-[#808080]">EXP_TANK:</span>
                            <span className="text-green-700">OK (82%)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CoolingCard = ({ label, value, unit, trend, alertThreshold, warningThreshold, isDelta }: any) => {
    const valNum = parseFloat(value);
    const isAlert = alertThreshold && valNum > alertThreshold;
    const isWarning = warningThreshold && valNum > warningThreshold;

    return (
        <div className={`border-2 border-inset px-2 py-1 flex flex-col justify-between transition-colors ${isAlert ? 'bg-red-50' : isWarning ? 'bg-yellow-50' : 'bg-[#eeeeee]'
            }`}>
            <span className={`text-[9px] font-black border-b border-[#d4d0c8] pb-0.5 uppercase truncate ${isDelta ? 'text-blue-700' : 'text-[#404040]'}`}>
                {label}
            </span>
            <div className="flex items-baseline justify-between mt-1">
                <span className={`text-2xl font-black tracking-tighter ${isAlert ? 'text-red-600 animate-pulse' : isWarning ? 'text-orange-600' : 'text-[#000080]'
                    }`}>
                    {value}
                </span>
                <div className="flex flex-col items-end leading-none">
                    <span className="text-[8px] font-bold text-[#808080] uppercase">{unit}</span>
                    <span className={`text-[12px] font-bold ${trend === 'UP' ? 'text-red-500' : trend === 'DOWN' ? 'text-blue-500' : 'text-gray-400'}`}>
                        {trend === 'UP' ? '▲' : trend === 'DOWN' ? '▼' : '━'}
                    </span>
                </div>
            </div>
        </div>
    );
};

const CoolingSpark = ({ label, data, color }: { label: string, data: number[], color: string }) => (
    <div className="flex flex-col gap-1 bg-white border border-[#c0c0c0] p-1 shadow-inner">
        <span className="text-[7px] font-black text-[#808080] uppercase truncate">{label}</span>
        <div className="h-6 w-full">
            <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                <polyline fill="none" className={color} strokeWidth="4" points={data.map((val, i) => `${(i / (data.length - 1)) * 100},${50 - (val % 50)}`).join(' ')} />
            </svg>
        </div>
    </div>
);

export default CoolingSystem;