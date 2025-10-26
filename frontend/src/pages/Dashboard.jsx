import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BentoGrid from '../components/BentoGrid';
import { useConsultation } from '../contexts/ConsultationContext';

function Dashboard({isDark, setIsDark, isLoggedIn, setIsLoggedIn}) {
  const {
    isConsultationMode,
    consultationState,
    investmentAnalysisComplete,
    isInvestmentTabOpen,
    isInvestmentAnalysisLoading,
    setIsInvestmentAnalysisLoading,
    startConsultation,
    handleBudgetApproved,
    handleInvestmentPanelClicked,
    handleInvestmentAnalysisCompleted,
    handleAmeritradeClicked,
    handleStocksClicked
  } = useConsultation();

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-[#141414]">
        <Navbar 
          isDark={isDark} 
          setIsDark={setIsDark} 
          setIsLoggedIn={setIsLoggedIn}
          onStartConsultation={startConsultation}
        />
        <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-auto bg-gray-50 dark:bg-[#0a0a0a]">
                <BentoGrid />
            </main>
        </div>
    </div>
  );
}

export default Dashboard;

