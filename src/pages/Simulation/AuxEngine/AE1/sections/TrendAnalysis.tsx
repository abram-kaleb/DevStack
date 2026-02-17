// src/pages/TrendAnalysis/TrendAnalysisLayout.tsx
import React, { useState } from 'react';
import SidebarTrend from '../components/SidebarTrend';

const TrendAnalysisLayout: React.FC = () => {
    const [selectedParams, setSelectedParams] = useState<string[]>(['RPM', 'LOAD']);
    const [timeRange, setTimeRange] = useState('1H');

    const handleParameterToggle = (paramId: string) => {
        setSelectedParams(prev =>
            prev.includes(paramId)
                ? prev.filter(p => p !== paramId)
                : [...prev, paramId]
        );
    };

    return (
        <div className="flex w-full h-full bg-[#d4d0c8] overflow-hidden">
            <main className="flex-1 flex flex-col p-1 bg-[#c0c0c0] overflow-hidden min-w-0">
                <div className="flex-[6] flex flex-col min-h-0 mb-1">
                    <div className="h-7 bg-[#d4d0c8] border-2 border-t-white border-l-white border-b-black border-r-black flex items-center px-2 justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] font-black bg-[#000080] text-white px-2 py-0.5 shadow-[1px_1px_0px_white]">CRT_TREND_DISPLAY</span>
                            <div className="flex gap-1">
                                {['XY_PLOT', 'STACKED', 'OVERLAY', 'EXPORT'].map(tool => (
                                    <button key={tool} className="px-2 h-4 border border-black bg-[#eeeeee] text-[8px] font-bold hover:bg-white active:shadow-inner active:bg-[#d4d0c8]">
                                        {tool}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="text-[9px] font-black text-[#000080] uppercase">
                            Range: {timeRange} | Sampling: 1Hz
                        </div>
                    </div>

                    <div className="flex-1 border-2 border-t-black border-l-black border-r-white border-b-white bg-black relative overflow-hidden">
                        <div
                            className="absolute inset-0 opacity-[0.15] pointer-events-none"
                            style={{
                                backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
                                backgroundSize: '40px 40px'
                            }}
                        />

                        {selectedParams.length > 0 ? (
                            <div className="w-full h-full flex flex-col items-center justify-center p-4">
                                <div className="w-full h-full border-l border-b border-green-900/50 relative">
                                    <div className="absolute top-4 left-4 text-[#00ff00] font-mono text-[10px] animate-pulse">
                                        {`>>> ANALYZING_${selectedParams.length}_STREAMS...`}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#444]">
                                <div className="w-8 h-8 border-2 border-dashed border-[#444] rounded-full animate-spin" />
                                <span className="font-black text-[9px] tracking-widest uppercase">No_Data_Selected</span>
                            </div>
                        )}

                        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                            {selectedParams.map((p, i) => (
                                <div key={p} className="flex items-center gap-2 bg-black/80 px-2 py-0.5 border border-[#333]">
                                    <div className={`w-2 h-0.5 ${i === 0 ? 'bg-cyan-400' : i === 1 ? 'bg-yellow-400' : 'bg-pink-500'}`} />
                                    <span className="text-[8px] text-white font-bold">{p}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-[4] flex flex-col min-h-0">
                    <div className="bg-[#808080] text-white text-[9px] px-2 py-0.5 font-black shrink-0 border-b border-white/20">
                        ANALYTICS_SUMMARY_REPORT
                    </div>
                    <div className="flex-1 bg-[#eeeeee] border-2 border-t-black border-l-black border-r-white border-b-white p-1 overflow-auto custom-scrollbar">
                        <table className="w-full text-[10px] font-mono border-collapse min-w-[600px]">
                            <thead className="sticky top-0 bg-[#d4d0c8] shadow-sm z-10">
                                <tr className="text-left border-b border-[#808080]">
                                    <th className="p-1 border-r border-white/50">PARAMETER</th>
                                    <th className="p-1 border-r border-white/50">MIN</th>
                                    <th className="p-1 border-r border-white/50">MAX</th>
                                    <th className="p-1 border-r border-white/50">AVG</th>
                                    <th className="p-1 border-r border-white/50">TREND</th>
                                    <th className="p-1 text-right">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedParams.map((p) => (
                                    <tr key={p} className="border-b border-black/5 hover:bg-blue-50 transition-colors">
                                        <td className="p-1 font-black bg-[#f5f5f5] border-r border-black/5">{p}</td>
                                        <td className="p-1 text-gray-600 border-r border-black/5">342.1</td>
                                        <td className="p-1 text-gray-600 border-r border-black/5">892.4</td>
                                        <td className="p-1 font-bold text-blue-900 border-r border-black/5">512.8</td>
                                        <td className="p-1 text-green-600 border-r border-black/5 font-bold">▲ +2.4%</td>
                                        <td className="p-1 text-right">
                                            <span className="bg-green-200 text-green-800 px-1 text-[8px] font-black uppercase border border-green-300">Nominal</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <SidebarTrend
                selectedParams={selectedParams}
                onParameterToggle={handleParameterToggle}
                onTimeRangeChange={setTimeRange}
            />
        </div>
    );
};

export default TrendAnalysisLayout;