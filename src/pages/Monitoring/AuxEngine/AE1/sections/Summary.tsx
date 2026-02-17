// src/pages/Overview/sections/Summary.tsx
import React from 'react';

interface SummaryProps {
    onNavigate: (tabId: string) => void;
}

const Summary: React.FC<SummaryProps> = ({ onNavigate }) => {
    return (
        <div className="flex flex-col h-full gap-1 animate-in fade-in duration-500 font-mono">

            {/* A. STATUS BANNER (10%) */}
            <div className="h-[10%] bg-[#000080] border-2 border-t-[#ffffff40] border-l-[#ffffff40] border-b-black border-r-black flex items-center px-4 justify-between shadow-md">
                <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-gray-400 font-bold uppercase">Engine_State</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-white font-black text-xl tracking-tighter">RUNNING</span>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-[#ffffff30]" />
                    <div className="flex flex-col">
                        <span className="text-[9px] text-gray-400 font-bold uppercase">Control_Mode</span>
                        <span className="text-white font-black text-xl tracking-tighter">REMOTE_AUTO</span>
                    </div>
                </div>
                <div
                    onClick={() => onNavigate('CONDITION')}
                    className="text-right cursor-pointer hover:opacity-80 transition-opacity"
                >
                    <span className="text-[9px] text-gray-400 font-bold block uppercase underline">Go_to_Condition</span>
                    <span className="text-green-400 font-black text-2xl tracking-tighter">94%</span>
                </div>
            </div>

            {/* B. ENGINE MIMIC (50%) */}
            <div className="h-[50%] border-2 border-inset bg-[#eeeeee] relative flex items-center justify-center overflow-hidden">
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                    <span className="text-[10px] font-black text-[#000080]">VISUAL_DIAGNOSTIC_MIMIC</span>
                    <div className="flex gap-2 text-[8px] font-bold">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-600" /> FAULT</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 bg-yellow-400" /> WARNING</span>
                    </div>
                </div>

                <div className="w-full h-full flex items-center justify-center p-4">
                    <div className="relative w-full h-full border-2 border-dashed border-[#c0c0c0] flex flex-col items-center justify-center bg-white/20">

                        {/* Interactive Engine Block -> CORE */}
                        <div
                            onClick={() => onNavigate('CORE')}
                            className="w-3/4 h-24 bg-[#d4d0c8] border-2 border-black flex items-center justify-around relative shadow-lg group hover:border-[#000080] cursor-pointer transition-colors"
                        >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-[#808080] group-hover:text-[#000080] whitespace-nowrap bg-[#eeeeee] px-1">
                                [LINK_TO_CORE_DIAGNOSTICS]
                            </div>
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="flex flex-col items-center gap-1">
                                    <div className={`w-8 h-12 border border-black ${i === 2 ? 'bg-red-400 animate-pulse' : 'bg-gray-400'} group-hover:opacity-80`} />
                                    <span className="text-[8px] font-bold">CYL_{i + 1}</span>
                                </div>
                            ))}
                        </div>

                        {/* Interactive Turbo -> AIR */}
                        <button
                            onClick={() => onNavigate('AIR')}
                            className="absolute top-10 right-10 flex flex-col items-end group cursor-pointer hover:scale-105 transition-transform"
                        >
                            <div className="bg-white border border-black px-1 text-[9px] font-black shadow-sm group-hover:bg-blue-50 group-hover:text-[#000080]">
                                TURBO_CHARGER [AIR_SYS]
                            </div>
                            <div className="w-10 h-px bg-black group-hover:bg-[#000080]" />
                        </button>

                        {/* Interactive Fuel Line -> FUEL */}
                        <button
                            onClick={() => onNavigate('FUEL')}
                            className="absolute bottom-8 left-10 flex items-center group cursor-pointer hover:translate-x-1 transition-transform"
                        >
                            <div className="w-12 h-2 bg-[#808080] group-hover:bg-yellow-600 border border-black" />
                            <div className="bg-white border border-black px-1 text-[9px] font-black shadow-sm group-hover:text-yellow-700">
                                FUEL_SUPPLY_LINE
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex-1 flex gap-1 min-h-0">
                {/* C. KPI GRID */}
                <div className="flex-3 grid grid-cols-4 gap-1">
                    <KPICard label="ENGINE_SPEED" value="872" unit="RPM" trend="UP" onClick={() => onNavigate('CORE')} />
                    <KPICard label="TOTAL_LOAD" value="61.4" unit="%" trend="STABLE" onClick={() => onNavigate('CORE')} />
                    <KPICard label="LUBE_PRESS" value="4.8" unit="bar" trend="DOWN" alert onClick={() => onNavigate('LUBE')} />
                    <KPICard label="COOLANT_T" value="82" unit="°C" trend="UP" onClick={() => onNavigate('COOLING')} />
                    <KPICard label="EXH_AVG_T" value="412" unit="°C" trend="STABLE" onClick={() => onNavigate('CORE')} />
                    <KPICard label="VIB_RMS" value="1.8" unit="mm/s" trend="STABLE" onClick={() => onNavigate('VIB')} />
                    <KPICard label="FUEL_CONS" value="195" unit="kg/h" trend="UP" onClick={() => onNavigate('FUEL')} />
                    <KPICard label="AIR_INT_P" value="2.1" unit="bar" trend="STABLE" onClick={() => onNavigate('AIR')} />
                </div>

                {/* D. ALARM STRIP -> LOGS */}
                <div
                    onClick={() => onNavigate('LOGS')}
                    className="flex-1 bg-[#c0c0c0] border-2 border-inset p-1 flex flex-col gap-1 overflow-y-auto shadow-inner cursor-pointer hover:bg-[#d4d0c8] transition-colors group"
                >
                    <div className="bg-[#808080] text-white text-[8px] font-black px-1.5 py-0.5 mb-0.5 flex justify-between uppercase group-hover:bg-red-700">
                        <span>LIVE_ALERTS [LOGS]</span>
                        <span className="animate-pulse">●</span>
                    </div>
                    <AlarmItem severity="CRITICAL" msg="LOW_LUBE_PRESS" />
                    <AlarmItem severity="WARNING" msg="HIGH_VIB_TURBO" />
                    <AlarmItem severity="WARNING" msg="TEMP_DEVIATION" />
                </div>
            </div>
        </div>
    );
};

