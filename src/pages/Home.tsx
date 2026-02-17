// src/pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full bg-[#c0c0c0] p-6 flex flex-col items-center justify-center font-mono overflow-hidden">
            <div className="w-full max-w-5xl">
                <div className="bg-[#000080] text-white px-3 py-1.5 text-[11px] font-black flex items-center justify-between mb-4 border-2 border-t-[#ffffff40] border-l-[#ffffff40] border-b-black border-r-black">
                    <div className="flex items-center gap-2">
                        <span>💻</span> ACKERMAN_SYSTEM_LAUNCHER
                    </div>
                    <span className="opacity-50 text-[9px]">V3.4.0_PROD</span>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <button
                        onClick={() => navigate('/monitoring')}
                        className="group relative p-1 border-2 transition-all bg-[#d4d0c8] border-t-white border-l-white border-b-black border-r-black hover:bg-[#ffffff] active:border-inset shadow-md"
                    >
                        <div className="border border-black/10 p-10 flex flex-col items-center gap-4">
                            <div className="text-6xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                                ⧉
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[13px] font-black tracking-tighter text-[#000080]">
                                    OPERATIONAL_MONITORING
                                </span>
                                <span className="text-[9px] font-bold text-gray-500 uppercase italic">
                                    LIVE_DIAGNOSTICS_INTERFACE
                                </span>
                            </div>
                            <div className="mt-4 px-4 py-1.5 bg-[#808080] text-white text-[10px] font-black group-hover:bg-[#000080] shadow-[1px_1px_0px_white]">
                                EXECUTE_MODULE
                            </div>
                        </div>
                    </button>

                    <button
                        disabled
                        className="group relative p-1 border-2 transition-all bg-gray-300 border-[#808080] opacity-60 cursor-not-allowed"
                    >
                        <div className="border border-transparent p-10 flex flex-col items-center gap-4">
                            <div className="text-6xl grayscale">
                                ⚙
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[13px] font-black tracking-tighter text-gray-500">
                                    SYSTEM_SIMULATION
                                </span>
                                <span className="text-[9px] font-bold text-gray-500 uppercase italic">
                                    OFFLINE_MODE_ONLY
                                </span>
                            </div>
                            <div className="mt-4 px-4 py-1.5 bg-gray-400 text-gray-200 text-[10px] font-black">
                                LOCKED
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <div className="absolute bottom-4 right-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] opacity-40">
                SYSTEM_REF: ACKERMAN_CORE_MAIN
            </div>
        </div>
    );
};

export default Home;