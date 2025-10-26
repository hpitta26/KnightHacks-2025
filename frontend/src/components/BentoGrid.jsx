import { useState } from 'react';
import PersonalizedTips from './PersonalizedTips';
import BudgetSpendingPanel from './BudgetSpendingPanel';
import FloatingChat from './FloatingChat';
import Networth from './Networth';
import SavingsActivityPanel from './SavingsActivityPanel';

function BentoGrid() {
  const [chatMessage, setChatMessage] = useState('');

  const handleConsult = (tip) => {
    setChatMessage(`Consult me on <tip>${tip}</tip>`);
  };

  return (
    <div className="p-3.5 grid grid-cols-8 grid-rows-2 gap-3.5 h-full">
      <div className="col-span-4 flex h-full flex-col overflow-hidden">
        <Networth />
      </div>
      <div className="col-span-4 flex h-full flex-col overflow-hidden">
        <BudgetSpendingPanel />
      </div>
      <div className="col-span-3 flex h-full flex-col overflow-hidden">
        <SavingsActivityPanel />
      </div>
      <div className="col-span-3 flex h-full flex-col overflow-hidden">
        <PersonalizedTips onConsult={handleConsult} />
      </div>
      <div className="col-span-2 flex h-full flex-col overflow-hidden">
        <FloatingChat messageValue={chatMessage} onMessageChange={setChatMessage} />
      </div>
    </div>
  );
}

export default BentoGrid;
