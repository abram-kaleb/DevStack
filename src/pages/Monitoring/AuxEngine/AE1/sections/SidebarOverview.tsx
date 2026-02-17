// src/pages/Overview/components/SidebarOverview.tsx
import React from 'react';

interface SidebarProps {
    activeSection: string;
    onSectionChange: (id: string) => void;
}

const SidebarOverview: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
    const navItems = [
        { id: 'SUMMARY', label: '0.0 SUMMARY', status: 'NORMAL' },
        { id: 'CORE', label: '1.0 CORE', status: 'NORMAL' },
        { id: 'LUBE', label: '2.0 LUBE', status: 'CRITICAL' },
        { id: 'COOLING', label: '3.0 COOLING', status: 'WARNING' },
        { id: 'FUEL', label: '4.0 FUEL', status: 'NORMAL' },
        { id: 'AIR', label: '5.0 AIR', status: 'NORMAL' },
        { id: 'VIB', label: '6.0 VIB', status: 'NORMAL' },
        { id: 'LOGS', label: '7.0 LOGS', status: 'CRITICAL' },
        { id: 'TREND', label: '8.0 TREND', status: 'NORMAL' },
    ];

    return (
        <aside className="w-48 h-full border-r-2 border-[#808080] bg-[#d4d0c8] flex flex-col font-mono text-black select-none">
            <div className="bg-[#808080] text-white px-2 py-1 text-[9px] font-bold border-b border-white/20">
                SECTION_INDEX
            </div>

            <nav className="flex-1 flex flex-col p-1 gap-[2px] bg-[#c0c0c0] overflow-y-auto custom-scrollbar">
                {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onSectionChange(item.id)}
                            className={`flex items-center px-2 py-2 text-[10px] font-bold border transition-all
                                ${isActive
                                    ? 'bg-[#000080] text-white border-t-black border-l-black border-b-[#ffffff40] border-r-[#ffffff40]'
                                    : 'bg-[#d4d0c8] border-t-white border-l-white border-b-black border-r-black hover:bg-[#e0e0e0] active:border-inset'
                                }`}
                        >
                            <div className={`w-1.5 h-1.5 mr-2 ${item.status === 'CRITICAL' ? 'bg-red-600 animate-pulse' :
                                item.status === 'WARNING' ? 'bg-yellow-400' : 'bg-green-600'
                                }`} />
                            <span className="truncate">{item.label}</span>
                            {isActive && <span className="ml-auto text-[8px]">▶</span>}
                        </button>
                    );
                })}
            </nav>

            <div className="bg-[#d4d0c8] border-t-2 border-[#808080] p-1">
                <div className="border border-inset bg-[#eeeeee] px-2 py-1 flex flex-col">
                    <span className="text-[7px] font-bold text-[#808080]">ACTIVE_ID</span>
                    <span className="text-[9px] font-bold truncate text-[#000080]">{activeSection}</span>
                </div>
            </div>

            <div className="h-6 bg-[#000080] text-white flex items-center px-2 text-[8px] font-bold">
                <span className="animate-pulse mr-2">●</span>
                READY
            </div>
        </aside>
    );
};

export default SidebarOverview;