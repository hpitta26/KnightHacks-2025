import { createContext, useContext, useState, useEffect } from 'react';

const ConsultationContext = createContext();

export const useConsultation = () => {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error('useConsultation must be used within a ConsultationProvider');
  }
  return context;
};

export const ConsultationProvider = ({ children }) => {
  // Global consultation mode state
  const [isConsultationMode, setIsConsultationMode] = useState(false);
  
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
  const [chatMessage, setChatMessage] = useState('');

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
    setIsConsultationMode(true);
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
    // Add residual income analysis message directly
    const residualIncomeMessage = {
      id: Date.now(),
      role: 'assistant',
      content: `Based on your financial analysis, I've identified $2,000 in residual income that can be strategically allocated.

**Recommended Allocation:**

**Savings (40% - $800):**
- Emergency Fund: $400 - Build your emergency fund to cover 3-6 months of expenses
- High-Yield Savings: $400 - Consider a high-yield savings account for short-term goals

**Investments (60% - $1,200):**
- Retirement Accounts: $600 - Maximize your 401(k) or IRA contributions
- Index Funds: $400 - Invest in diversified index funds like VTI or SPY
- Individual Stocks: $200 - Consider blue-chip stocks for long-term growth

**Next Steps:**
1. Set up automatic transfers to your savings account
2. Increase your 401(k) contribution by $600/month
3. Open a brokerage account for the remaining $600
4. Review and rebalance quarterly

This allocation balances growth potential with financial security, ensuring your money works for you while maintaining liquidity for unexpected expenses.`,
      timestamp: new Date()
    };
    
    // We need to trigger this through the FloatingChat component
    // For now, we'll set a special message that the FloatingChat can detect
    setChatMessage('CONSULTATION_RESIDUAL_INCOME_ANALYSIS');
    
    // End consultation after showing residual income analysis
    setTimeout(() => {
      setIsConsultationMode(false);
      setConsultationState({
        isActive: false,
        currentStep: null,
        highlightBudgetPanel: false,
        highlightInvestmentPanel: false,
        highlightAmeritrade: false,
        highlightStocks: false
      });
    }, 1000); // Small delay to let user see the message
  };

  const handleInvestmentAnalysis = () => {
    setIsInvestmentAnalysisLoading(true);
    // Update consultation state to trigger investment analysis in BentoGrid
    setConsultationState(prev => ({
      ...prev,
      currentStep: 'investment-analysis'
    }));
  };

  const value = {
    // State
    isConsultationMode,
    consultationState,
    investmentAnalysisComplete,
    isInvestmentTabOpen,
    isInvestmentAnalysisLoading,
    chatMessage,
    
    // Setters
    setIsInvestmentAnalysisLoading,
    setChatMessage,
    
    // Actions
    startConsultation,
    handleBudgetApproved,
    handleInvestmentPanelClicked,
    handleInvestmentAnalysisCompleted,
    handleAmeritradeClicked,
    handleStocksClicked,
    handleInvestmentAnalysis
  };

  return (
    <ConsultationContext.Provider value={value}>
      {children}
    </ConsultationContext.Provider>
  );
};
