// src/pages/Overview/components/SidebarOverview.tsx
import React from 'react';

interface SidebarProps {
    activeSection: string;
    onSectionChange: (id: string) => void;
}

const SidebarOverview: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
    const navItems = [
        { id: 'SUMMARY', label: 'SUMMARY' },
        { id: 'CORE', label: 'ENGINE_CORE' },
        { id: 'LUBE', label: 'LUBRICATION' },
        { id: 'COOLING', label: 'COOLING_SYSTEM' },
        { id: 'FUEL', label: 'FUEL_SYSTEM' },
        { id: 'AIR', label: 'AIR_TURBO' },
        { id: 'VIB', label: 'VIBRATION' },
        { id: 'LOGS', label: 'LOGS_EVENTS' },
        { id: 'TREND', label: 'TREND_ANALYSIS' },
    ];

    return (
        <aside className="w-44 h-full border-r-2 border-[#808080] bg-[#d4d0c8] flex flex-col font-mono text-black select-none">
            <div className="bg-[#000080] text-white px-2 py-1.5 text-[11px] font-bold">
                OVERVIEW_MAP
            </div>

            <nav className="flex-1 flex flex-col p-1 gap-1 bg-[#c0c0c0] overflow-y-auto custom-scrollbar">
                {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onSectionChange(item.id)}
                            className={`flex items-center px-3 py-3 text-[12px] font-black border-2 transition-all text-left
                                ${isActive
                                    ? 'bg-[#ffffff] text-[#000080] border-t-black border-l-black border-b-white border-r-white shadow-inner'
                                    : 'bg-[#d4d0c8] border-t-white border-l-white border-b-black border-r-black hover:bg-[#e0e0e0] active:border-inset'
                                }`}
                        >
                            <span className="truncate tracking-tight">{item.label}</span>
                            {isActive && <span className="ml-auto text-[10px]">▶</span>}
                        </button>
                    );
                })}
            </nav>

            <div className="p-2 border-t-2 border-[#808080] bg-[#d4d0c8]">
                <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-bold text-[#404040]">LOC:</span>
                    <span className="text-[11px] font-black text-[#000080]">{activeSection}</span>
                </div>
            </div>
        </aside>
    );
};

export default SidebarOverview;