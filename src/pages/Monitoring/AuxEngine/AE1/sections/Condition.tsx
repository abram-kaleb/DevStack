// src/pages/Monitoring/AuxEngine/AE1/sections/Condition.tsx
import React from 'react';

const Condition: React.FC = () => {
    const healthKPIs = [
        { label: 'HEALTH_INDEX', value: '82', unit: '%', status: 'CAUTION', alert: true },
        { label: 'PREDICTED_RUL', value: '420', unit: 'hrs', status: 'STABLE', alert: false },
        { label: 'ACTIVE_RISKS', value: '02', unit: 'items', status: 'CRITICAL', alert: true },
        { label: 'ANOMALY_SCORE', value: '14.2', unit: 'lvl', status: 'DEVIATING', alert: false },
        { label: 'EFFICIENCY', value: '94', unit: '%', status: 'OPTIMAL', alert: false }
    ];

    return (
        <div className="flex flex-col h-full gap-1 animate-in fade-in duration-500 font-mono">

            {/* A. HEALTH OVERVIEW (15%) */}
            <div className="h-[15%] grid grid-cols-5 gap-1">
                {healthKPIs.map((kpi) => (
                    <div key={kpi.label} className={`border-2 border-inset p-2 flex flex-col justify-between ${kpi.alert ? 'bg-red-50 shadow-[inset_0_0_10px_rgba(239,68,68,0.1)]' : 'bg-[#eeeeee]'}`}>
                        <div className="flex justify-between items-start border-b border-[#d4d0c8] pb-1">
                            <span className="text-[9px] font-black text-[#404040] uppercase">{kpi.label}</span>
                            <span className={`text-[7px] px-1 font-bold border ${kpi.alert ? 'bg-red-600 text-white border-red-900 animate-pulse' : 'bg-[#808080] text-white border-black'}`}>
                                {kpi.status}
                            </span>
                        </div>
                        <div className="flex items-baseline gap-1 mt-1">
                            <span className={`text-3xl font-black tracking-tighter ${kpi.alert ? 'text-red-600' : 'text-[#000080]'}`}>
                                {kpi.value}
                            </span>
                            <span className="text-[10px] font-bold text-[#808080] uppercase">{kpi.unit}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* B & C. MIDDLE SECTION (65%) */}
            <div className="h-[65%] flex gap-1 min-h-0">
                {/* B. RISK RANKING (60%) */}
                <div className="flex-6 bg-[#eeeeee] border-2 border-inset flex flex-col overflow-hidden">
                    <div className="bg-[#000080] text-white text-[10px] font-black px-2 py-1 flex justify-between uppercase">
                        <span>PRIORITY_MAINTENANCE_RANKING</span>
                        <span className="opacity-70">ML_MODEL: V3.4_PROGNOSIS</span>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left text-[11px] border-collapse">
                            <thead className="sticky top-0 bg-[#d4d0c8] shadow-sm z-10">
                                <tr className="text-[#404040] border-b-2 border-[#808080]">
                                    <th className="p-2 font-black uppercase">Component</th>
                                    <th className="p-2 font-black uppercase w-32">Health_Bar</th>
                                    <th className="p-2 font-black uppercase text-center">Risk</th>
                                    <th className="p-2 font-black uppercase">Est_RUL</th>
                                    <th className="p-2 font-black uppercase text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <RiskRow comp="TURBOCHARGER_T1" health={62} risk="HIGH" rul="120h" action="INSPECT" />
                                <RiskRow comp="CYLINDER_03_EXH" health={70} risk="MED" rul="240h" action="MONITOR" />
                                <RiskRow comp="MAIN_BEARING_04" health={85} risk="LOW" rul="680h" action="OK" />
                                <RiskRow comp="LO_PUMP_OUTLET" health={88} risk="LOW" rul="900h" action="OK" />
                                <RiskRow comp="FUEL_INJECTOR_01" health={92} risk="LOW" rul="1.2kh" action="OK" />
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* C. ANOMALY TIMELINE (40%) */}
                <div className="flex-4 bg-[#eeeeee] border-2 border-inset flex flex-col overflow-hidden">
                    <div className="bg-[#808080] text-white text-[10px] font-black px-2 py-1 uppercase">
                        ANOMALY_PROBABILITY_TIMELINE
                    </div>
                    <div className="flex-1 p-3 flex items-end gap-0.5 relative bg-black/5">
                        <div className="absolute top-2 left-2 text-[8px] text-[#808080] font-bold">CONFIDENCE_LVL</div>
                        {[40, 35, 45, 30, 85, 90, 40, 35, 30, 25, 60, 55, 40, 30, 20, 15, 80, 75, 40].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center group relative">
                                <div
                                    className={`w-full transition-all duration-300 ${h > 70 ? 'bg-red-500 animate-pulse' : 'bg-[#000080]'}`}
                                    style={{ height: `${h}%` }}
                                />
                                {h > 70 && <div className="absolute -top-4 text-red-600 text-[10px] font-black">!</div>}
                            </div>
                        ))}
                    </div>
                    <div className="h-6 border-t border-[#c0c0c0] flex items-center justify-between px-2 text-[8px] font-black text-[#808080]">
                        <span>T-48H</span>
                        <span>LIVE_NOW</span>
                    </div>
                </div>
            </div>

            {/* D. RECOMMENDATION PANEL (20%) */}
            <div className="h-[20%] bg-[#d4d0c8] border-2 border-inset p-1 flex flex-col gap-1">
                <div className="bg-[#008000] text-white text-[9px] font-black px-2 py-0.5 flex items-center gap-2">
                    <span className="animate-pulse">▶</span> AI_GENERATED_MAINTENANCE_ADVISORY
                </div>
                <div className="flex-1 grid grid-cols-2 gap-1 overflow-y-auto">
                    <AdvisoryItem
                        id="01"
                        severity="HIGH"
                        msg="Turbo vibration increasing 12%/day. Inspect bearings within 72h."
                    />
                    <AdvisoryItem
                        id="02"
                        severity="MED"
                        msg="Fuel injection timing deviation on Cyl 03. Recalibrate at next port stay."
                    />
                </div>
            </div>
        </div>
    );
};

