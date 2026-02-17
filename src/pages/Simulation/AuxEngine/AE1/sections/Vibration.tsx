// src/pages/Overview/sections/Vibration.tsx
import React from 'react';

const Vibration: React.FC = () => {
    const bearingData = [
        { id: 'MB1', label: 'MAIN_BRG_1', rms: 1.1, status: 'NORMAL' },
        { id: 'MB2', label: 'MAIN_BRG_2', rms: 1.4, status: 'WARNING' },
        { id: 'MB3', label: 'MAIN_BRG_3', rms: 1.0, status: 'NORMAL' },
        { id: 'TB_C', label: 'TURBO_COMP', rms: 2.1, status: 'CRITICAL' },
        { id: 'TB_T', label: 'TURBO_TURB', rms: 1.8, status: 'WARNING' },
        { id: 'CPL', label: 'COUPLING', rms: 0.9, status: 'NORMAL' },
    ];

    return (
        <div className="flex flex-col h-full gap-1 animate-in fade-in duration-500 font-mono">

            {/* A. VIBRATION KPIs (30%) - Standardized 4-column grid */}
            <div className="h-[30%] grid grid-cols-4 gap-1">
                <VibCard label="OVERALL_RMS" value="1.42" unit="mm/s" trend="UP" />
                <VibCard label="TURBO_VIB_RMS" value="2.10" unit="mm/s" trend="UP" alertThreshold={2.0} />
                <VibCard label="CRANK_DISPLACE" value="0.12" unit="mm" trend="STABLE" />
                <VibCard label="PEAK_VELOCITY" value="4.8" unit="mm/s" trend="UP" />
                <VibCard label="MISALIGN_IDX" value="0.04" unit="deg" trend="STABLE" />
                <VibCard label="HEALTH_SCORE" value="88" unit="%" trend="DOWN" />
                <VibCard label="G_FORCE_PEAK" value="1.2" unit="g" trend="STABLE" />
                <VibCard label="BEARING_TEMP" value="72.4" unit="°C" trend="UP" />
            </div>

            {/* B. BEARING / COMPONENT HEALTH (45%) */}
            <div className="h-[45%] border-2 border-inset bg-[#eeeeee] p-3 flex flex-col">
                <div className="flex justify-between items-center border-b border-[#808080] pb-2 mb-2">
                    <span className="text-[11px] font-black text-[#000080]">MECHANICAL_HEALTH_MONITOR</span>
                    <div className="flex gap-4 uppercase text-[9px] font-bold">
                        <span className="text-red-600 animate-pulse">● CRITICAL_VIB_TURBO</span>
                        <span className="text-[#808080]">SENSORS: ACTIVE</span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-between overflow-hidden">
                    {bearingData.map((brg) => {
                        const isCritical = brg.status === 'CRITICAL';
                        const isWarning = brg.status === 'WARNING';
                        return (
                            <div key={brg.id} className="flex items-center gap-3">
                                <span className="text-[9px] font-black w-14 py-1 bg-[#808080] text-white text-center shadow-sm">{brg.id}</span>
                                <div className="flex-1 h-6 bg-[#d4d0c8] border border-[#808080] relative shadow-inner">
                                    <div
                                        className={`h-full transition-all duration-1000 ${isCritical ? 'bg-red-600' : isWarning ? 'bg-yellow-500' : 'bg-[#000080]'}`}
                                        style={{ width: `${(brg.rms / 3.0) * 100}%` }}
                                    />
                                    <div className="absolute inset-y-0 left-[50%] w-[1px] bg-yellow-600/50 border-r border-dashed" title="Warning Limit" />
                                    <div className="absolute inset-y-0 left-[66%] w-[1px] bg-red-600/50 border-r border-dashed" title="Alarm Limit" />
                                </div>
                                <div className="w-40 flex justify-between items-center bg-white px-2 border border-inset h-6">
                                    <span className="text-[8px] font-bold text-[#666] truncate pr-1">{brg.label}</span>
                                    <span className={`text-[11px] font-black ${isCritical ? 'text-red-600 animate-pulse' : isWarning ? 'text-orange-600' : 'text-[#000080]'}`}>
                                        {brg.rms.toFixed(2)}
                                    </span>
                                    <span className="text-[10px] ml-1">{isCritical ? '‼' : isWarning ? '⚠' : '✓'}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* C. RMS & TREND MINI CHARTS (25%) */}
            <div className="flex-1 flex gap-1">
                <div className="flex-[2] border-2 border-inset bg-[#eeeeee] p-2 flex flex-col">
                    <span className="text-[9px] font-bold text-[#808080] mb-2 uppercase">Spectrum_Trend_Analysis</span>
                    <div className="flex-1 grid grid-cols-3 gap-2">
                        <VibSpark label="TURBO_RMS" data={[40, 45, 50, 65, 80, 85, 90]} color="stroke-red-600" />
                        <VibSpark label="CRANK_RMS" data={[20, 22, 21, 23, 22, 24, 23]} color="stroke-blue-600" />
                        <VibSpark label="GEAR_VIB" data={[30, 32, 31, 35, 33, 34, 32]} color="stroke-green-600" />
                    </div>
                </div>

                <div className="flex-1 border-2 border-inset bg-[#eeeeee] p-2 flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-[#808080] uppercase">Structural_Alerts</span>
                        <div className="text-[8px] font-black bg-red-100 text-red-700 p-1 border border-red-300 leading-tight">
                            HIGH_FREQ_DETECTED
                        </div>
                        <div className="text-[8px] font-black bg-green-100 text-green-700 p-1 border border-green-300 leading-tight">
                            FOUNDATION_OK
                        </div>
                    </div>
                    <button className="w-full bg-[#d4d0c8] border-2 border-t-white border-l-white border-b-black border-r-black text-[8px] font-black py-1 uppercase active:border-inset">
                        FFT_SPECTRUM
                    </button>
                </div>
            </div>
        </div>
    );
};

const VibCard = ({ label, value, unit, trend, alertThreshold }: any) => {
    const isAlert = alertThreshold && parseFloat(value) > alertThreshold;
    return (
        <div className={`border-2 border-inset px-2 py-1 flex flex-col justify-between transition-colors ${isAlert ? 'bg-red-50' : 'bg-[#eeeeee]'}`}>
            <span className="text-[9px] font-black text-[#404040] border-b border-[#d4d0c8] pb-0.5 uppercase truncate">{label}</span>
            <div className="flex items-baseline justify-between mt-1">
                <span className={`text-2xl font-black tracking-tighter ${isAlert ? 'text-red-600 animate-pulse' : 'text-[#000080]'}`}>
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

const VibSpark = ({ label, data, color }: { label: string, data: number[], color: string }) => (
    <div className="flex flex-col gap-1 bg-white border border-[#c0c0c0] p-1 shadow-inner">
        <span className="text-[7px] font-black text-[#808080] uppercase truncate">{label}</span>
        <div className="h-6 w-full">
            <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                <polyline fill="none" className={color} strokeWidth="4" points={data.map((val, i) => `${(i / (data.length - 1)) * 100},${50 - (val % 50)}`).join(' ')} />
            </svg>
        </div>
    </div>
);

export default Vibration;