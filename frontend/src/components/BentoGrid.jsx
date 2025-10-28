import { useState, useEffect } from 'react';
import PersonalizedTips from './PersonalizedTips';
import BudgetSpendingPanel from './BudgetSpendingPanel';
import FloatingChat from './FloatingChat';
import Networth from './Networth';
import SavingsActivityPanel from './SavingsActivityPanel';
import { useConsultation } from '../contexts/ConsultationContext';

function BentoGrid() {
  const {
    consultationState,
    handleBudgetApproved,
    setIsInvestmentAnalysisLoading
  } = useConsultation();
  const [chatMessage, setChatMessage] = useState('');
  const [budgetData, setBudgetData] = useState(null);

  const handleConsult = (tip) => {
    setChatMessage(`Consult me on:\n${tip}`);
  };

  const handleBudgetApprovedLocal = (newBudgetData) => {
    setBudgetData(newBudgetData);
    handleBudgetApproved();
  };

  // Trigger budget analysis when consultation starts
  useEffect(() => {
    if (consultationState.isActive && consultationState.currentStep === 'budget') {
      handleBudgetAnalysis();
    }
  }, [consultationState]);

  // Trigger investment analysis when step changes to investment-analysis
  useEffect(() => {
    if (consultationState.isActive && consultationState.currentStep === 'investment-analysis') {
      handleInvestmentAnalysis();
    }
  }, [consultationState]);

  const handleBudgetAnalysis = async () => {
    const budgetConfig = {
      message: 'Analyze my budget',
      endpoint: '/api/analyze_budget',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      processResponse: (data) => {
        let formattedResponse = '';
        if (data.budget_adjustments && Array.isArray(data.budget_adjustments)) {
          formattedResponse += '**Budget Adjustments:**';
          data.budget_adjustments.forEach(adjustment => {
            formattedResponse += `\n\n**${adjustment.category}:**\n- Previous Value: $${adjustment.amount}\n- New Value: $${adjustment.newAmount}`;
          });
        }
        if (data.insights && Array.isArray(data.insights)) {
          formattedResponse += `\n\n**Key Insights:**\n${data.insights.map(insight => `• ${insight}`).join('\n')}`;
        }
        return formattedResponse;
      },
      onSuccess: (data) => {
        // This will be handled by the FloatingChat component
      }
    };

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      role: 'user',
      content: budgetConfig.message,
      timestamp: new Date()
    };
    
    // We need to trigger this through the FloatingChat component
    // For now, we'll set a special message that the FloatingChat can detect
    setChatMessage('CONSULTATION_BUDGET_ANALYSIS');
  };

  const handleInvestmentAnalysis = () => {
    setIsInvestmentAnalysisLoading(true);
    setChatMessage('CONSULTATION_INVESTMENT_ANALYSIS');
  };

  return (
    <div className="p-3.5 grid grid-cols-8 grid-rows-2 gap-3.5 h-full">
      <div className="col-span-4 flex h-full flex-col overflow-hidden">
        <Networth />
      </div>
      <div className={`col-span-4 flex h-full flex-col overflow-hidden ${consultationState.highlightBudgetPanel ? 'consultation-highlight rounded-2xl' : ''}`}>
        <BudgetSpendingPanel budgetData={budgetData} consultationState={consultationState} />
      </div>
      <div className="col-span-3 flex h-full flex-col overflow-hidden">
        <SavingsActivityPanel />
      </div>
      <div className="col-span-3 flex h-full flex-col overflow-hidden">
        <PersonalizedTips onConsult={handleConsult} />
      </div>
      <div className="col-span-2 flex h-full flex-col overflow-hidden relative z-50">
        <FloatingChat 
          messageValue={chatMessage} 
          onMessageChange={setChatMessage} 
          onBudgetApproved={handleBudgetApprovedLocal}
        />
      </div>
    </div>
  );
}

export default BentoGrid;