const RiskRow = ({ comp, health, risk, rul, action }: any) => (
    <tr className="border-b border-[#d4d0c8] hover:bg-white transition-colors">
        <td className="p-2 font-black text-[#000080] uppercase truncate">{comp}</td>
        <td className="p-2">
            <div className="w-full bg-[#c0c0c0] h-3 border border-black/20 p-px">
                <div
                    className={`h-full ${risk === 'HIGH' ? 'bg-red-600' : risk === 'MED' ? 'bg-yellow-500' : 'bg-green-600'}`}
                    style={{ width: `${health}%` }}
                />
            </div>
        </td>
        <td className="p-2 text-center">
            <span className={`text-[8px] font-black px-1.5 py-0.5 border ${risk === 'HIGH' ? 'bg-red-600 text-white border-red-900' :
                risk === 'MED' ? 'bg-yellow-400 text-black border-yellow-700' :
                    'bg-green-600 text-white border-green-900'
                }`}>
                {risk}
            </span>
        </td>
        <td className="p-2 font-bold text-[#404040]">{rul}</td>
        <td className="p-2 text-right">
            <button className="text-[9px] font-black border-2 border-t-white border-l-white border-b-black border-r-black bg-[#d4d0c8] px-2 py-0.5 active:border-inset hover:bg-white">
                {action}
            </button>
        </td>
    </tr>
);

const AdvisoryItem = ({ id, severity, msg }: any) => (
    <div className={`flex gap-2 p-2 border-2 border-inset bg-white ${severity === 'HIGH' ? 'border-l-red-600' : 'border-l-yellow-500'}`}>
        <span className={`text-sm font-black ${severity === 'HIGH' ? 'text-red-600' : 'text-yellow-600'}`}>{id}</span>
        <p className="text-[10px] leading-tight font-bold text-[#404040] uppercase">{msg}</p>
    </div>
);

export default Condition;