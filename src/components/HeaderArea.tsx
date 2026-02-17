// src/components/HeaderArea.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ResourceMonitor from './ResourceMonitor';
import { Info as AE1Info } from '../pages/Monitoring/AuxEngine/AE1/Info';

const HeaderArea = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [language, setLanguage] = useState('DE');
    const [theme, setTheme] = useState('LIGHT');

    const getPageTitle = () => {
        const path = location.pathname;

        if (path === '/home') return 'SYSTEM_LAUNCHER';
        if (path === '/monitoring') return 'SELECT_MONITORING_UNIT';
        if (path === '/monitoring/auxiliary') return 'AUX_ENGINE_REGISTRY';

        if (path.includes('/monitoring/auxiliary/ae1')) {
            return `MONITORING_UNIT:${AE1Info.model}`;
        }

        return 'ACKERMAN_V3';
    };

    const menuItems = [
        { label: 'HOME_LAUNCHER', path: '/home', icon: '🏠' },
        { label: 'MONITORING_HUB', path: '/monitoring', icon: '⧉' },
        { label: 'SIMULATION', path: '/simulation', icon: '⚙' },
    ];

    return (
        <div className="h-[6vh] bg-[#d4d0c8] border-b-2 border-b-[#808080] flex items-center px-2 font-mono select-none relative z-50">
            <div className="relative h-3/4">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`h-full px-3 flex items-center gap-2 text-[10px] font-bold border-2 transition-all ${isMenuOpen
                        ? 'bg-[#c0c0c0] border-t-[#808080] border-l-[#808080] border-b-white border-r-white shadow-inner'
                        : 'bg-[#d4d0c8] border-t-white border-l-white border-b-black border-r-black active:border-inset'
                        }`}
                >
                    <div className="flex flex-col gap-[2px]">
                        <div className="w-3 h-[2px] bg-black" />
                        <div className="w-3 h-[2px] bg-black" />
                        <div className="w-3 h-[2px] bg-black" />
                    </div>
                    MENU
                </button>

                {isMenuOpen && (
                    <div className="absolute top-[105%] left-0 w-64 bg-[#d4d0c8] border-2 border-t-white border-l-white border-b-black border-r-black shadow-2xl p-1">
                        <div className="bg-[#000080] text-white px-2 py-0.5 text-[10px] font-bold flex justify-between items-center mb-1">
                            <span>SYSTEM_MENU</span>
                            <button onClick={() => setIsMenuOpen(false)} className="hover:bg-red-600 px-1">×</button>
                        </div>

                        <div className="flex flex-col">
                            <div className="bg-[#808080] text-white px-2 py-[2px] text-[8px] font-bold uppercase">
                                Navigation_Path
                            </div>

                            {menuItems.map((item) => {
                                const isActive = location.pathname === item.path;

                                return (
                                    <Link
                                        key={item.label}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`px-3 py-2 text-[10px] font-bold border-b border-[#b0b0b0] flex items-center gap-2 ${isActive
                                            ? 'bg-[#c0c0c0] text-[#000080]'
                                            : 'hover:bg-[#000080] hover:text-white'
                                            }`}
                                    >
                                        <span className={`w-4 h-4 border flex items-center justify-center text-[10px] ${isActive ? 'border-[#000080]' : 'border-black'}`}>
                                            {item.icon}
                                        </span>
                                        {item.label}
                                    </Link>
                                );
                            })}

                            <div className="bg-[#808080] text-white px-2 py-[2px] text-[8px] font-bold mt-1">
                                SYSTEM_SETTINGS
                            </div>

                            <div className="p-2 flex flex-col gap-2">
                                <div className="grid grid-cols-3 gap-1">
                                    {['DE', 'EN', 'ID'].map((id) => (
                                        <button
                                            key={id}
                                            onClick={() => setLanguage(id)}
                                            className={`py-1 text-[9px] border-2 font-bold ${language === id
                                                ? 'bg-[#c0c0c0] border-t-[#808080] border-l-[#808080] border-b-white border-r-white'
                                                : 'bg-[#d4d0c8] border-t-white border-l-white border-b-black border-r-black'
                                                }`}
                                        >
                                            {id}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex border-2 border-inset bg-[#808080] p-0.5 gap-0.5">
                                    <button
                                        onClick={() => setTheme('LIGHT')}
                                        className={`flex-1 py-1 text-[9px] font-bold transition-all ${theme === 'LIGHT'
                                            ? 'bg-[#d4d0c8] text-black border border-t-white border-l-white border-b-[#404040] border-r-[#404040]'
                                            : 'bg-transparent text-[#c0c0c0]'
                                            }`}
                                    >
                                        LIGHT
                                    </button>
                                    <button
                                        onClick={() => setTheme('DARK')}
                                        className={`flex-1 py-1 text-[9px] font-bold transition-all ${theme === 'DARK'
                                            ? 'bg-[#222] text-white border border-t-[#444] border-l-[#444] border-b-black border-r-black'
                                            : 'bg-transparent text-[#c0c0c0]'
                                            }`}
                                    >
                                        DARK
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
                <div className="bg-[#000080] px-6 py-0.5 shadow-inner border border-[#ffffff40]">
                    <span className="text-white font-black text-sm tracking-[0.15em] italic uppercase whitespace-nowrap">
                        {getPageTitle()}
                    </span>
                </div>
            </div>

            <div className="ml-auto flex items-center gap-3 transform scale-90 origin-right">
                <ResourceMonitor />
            </div>
        </div>
    );
};

export default HeaderArea;