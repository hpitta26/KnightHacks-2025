import { useState } from 'react';
import PersonalizedTips from './PersonalizedTips';
import Budget from './Budget';
import FloatingChat from './FloatingChat';
import Networth from './Networth';

function BentoGrid() {
  const components = [
    <PersonalizedTips key="tips" />,
    <Budget key="budget" />,
    <Networth key="networth" />,
    <FloatingChat key="chat" />
  ];

  const getGridLayout = (componentCount) => {
    switch (componentCount) {
      case 1:
        return "grid-cols-1 grid-rows-1";
      case 2:
        return "grid-cols-2 grid-rows-1";
      case 3:
        return "grid-cols-2 grid-rows-2";
      case 4:
        return "grid-cols-2 grid-rows-2";
      default:
        return "grid-cols-2 grid-rows-2";
    }
  };

  return (
    <div className={`p-4.5 grid ${getGridLayout(components.length)} gap-4 h-full`}>
        {components}
    </div>
  );
}

export default BentoGrid;
