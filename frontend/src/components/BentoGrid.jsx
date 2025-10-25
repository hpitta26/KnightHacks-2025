import PersonalizedTips from './PersonalizedTips';
import Budget from './Budget';
import FloatingChat from './FloatingChat';
import Networth from './Networth';
import Savings from './Savings';

function BentoGrid() {

  return (
    <div className="p-3.5 grid grid-cols-8 grid-rows-2 gap-3.5 h-full">
      <div className="col-span-4 flex h-full flex-col overflow-hidden">
        <Networth />
      </div>
      <div className="col-span-4 flex h-full flex-col overflow-hidden">
        <Budget />
      </div>
      <div className="col-span-3 flex h-full flex-col overflow-hidden">
        <Savings />
      </div>
      <div className="col-span-3 flex h-full flex-col overflow-hidden">
        <PersonalizedTips />
      </div>
      <div className="col-span-2 flex h-full flex-col overflow-hidden">
        <FloatingChat />
      </div>
    </div>
  );
}

export default BentoGrid;
