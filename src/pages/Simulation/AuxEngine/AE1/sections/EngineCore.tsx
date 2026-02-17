// src/pages/Overview/sections/EngineCore.tsx
import React from 'react';

const EngineCore: React.FC = () => {
    const cylinders = [
        { id: 1, temp: 410, fuel: 82, status: 'NORMAL' },
        { id: 2, temp: 418, fuel: 84, status: 'NORMAL' },
        { id: 3, temp: 485, fuel: 92, status: 'CRITICAL' },
        { id: 4, temp: 405, fuel: 80, status: 'NORMAL' },
        { id: 5, temp: 412, fuel: 82, status: 'NORMAL' },
        { id: 6, temp: 408, fuel: 81, status: 'NORMAL' },
    ];

    const avgTemp = cylinders.reduce((acc, curr) => acc + curr.temp, 0) / cylinders.length;

    return (
        <div className="flex flex-col h-full gap-1 animate-in fade-in duration-500 font-mono">

            {/* A. CORE KPIs (30%) */}
            <div className="h-[30%] grid grid-cols-4 gap-1">
                <CoreCard label="ACTUAL_SPEED" value="872" unit="RPM" trend="STABLE" />
                <CoreCard label="ENGINE_LOAD" value="61.4" unit="%" trend="UP" />
                <CoreCard label="TOTAL_POWER" value="1840" unit="kW" trend="UP" />
                <CoreCard label="SPEC_FUEL_CONS" value="185.2" unit="g/kWh" trend="DOWN" />
                <CoreCard label="MEAN_EFF_PRESS" value="18.2" unit="bar" trend="STABLE" />
                <CoreCard label="BOOST_PRESS" value="2.4" unit="bar" trend="UP" />
                <CoreCard label="TORQUE_OUT" value="20.1" unit="kNm" trend="STABLE" />
                <CoreCard label="AIR_INTAKE_T" value="42" unit="°C" trend="STABLE" />
            </div>

            {/* B. CYLINDER BALANCE PANEL (45%) */}
            <div className="h-[45%] border-2 border-inset bg-[#eeeeee] p-3 flex flex-col">
                <div className="flex justify-between items-center border-b border-[#808080] pb-2 mb-2">
                    <span className="text-[11px] font-black text-[#000080]">CYLINDER_EXHAUST_TEMP_BALANCE</span>
                    <span className="text-[10px] font-bold text-[#808080]">AVG_TEMP: {avgTemp.toFixed(1)}°C</span>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                    {cylinders.map((cyl) => {
                        const deviation = ((cyl.temp - avgTemp) / avgTemp) * 100;
                        const isAlert = Math.abs(deviation) > 10;

                        return (
                            <div key={cyl.id} className="flex items-center gap-3">
                                <span className="text-[10px] font-black w-10 py-1 bg-[#808080] text-white text-center uppercase">C{cyl.id}</span>
                                <div className="flex-1 h-6 bg-[#d4d0c8] border border-[#808080] relative shadow-inner">
                                    <div
                                        className={`h-full transition-all duration-700 ${isAlert ? 'bg-red-600' : 'bg-[#000080]'}`}
                                        style={{ width: `${(cyl.temp / 600) * 100}%` }}
                                    />
                                    <div className="absolute inset-y-0 left-[68%] w-[2px] bg-black/20 border-r border-white/50" />
                                </div>
                                <div className="w-36 flex justify-between items-center bg-white px-2 border border-inset">
                                    <span className={`text-xs font-black ${isAlert ? 'text-red-600 animate-pulse' : ''}`}>{cyl.temp}°C</span>
                                    <span className={`text-[9px] font-bold ${deviation > 0 ? 'text-red-600' : 'text-blue-600'}`}>
                                        {deviation > 0 ? '+' : ''}{deviation.toFixed(1)}%
                                    </span>
                                    <span className="text-[10px]">{isAlert ? '⚠' : '✓'}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* C. COMBUSTION TRENDS (25%) */}
            <div className="flex-1 flex gap-1">
                <div className="flex-[2] border-2 border-inset bg-[#eeeeee] p-2 flex flex-col">
                    <span className="text-[9px] font-bold text-[#808080] mb-2 uppercase">Combustion_Stability_Matrix</span>
                    <div className="flex-1 grid grid-cols-3 gap-2">
                        <CoreSpark label="WAVEFORM_STREAM" data={[40, 38, 42, 35, 45, 30, 40]} color="stroke-green-600" />
                        <CoreSpark label="LOAD_VARIATION" data={[60, 61, 62, 60, 63, 64, 61]} color="stroke-blue-600" />
                        <CoreSpark label="SFOC_TREND" data={[185, 184, 186, 185, 184, 183, 185]} color="stroke-orange-600" />
                    </div>
                </div>
                <div className="flex-1 border-2 border-inset bg-[#eeeeee] p-2 flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-[#808080] uppercase">Quick_Diagnostics</span>
                        <DiagLine label="IMBALANCE" status="CRITICAL" />
                        <DiagLine label="KNOCKING" status="NORMAL" />
                        <DiagLine label="TIMING" status="NORMAL" />
                    </div>
                    <button className="w-full bg-[#d4d0c8] border-2 border-t-white border-l-white border-b-black border-r-black text-[9px] font-black py-1 uppercase active:border-inset">
                        Full_Analysis
                    </button>
                </div>
            </div>
        </div>
    );
};

const CoreCard = ({ label, value, unit, trend }: any) => (
    <div className="border-2 border-inset px-2 py-1 flex flex-col justify-between transition-colors bg-[#eeeeee]">
        <span className="text-[9px] font-black text-[#404040] border-b border-[#d4d0c8] pb-0.5 uppercase truncate">{label}</span>
        <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black text-[#000080] tracking-tighter">{value}</span>
            <div className="flex flex-col items-end leading-none">
                <span className="text-[8px] font-bold text-[#808080] uppercase">{unit}</span>
                <span className={`text-[12px] ${trend === 'UP' ? 'text-red-500' : trend === 'DOWN' ? 'text-blue-500' : 'text-gray-400'}`}>
                    {trend === 'UP' ? '▲' : trend === 'DOWN' ? '▼' : '━'}
                </span>
            </div>
        </div>
    </div>
);

const CoreSpark = ({ label, data, color }: { label: string, data: number[], color: string }) => (
    <div className="flex flex-col gap-1 bg-white border border-[#c0c0c0] p-1 shadow-inner">
        <span className="text-[7px] font-black text-[#808080] uppercase truncate">{label}</span>
        <div className="h-6 w-full">
            <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                <polyline fill="none" className={color} strokeWidth="4" points={data.map((val, i) => `${(i / (data.length - 1)) * 100},${50 - (val % 50)}`).join(' ')} />
            </svg>
        </div>
    </div>
);

const DiagLine = ({ label, status }: { label: string, status: 'NORMAL' | 'WARNING' | 'CRITICAL' }) => (
    <div className="flex justify-between items-center text-[9px] border-b border-[#d4d0c8] py-0.5">
        <span className="font-bold uppercase">{label}</span>
        <span className={`px-1 font-black ${status === 'CRITICAL' ? 'bg-red-600 text-white animate-pulse' :
            status === 'WARNING' ? 'bg-yellow-400 text-black' : 'text-green-700'
            }`}>
            {status}
        </span>
    </div>
);

export default EngineCore;