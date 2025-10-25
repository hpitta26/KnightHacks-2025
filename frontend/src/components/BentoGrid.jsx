import PersonalizedTips from './PersonalizedTips';
import Budget from './Budget';
import FloatingChat from './FloatingChat';
import Networth from './Networth';

function BentoGrid() {

  return (
    <div className="p-3.5 grid grid-cols-4 grid-rows-2 gap-3.5 h-full">
      <div className="col-span-2 flex h-full flex-col overflow-hidden">
        <Networth />
      </div>
      <div className="col-span-2 flex h-full flex-col overflow-hidden">
        <Budget />
      </div>
      <div className="col-span-3 flex h-full flex-col overflow-hidden">
        <PersonalizedTips />
      </div>
      <div className="col-span-1 flex h-full flex-col overflow-hidden">
        <FloatingChat />
      </div>
    </div>
  );
}

export default BentoGrid;