const KPICard = ({ label, value, unit, trend, alert, onClick }: any) => (
    <div
        onClick={onClick}
        className={`border-2 border-inset px-2 py-1 flex flex-col justify-between transition-all cursor-pointer hover:brightness-110 active:border-black group ${alert ? 'bg-red-50 border-red-300 shadow-[inset_0_0_10px_rgba(239,68,68,0.2)]' : 'bg-[#eeeeee] hover:border-[#000080]'
            }`}
    >
        <span className="text-[9px] font-black text-[#404040] border-b border-[#d4d0c8] pb-0.5 uppercase truncate group-hover:text-[#000080]">{label}</span>
        <div className="flex items-baseline justify-between mt-1 pointer-events-none">
            <span className={`text-2xl font-black tracking-tighter ${alert ? 'text-red-600 animate-pulse' : 'text-[#000080]'}`}>{value}</span>
            <div className="flex flex-col items-end leading-none">
                <span className="text-[8px] font-bold text-[#808080]">{unit}</span>
                <span className={`text-[12px] font-bold ${trend === 'UP' ? 'text-red-500' : trend === 'DOWN' ? 'text-blue-500' : 'text-gray-400'}`}>
                    {trend === 'UP' ? '▲' : trend === 'DOWN' ? '▼' : '━'}
                </span>
            </div>
        </div>
    </div>
);

const AlarmItem = ({ severity, msg }: { severity: 'CRITICAL' | 'WARNING', msg: string }) => (
    <div className={`text-[9px] font-black p-1.5 border shadow-sm flex items-center gap-1.5 leading-tight ${severity === 'CRITICAL' ? 'bg-red-600 text-white animate-pulse border-red-900' : 'bg-yellow-400 text-black border-yellow-600'
        }`}>
        <span className="text-[10px]">{severity === 'CRITICAL' ? '‼' : '⚠'}</span>
        <span className="truncate uppercase">{msg}</span>
    </div>
);

export default Summary;