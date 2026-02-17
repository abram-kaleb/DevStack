// src/pages/Simulation.tsx
import React from 'react';

const Simulation: React.FC = () => {
    return (
        <div className="w-full h-[92vh] bg-[#333] p-8 font-mono flex flex-col items-center justify-center gap-4">
            <div className="border-4 border-yellow-500 p-6 bg-black text-yellow-500 animate-pulse text-center">
                <p className="text-2xl font-black">SIMULATION_MODE_ACTIVE</p>
                <p className="text-[10px]">REAL-TIME_IO_DISABLED</p>
            </div>
            <button className="px-10 py-3 border-2 border-t-white border-l-white border-b-black border-r-black bg-[#d4d0c8] font-bold">START_STRESS_TEST</button>
        </div>
    );
};

export default Simulation;