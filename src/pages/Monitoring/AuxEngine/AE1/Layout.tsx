// src/pages/Monitoring/AuxEngine/AE1/Layout.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SidebarOverview from './components/SidebarOverview.tsx';
import Summary from './sections/Summary.tsx';
import EngineCore from './sections/EngineCore.tsx';
import Lubrication from './sections/Lubrication.tsx';
import CoolingSystem from './sections/CoolingSystem.tsx';
import FuelSystem from './sections/FuelSystem.tsx';
import AirTurbo from './sections/AirTurbo.tsx';
import Vibration from './sections/Vibration.tsx';
import LogsEvents from './sections/LogsEvents.tsx';
import TrendAnalysis from './sections/TrendAnalysis.tsx';
import Condition from './sections/Condition.tsx';

const Layout: React.FC = () => {
    const { sectionId } = useParams();
    const navigate = useNavigate();

    const activeSection = sectionId?.toUpperCase() || 'SUMMARY';

    useEffect(() => {
        if (!sectionId) {
            navigate(`/monitoring/auxiliary/ae1/summary`, { replace: true });
        }
    }, [sectionId, navigate]);

    const handleSectionChange = (section: string) => {
        navigate(`/monitoring/auxiliary/ae1/${section.toLowerCase()}`);
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'SUMMARY':
                return <Summary onNavigate={handleSectionChange} />;
            case 'CONDITION':
                return <Condition />;
            case 'CORE':
                return <EngineCore />;
            case 'LUBE':
                return <Lubrication />;
            case 'COOLING':
                return <CoolingSystem />;
            case 'FUEL':
                return <FuelSystem />;
            case 'AIR':
                return <AirTurbo />;
            case 'VIB':
                return <Vibration />;
            case 'LOGS':
                return <LogsEvents />;
            case 'TREND':
                return <TrendAnalysis />;
            default:
                return <Summary onNavigate={handleSectionChange} />;
        }
    };

    return (
        <div className="flex w-full h-[91.5vh] bg-[#d4d0c8] overflow-hidden">
            <SidebarOverview
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
            />
            <div className="flex-1 overflow-y-auto bg-[#c0c0c0] custom-scrollbar">
                {renderContent()}
            </div>
        </div>
    );
};

export default Layout;