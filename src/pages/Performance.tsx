// src/pages/Performance.tsx
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io(`http://${window.location.hostname}:4000`);

const Performance: React.FC = () => {
    const [serverUsage, setServerUsage] = useState({ cpu: 0, ram: 0 });
    const [allTabs, setAllTabs] = useState<any[]>([]);
    const [browserMetrics, setBrowserMetrics] = useState({ ram: 0, gpu: 0, cpu: 0 });
    const cpuHistory = useRef<number[]>([]);

    useEffect(() => {
        socket.on('sys_resource_update', (data) => {
            setServerUsage(data);
        });

        socket.on('all_tabs_data', (tabs) => {
            setAllTabs(tabs);
        });

        const getMetrics = async () => {
            let ramVal = 0;
            let gpuVal = 0;

            if ('performance' in window && (performance as any).memory) {
                const mem = (performance as any).memory;
                ramVal = Math.round(mem.usedJSHeapSize / 1024 / 1024 + 25);
            }

            const start = performance.now();
            setTimeout(() => {
                const end = performance.now();
                const delta = end - start;
                let rawCpu = Math.max(0, (delta - 100) / 10);
                cpuHistory.current.push(rawCpu);
                if (cpuHistory.current.length > 5) cpuHistory.current.shift();
                const avgCpu = cpuHistory.current.reduce((a, b) => a + b, 0) / cpuHistory.current.length;
                const finalCpu = Math.min(100, Math.round(avgCpu + (Math.random() * 2)));
                setBrowserMetrics(prev => ({ ...prev, cpu: finalCpu }));
            }, 100);

            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl');
            if (gl) gpuVal = Math.floor(Math.random() * 10) + 5;
            setBrowserMetrics(prev => ({ ...prev, ram: ramVal, gpu: gpuVal }));
        };

        const interval = setInterval(getMetrics, 2000);
        return () => {
            socket.off('sys_resource_update');
            socket.off('all_tabs_data');
            clearInterval(interval);
        };
    }, []);

    const ResourceCard = ({ title, value, unit, color, label }: any) => (
        <div className="bg-[#d4d0c8] border-2 border-t-white border-l-white border-b-black border-r-black p-4 shadow-md">
            <div className={`text-[12px] font-bold mb-4 flex justify-between items-center border-b border-[#808080] pb-1 ${color}`}>
                <span className="truncate">{title}</span>
                <span className="bg-[#000080] text-white px-2 text-[10px] uppercase flex-shrink-0">{label}</span>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-end">
                    <span className={`text-4xl font-bold tabular-nums ${color}`}>{value}</span>
                    <span className={`text-xl font-bold ${color}`}>{unit}</span>
                </div>
                <div className="w-full h-6 bg-gray-300 border-2 border-inset p-1 shadow-[inset_1px_1px_black]">
                    <div
                        className={`h-full transition-all duration-500 ${color === 'text-[#000080]' ? 'bg-[#000080]' : 'bg-[#006400]'}`}
                        style={{ width: `${Math.min(100, value)}%` }}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-6 w-full h-full overflow-y-auto font-mono bg-[#c0c0c0]">
            <div className="max-w-6xl mx-auto flex flex-col gap-6">
                <div className="bg-[#000080] text-white p-1 flex justify-between items-center shadow-md">
                    <span className="px-2 font-bold text-sm uppercase">Detailed_System_Resource_Analyzer</span>
                    <div className="flex gap-1">

                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    <ResourceCard title="SERVER_CPU_LOAD" value={serverUsage.cpu} unit="%" color="text-[#000080]" label="Main_Server" />
                    <ResourceCard title="SERVER_RAM_USAGE" value={serverUsage.ram} unit="MB" color="text-[#000080]" label="Main_Server" />



                </div>


                <div className="space-y-10">
                    {allTabs
                        .filter(tab => tab.page !== '/performance')
                        .map((tab, index) => (
                            <div key={tab.id} className="border-2 border-inset bg-[#d4d0c8] p-4 shadow-md">
                                <div className="mb-4 flex flex-col border-b border-black pb-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[14px] font-black text-[#800000]">DEVICE_UID: {tab.id.slice(0, 8)}</span>
                                        <span className="bg-green-700 text-white px-2 py-0.5 text-[9px] font-bold">STATUS: ACTIVE_SESSION</span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 mt-2 gap-2 text-[10px] font-bold text-gray-700">
                                        <div className="bg-white/50 px-2 py-1 border border-gray-400">MODEL: <span className="text-black">{tab.deviceName}</span></div>
                                        <div className="bg-white/50 px-2 py-1 border border-gray-400">OS: <span className="text-black">{tab.os}</span></div>
                                        <div className="bg-white/50 px-2 py-1 border border-gray-400">BROWSER: <span className="text-black">{tab.browser}</span></div>
                                        <div className="bg-white/50 px-2 py-1 border border-gray-400">IP: <span className="text-red-700">{tab.ip}</span></div>
                                        <div className="bg-white/50 px-2 py-1 border border-gray-400">LOCATION: <span className="text-[#000080]">{tab.page}</span></div>
                                        <div className="bg-white/50 px-2 py-1 border border-gray-400">RES: <span className="text-black">{tab.resolution}</span></div>
                                        <div className="bg-white/50 px-2 py-1 border border-gray-400">CORES: <span className="text-black">{tab.cores} vCPU</span></div>
                                        <div className="bg-white/50 px-2 py-1 border border-gray-400">NET: <span className="text-blue-700">{tab.downlink}</span></div>

                                    </div>


                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                    <ResourceCard title="REMOTE_CPU" value={tab.cpu} unit="%" color="text-[#006400]" label="Network_Tab" />
                                    <ResourceCard title="REMOTE_RAM" value={tab.ram} unit="MB" color="text-[#006400]" label="Network_Tab" />
                                    <ResourceCard title="REMOTE_GPU" value={tab.gpu} unit="%" color="text-[#006400]" label="Network_Tab" />
                                </div>

                            </div>
                        ))}
                </div>

                {allTabs.filter(t => t.page !== '/performance').length === 0 && (
                    <div className="border-2 border-dashed border-[#808080] p-10 text-center text-[#808080] text-[10px] font-bold">
                        NO_REMOTE_CLIENTS_DETECTED
                    </div>
                )}
            </div>
        </div>
    );
};

export default Performance;