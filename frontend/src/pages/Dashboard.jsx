import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BentoGrid from '../components/BentoGrid';

function Dashboard({isDark, setIsDark, isLoggedIn, setIsLoggedIn}) {
  // Consultation pipeline state
  const [consultationState, setConsultationState] = useState({
    isActive: false,
    currentStep: null, // 'budget', 'investment-panel', 'ameritrade', 'stocks'
    highlightBudgetPanel: false,
    highlightInvestmentPanel: false,
    highlightAmeritrade: false,
    highlightStocks: false
  });

  const startConsultation = () => {
    setConsultationState({
      isActive: true,
      currentStep: 'budget',
      highlightBudgetPanel: true,
      highlightInvestmentPanel: false,
      highlightAmeritrade: false,
      highlightStocks: false
    });
  };

  const handleBudgetApproved = () => {
    setConsultationState(prev => ({
      ...prev,
      currentStep: 'investment-panel',
      highlightBudgetPanel: false,
      highlightInvestmentPanel: true
    }));
  };

  const handleInvestmentPanelClicked = () => {
    setConsultationState(prev => ({
      ...prev,
      currentStep: 'investment-analysis',
      highlightInvestmentPanel: true,
      highlightAmeritrade: false
    }));
  };

  const handleInvestmentAnalysisCompleted = () => {
    setConsultationState(prev => ({
      ...prev,
      currentStep: 'ameritrade',
      highlightInvestmentPanel: false,
      highlightAmeritrade: true
    }));
  };

  const handleAmeritradeClicked = () => {
    setConsultationState(prev => ({
      ...prev,
      currentStep: 'stocks',
      highlightAmeritrade: false,
      highlightStocks: true
    }));
  };

  const handleStocksClicked = () => {
    setConsultationState({
      isActive: false,
      currentStep: null,
      highlightBudgetPanel: false,
      highlightInvestmentPanel: false,
      highlightAmeritrade: false,
      highlightStocks: false
    });
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-[#141414]">
        <Navbar 
          isDark={isDark} 
          setIsDark={setIsDark} 
          setIsLoggedIn={setIsLoggedIn}
          onStartConsultation={startConsultation}
        />
        <div className="flex flex-1 overflow-hidden">
            <Sidebar 
              consultationState={consultationState}
              onInvestmentPanelClick={handleInvestmentPanelClicked}
              onAmeritradeClick={handleAmeritradeClicked}
              onStocksClicked={handleStocksClicked}
            />
            <main className="flex-1 overflow-auto bg-gray-50 dark:bg-[#0a0a0a]">
                <BentoGrid 
                  consultationState={consultationState}
                  onBudgetApproved={handleBudgetApproved}
                  onInvestmentAnalysisCompleted={handleInvestmentAnalysisCompleted}
                  onStocksClicked={handleStocksClicked}
                />
            </main>
        </div>
    </div>
  );
}

export default Dashboard;

