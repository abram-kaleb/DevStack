// src/pages/Overview/sections/LogsEvents.tsx
import React from 'react';

const LogsEvents: React.FC = () => {
    const logs = [
        { id: 1, time: '11:02:45', msg: 'LOW_LUBE_OIL_PRESS', system: 'LUBE', severity: 'CRITICAL', status: 'UNACK' },
        { id: 2, time: '10:58:12', msg: 'CYL_3_EXH_HIGH_TEMP', system: 'CORE', severity: 'WARNING', status: 'ACK' },
        { id: 3, time: '10:54:30', msg: 'TURBO_VIB_ABNORMAL', system: 'VIB', severity: 'WARNING', status: 'UNACK' },
        { id: 4, time: '10:50:05', msg: 'BOOST_PRESS_DEVIATION', system: 'AIR', severity: 'WARNING', status: 'ACK' },
        { id: 5, time: '10:45:22', msg: 'HT_WATER_TEMP_HIGH', system: 'COOLING', severity: 'CRITICAL', status: 'ACK' },
        { id: 6, time: '10:30:15', msg: 'FUEL_FILTER_DIFF_HIGH', system: 'FUEL', severity: 'WARNING', status: 'ACK' },
        { id: 7, time: '10:25:00', msg: 'GENERATOR_LOAD_UNSTABLE', system: 'ELEC', severity: 'WARNING', status: 'ACK' },
    ];

    return (
        <div className="flex flex-col h-full gap-1 animate-in fade-in duration-500 font-mono">

            {/* A. ACTIVE ALARMS STRIP (20%) - Reduced height */}
            <div className="h-[20%] border-2 border-inset bg-[#eeeeee] p-2 flex flex-col gap-1">
                <div className="flex justify-between items-center mb-0.5">
                    <span className="text-[10px] font-black text-[#000080]">ACTIVE_ATTENTION</span>
                    <span className="text-[9px] font-bold text-red-600 animate-pulse uppercase">Alerts: {logs.filter(l => l.status === 'UNACK').length}</span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-400">
                    {logs.filter(l => l.status === 'UNACK').map(alarm => (
                        <div key={alarm.id} className={`shrink-0 w-48 p-1.5 border-2 flex flex-col justify-between ${alarm.severity === 'CRITICAL'
                            ? 'bg-red-600 text-white animate-pulse border-red-900'
                            : 'bg-yellow-400 text-black border-yellow-600'
                            }`}>
                            <div className="flex justify-between items-start">
                                <span className="text-[8px] font-black uppercase truncate leading-none">{alarm.msg}</span>
                                <span className="text-[7px] font-bold opacity-80 ml-1">{alarm.time}</span>
                            </div>
                            <span className="text-[7px] font-bold bg-black/20 px-1 py-0.5 w-fit mt-1">SYS_{alarm.system}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* B. RECENT ALARM / EVENT TABLE (70%) - Increased height */}
            <div className="h-[70%] border-2 border-inset bg-white overflow-hidden flex flex-col">
                <div className="bg-[#808080] text-white text-[9px] font-black grid grid-cols-7 px-2 py-1 uppercase tracking-tight">
                    <div className="col-span-1">TIME</div>
                    <div className="col-span-3">DESCRIPTION</div>
                    <div className="col-span-1 text-center">SYSTEM</div>
                    <div className="col-span-1 text-center">SEV</div>
                    <div className="col-span-1 text-right">STATUS</div>
                </div>
                <div className="flex-1 overflow-y-auto bg-[#d4d0c8]">
                    {logs.map((log) => (
                        <div key={log.id} className={`grid grid-cols-7 px-2 py-1 border-b border-[#808080] text-[10px] font-bold hover:bg-[#ffffffaa] transition-colors cursor-pointer ${log.status === 'UNACK' ? 'bg-[#ff000010]' : ''
                            }`}>
                            <div className="col-span-1 text-[#404040]">{log.time}</div>
                            <div className="col-span-3 truncate pr-1">{log.msg}</div>
                            <div className="col-span-1 text-[#000080] text-center">[{log.system}]</div>
                            <div className="col-span-1 flex justify-center items-center">
                                <span className={`px-1 text-[7px] border leading-none py-0.5 ${log.severity === 'CRITICAL' ? 'bg-red-600 text-white border-red-900' : 'bg-yellow-400 text-black border-yellow-700'
                                    }`}>{log.severity.slice(0, 4)}</span>
                            </div>
                            <div className="col-span-1 text-right">
                                <span className={log.status === 'UNACK' ? 'text-red-600 underline' : 'text-green-700'}>
                                    {log.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* C. QUICK LOG ACTIONS (10%) - Minimized buttons */}
            <div className="h-[10%] grid grid-cols-4 gap-1 p-0.5 bg-[#d4d0c8] border-2 border-inset">
                <LogActionBtn label="ACK_ALL" variant="primary" />
                <LogActionBtn label="FILTER" />
                <LogActionBtn label="EXPORT" />
                <LogActionBtn label="PURGE" />
            </div>
        </div>
    );
};

const LogActionBtn = ({ label, variant }: { label: string, variant?: 'primary' }) => (
    <button className={`h-full border-2 border-t-white border-l-white border-b-black border-r-black text-[8px] font-black active:border-inset hover:bg-[#eeeeee] flex items-center justify-center shadow-sm ${variant === 'primary' ? 'bg-[#c0c0c0] text-[#000080]' : 'bg-[#d4d0c8] text-[#404040]'
        }`}>
        {label}
    </button>
);

export default LogsEvents;