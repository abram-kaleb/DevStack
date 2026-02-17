// src/pages/Overview/OverviewLayout.tsx
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

const Layout: React.FC = () => {
    const { moduleId, sectionId } = useParams();
    const navigate = useNavigate();

    const activeSection = sectionId?.toUpperCase() || 'SUMMARY';

    useEffect(() => {
        if (!sectionId) {
            navigate(`/home/${moduleId}/summary`, { replace: true });
        }
    }, [sectionId, moduleId, navigate]);

    const handleSectionChange = (section: string) => {
        navigate(`/home/${moduleId}/${section.toLowerCase()}`);
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'SUMMARY':
                return <Summary />;
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
                return <Summary />;
        }
    };

    return (
        <div className="flex w-full h-[92vh] bg-[#d4d0c8] overflow-hidden">
            <SidebarOverview
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
            />
            <div className="flex-1 overflow-y-auto bg-[#c0c0c0] p-1 custom-scrollbar">
                {renderContent()}
            </div>
        </div>
    );
};

export default Layout;