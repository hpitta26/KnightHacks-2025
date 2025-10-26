import { useState, useEffect } from 'react';
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
    highlightStocks: false,
    isInvestmentAnalysisLoading: false
  });
  
  // Track investment analysis completion and tab state
  const [investmentAnalysisComplete, setInvestmentAnalysisComplete] = useState(false);
  const [isInvestmentTabOpen, setIsInvestmentTabOpen] = useState(false);
  const [isInvestmentAnalysisLoading, setIsInvestmentAnalysisLoading] = useState(false);

  // Handle blinking logic when tab state changes after analysis is complete
  useEffect(() => {
    if (investmentAnalysisComplete && !isInvestmentAnalysisLoading) {
      setConsultationState(prev => ({
        ...prev,
        highlightInvestmentPanel: !isInvestmentTabOpen // Blink if closed, don't blink if open
      }));
    }
  }, [isInvestmentTabOpen, investmentAnalysisComplete, isInvestmentAnalysisLoading]);

  // Handle blinking logic during loading
  useEffect(() => {
    setConsultationState(prev => ({
      ...prev,
      isInvestmentAnalysisLoading: isInvestmentAnalysisLoading,
      highlightInvestmentPanel: isInvestmentAnalysisLoading ? true : prev.highlightInvestmentPanel
    }));
  }, [isInvestmentAnalysisLoading]);

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
    const newTabState = !isInvestmentTabOpen;
    setIsInvestmentTabOpen(newTabState);
    setConsultationState(prev => ({
      ...prev,
      currentStep: 'investment-analysis',
      highlightInvestmentPanel: isInvestmentAnalysisLoading ? true : (investmentAnalysisComplete && !newTabState),
    }));
  };

  const handleInvestmentAnalysisCompleted = () => {
    setInvestmentAnalysisComplete(true);
    setIsInvestmentAnalysisLoading(false); // Stop loading when analysis is complete
    setConsultationState(prev => ({
      ...prev,
      currentStep: 'ameritrade',
      highlightInvestmentPanel: !isInvestmentTabOpen,
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
              onInvestmentAnalysisCompleted={handleInvestmentAnalysisCompleted}
              isInvestmentTabOpen={isInvestmentTabOpen}
              investmentAnalysisComplete={investmentAnalysisComplete}
            />
            <main className="flex-1 overflow-auto bg-gray-50 dark:bg-[#0a0a0a]">
                <BentoGrid 
                  consultationState={consultationState}
                  onBudgetApproved={handleBudgetApproved}
                  onInvestmentAnalysisCompleted={handleInvestmentAnalysisCompleted}
                  onStocksClicked={handleStocksClicked}
                  setIsInvestmentAnalysisLoading={setIsInvestmentAnalysisLoading}
                />
            </main>
        </div>
    </div>
  );
}

export default Dashboard;

