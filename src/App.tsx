// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HeaderArea from './components/HeaderArea';
import FooterArea from './components/FooterArea';
import Home from './pages/Home';
import Monitoring from './pages/Monitoring/Monitoring';
import AuxEngine from './pages/Monitoring/AuxEngine/AuxEngine';
import AE1Layout from './pages/Monitoring/AuxEngine/AE1/Layout';

const App: React.FC = () => {
    return (
        <Router>
            <div className="flex flex-col h-screen font-mono bg-[#d4d0c8] overflow-hidden">
                <HeaderArea />
                <div className="flex-1 overflow-hidden relative">
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/monitoring" element={<Monitoring />} />
                        <Route path="/monitoring/auxiliary" element={<AuxEngine />} />

                        {/* Pastikan path ini sesuai dengan yang dipanggil di navigate */}
                        <Route path="/monitoring/auxiliary/ae1/:sectionId?" element={<AE1Layout />} />

                        <Route path="/" element={<Navigate to="/home" replace />} />
                        <Route path="*" element={<Navigate to="/home" replace />} />
                    </Routes>
                </div>
                <FooterArea />
            </div>
        </Router>
    );
};

export default App;