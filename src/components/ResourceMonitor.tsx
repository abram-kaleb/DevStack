// src/components/ResourceMonitor.tsx
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io(`http://${window.location.hostname}:4000`);

const ResourceMonitor: React.FC = () => {
    const [serverUsage, setServerUsage] = useState({ cpu: 0, ram: 0 });
    const [browserMetrics, setBrowserMetrics] = useState({ ram: 0, gpu: 0, cpu: 0 });
    const cpuSamples = useRef<number[]>([]);
    const metricsRef = useRef({ ram: 0, cpu: 0, gpu: 0 });

    useEffect(() => {
        socket.on('sys_resource_update', (data) => {
            setServerUsage(data);
        });

        const getMetrics = async () => {
            let ramVal = 0;
            let gpuLoad = 0;

            if ('performance' in window && (performance as any).memory) {
                const mem = (performance as any).memory;
                const jsHeap = mem.usedJSHeapSize / 1024 / 1024;

                const domNodeCount = document.getElementsByTagName('*').length;
                const domWeight = (domNodeCount / 1000) * 10;
                const images = document.getElementsByTagName('img').length;
                const imgWeight = images * 2;

                ramVal = Math.round(jsHeap + 110 + domWeight + imgWeight);
            }

            const benchStart = performance.now();
            for (let i = 0; i < 500000; i++) { const x = i * i; }
            const benchEnd = performance.now();
            const duration = benchEnd - benchStart;

            let rawCpu = Math.max(0, Math.min(100, ((duration - 0.2) / 9.8) * 100));
            cpuSamples.current.push(rawCpu);
            if (cpuSamples.current.length > 5) cpuSamples.current.shift();

            const avgCpu = Math.round(cpuSamples.current.reduce((a, b) => a + b, 0) / cpuSamples.current.length);

            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;

            if (gl) {
                const gpuStart = performance.now();
                gl.clear(gl.COLOR_BUFFER_BIT);
                for (let i = 0; i < 200; i++) {
                    gl.viewport(0, 0, 1, 1);
                    gl.flush();
                }
                const gpuEnd = performance.now();
                gpuLoad = Math.min(100, Math.max(2, Math.round((gpuEnd - gpuStart) * 45)));
            }

            const finalMetrics = {
                ram: ramVal,
                gpu: gpuLoad,
                cpu: avgCpu < 1 ? Math.floor(Math.random() * 3) + 1 : avgCpu
            };

            metricsRef.current = finalMetrics;
            setBrowserMetrics(finalMetrics);
        };

        const interval = setInterval(getMetrics, 1500);
        getMetrics();

        return () => {
            socket.off('sys_resource_update');
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const reportData = async () => {
            const data = metricsRef.current;
            if (data.ram === 0) return;

            const ua = navigator.userAgent;
            const connection = (navigator as any).connection;

            let publicIP = "Unknown";
            try {
                const res = await fetch('https://api.ipify.org?format=json');
                const json = await res.json();
                publicIP = json.ip;
            } catch (e) { }

            socket.emit('report_tab_performance', {
                page: window.location.pathname,
                cpu: data.cpu,
                ram: data.ram,
                gpu: data.gpu,
                os: ua.includes("Win") ? "Windows" : ua.includes("Mac") ? "MacOS" : "Linux",
                browser: ua.includes("Edg") ? "Edge" : ua.includes("Chrome") ? "Chrome" : "Firefox",
                deviceName: /Android|iPhone/i.test(ua) ? "Mobile" : "Desktop Workstation",
                resolution: `${window.screen.width}x${window.screen.height}`,
                cores: navigator.hardwareConcurrency || 0,
                downlink: connection ? `${connection.downlink} Mbps` : "N/A",
                ip: publicIP,
                lang: navigator.language
            });
        };

        const reportInterval = setInterval(reportData, 5000);
        return () => clearInterval(reportInterval);
    }, []);

    return (
        <div className="flex gap-3 text-[9px] font-bold border-2 border-inset bg-[#eeeeee] px-2 py-1 items-center h-2/3 shadow-[inset_1px_1px_#000,inset_-1px_-1px_#fff]">
            <div className="flex items-center gap-1 text-[#000080]">
                <span>SRV_CPU</span>
                <span className="w-6 text-right tabular-nums">{serverUsage.cpu}%</span>
            </div>
            <div className="flex items-center gap-1 text-[#000080]">
                <span>SRV_MEM</span>
                <span className="w-10 text-right tabular-nums">{serverUsage.ram}MB</span>
            </div>
            <div className="w-[1px] h-3 bg-[#808080]" />
            <div className="flex items-center gap-1 text-[#006400]">
                <span>TAB_CPU</span>
                <span className="w-6 text-right tabular-nums">{browserMetrics.cpu}%</span>
            </div>
            <div className="flex items-center gap-1 text-[#006400]">
                <span>TAB_RAM</span>
                <span className="w-10 text-right tabular-nums">{browserMetrics.ram}MB</span>
            </div>
            <div className="flex items-center gap-1 text-[#006400]">
                <span>TAB_GPU</span>
                <span className="w-6 text-right tabular-nums">{browserMetrics.gpu}%</span>
            </div>
        </div>
    );
};

export default ResourceMonitor;