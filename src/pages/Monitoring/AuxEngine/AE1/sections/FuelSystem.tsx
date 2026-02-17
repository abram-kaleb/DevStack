// src/pages/Overview/sections/FuelSystem.tsx
import React from 'react';

const FuelSystem: React.FC = () => {
    const fuelData = [
        { id: 1, index: 62, press: 3.2, status: 'NORMAL' },
        { id: 2, index: 63, press: 3.2, status: 'NORMAL' },
        { id: 3, index: 78, press: 3.8, status: 'CRITICAL' },
        { id: 4, index: 61, press: 3.1, status: 'NORMAL' },
        { id: 5, index: 58, press: 2.9, status: 'WARNING' },
        { id: 6, index: 62, press: 3.2, status: 'NORMAL' },
    ];

    return (
        <div className="flex flex-col h-full gap-1 animate-in fade-in duration-500 font-mono">

            {/* A. FUEL KPIs (30%) - Standardized to 4 columns */}
            <div className="h-[30%] grid grid-cols-4 gap-1">
                <FuelCard label="SUPPLY_PRESSURE" value="3.2" unit="bar" trend="STABLE" alertThreshold={2.5} />
                <FuelCard label="FUEL_TEMP_INLET" value="45.8" unit="°C" trend="UP" />
                <FuelCard label="TOTAL_FUEL_RATE" value="182.5" unit="kg/h" trend="UP" />
                <FuelCard label="SPEC_CONSUMP" value="192.1" unit="g/kWh" trend="DOWN" />
                <FuelCard label="PUMP_LOAD" value="68" unit="%" trend="STABLE" />
                <FuelCard label="VISCOSITY_CTRL" value="12.4" unit="cSt" trend="STABLE" />
                <FuelCard label="RAIL_PRESSURE" value="420" unit="bar" trend="STABLE" />
                <FuelCard label="LEAK_DETECTION" value="0.0" unit="L/h" trend="STABLE" />
            </div>

            {/* B. INJECTION INDEX PANEL (45%) */}
            <div className="h-[45%] border-2 border-inset bg-[#eeeeee] p-3 flex flex-col">
                <div className="flex justify-between items-center border-b border-[#808080] pb-2 mb-2">
                    <span className="text-[11px] font-black text-[#000080]">CYL_FUEL_INJECTION_INDEX</span>
                    <div className="flex gap-4 uppercase text-[9px] font-bold">
                        <span className="text-red-600 animate-pulse">● HIGH_DEVIATION</span>
                        <span className="text-[#808080]">MODE: LOAD_DEP</span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                    {fuelData.map((cyl) => {
                        const isHigh = cyl.index > 70;
                        const isLow = cyl.index < 60;
                        return (
                            <div key={cyl.id} className="flex items-center gap-3">
                                <span className="text-[10px] font-black w-10 py-1 bg-[#808080] text-white text-center">C{cyl.id}</span>
                                <div className="flex-1 h-6 bg-[#d4d0c8] border border-[#808080] relative shadow-inner">
                                    <div
                                        className={`h-full transition-all duration-700 ${isHigh ? 'bg-red-600' : isLow ? 'bg-yellow-500' : 'bg-[#000080]'}`}
                                        style={{ width: `${cyl.index}%` }}
                                    />
                                    <div className="absolute inset-y-0 left-[62%] w-[2px] bg-black/20 border-r border-white/50" />
                                </div>
                                <div className="w-36 flex justify-between items-center bg-white px-2 border border-inset">
                                    <span className={`text-xs font-black ${isHigh ? 'text-red-600' : ''}`}>{cyl.index}%</span>
                                    <span className="text-[9px] text-[#808080]">{cyl.press} bar</span>
                                    <span className="text-[10px]">{isHigh ? '⚠' : isLow ? '↓' : '✓'}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* C. STABILITY & FILTERS (25%) */}
            <div className="flex-1 flex gap-1">
                <div className="flex-[2] border-2 border-inset bg-[#eeeeee] p-2 flex flex-col">
                    <span className="text-[9px] font-bold text-[#808080] mb-2 uppercase">Injection_Stability_Trends</span>
                    <div className="flex-1 grid grid-cols-3 gap-2">
                        <FuelSpark label="PUMP_STAB" data={[80, 82, 81, 80, 79, 80, 81]} color="stroke-blue-600" />
                        <FuelSpark label="CONS_TREND" data={[40, 42, 45, 48, 52, 55, 60]} color="stroke-red-600" />
                        <FuelSpark label="RAIL_STAB" data={[90, 91, 89, 90, 90, 91, 90]} color="stroke-green-600" />
                    </div>
                </div>
                <div className="flex-1 border-2 border-inset bg-[#eeeeee] p-2 flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-[#808080] uppercase">Filter_Monitoring</span>
                        <div className="flex justify-between items-center text-[10px] font-black bg-white p-1 border uppercase">
                            <span>Primary</span>
                            <span className="text-green-600">Clean</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black bg-white p-1 border uppercase">
                            <span>Secondary</span>
                            <span className="text-green-600">Clean</span>
                        </div>
                    </div>
                    <button className="w-full bg-[#d4d0c8] border-2 border-t-white border-l-white border-b-black border-r-black text-[9px] font-black py-1 uppercase active:border-inset">
                        Leak_Test_Log
                    </button>
                </div>
            </div>
        </div>
    );
};

const FuelCard = ({ label, value, unit, trend, alertThreshold }: any) => {
    const isAlert = alertThreshold && parseFloat(value) < alertThreshold;
    return (
        <div className={`border-2 border-inset px-2 py-1 flex flex-col justify-between transition-colors ${isAlert ? 'bg-red-50' : 'bg-[#eeeeee]'}`}>
            <span className="text-[9px] font-black text-[#404040] border-b border-[#d4d0c8] pb-0.5 uppercase truncate">{label}</span>
            <div className="flex items-baseline justify-between mt-1">
                <span className={`text-2xl font-black tracking-tighter ${isAlert ? 'text-red-600 animate-pulse' : 'text-[#000080]'}`}>
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

const FuelSpark = ({ label, data, color }: { label: string, data: number[], color: string }) => (
    <div className="flex flex-col gap-1 bg-white border border-[#c0c0c0] p-1 shadow-inner">
        <span className="text-[7px] font-black text-[#808080] uppercase truncate">{label}</span>
        <div className="h-6 w-full">
            <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                <polyline fill="none" className={color} strokeWidth="4" points={data.map((val, i) => `${(i / (data.length - 1)) * 100},${50 - (val % 50)}`).join(' ')} />
            </svg>
        </div>
    </div>
);

export default FuelSystem;