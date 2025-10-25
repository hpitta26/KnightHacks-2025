import { useState } from 'react';
import { BsPiggyBankFill } from "react-icons/bs";
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Savings from './Savings';
import Activity from './Activity';

function SavingsActivityPanel() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-[#38393c] overflow-hidden h-full flex flex-col relative">
      {/* Header */}
      <div className="py-2 px-3 border-b border-gray-200 dark:border-[#38393c] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center">
            <BsPiggyBankFill className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-end gap-1">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">
              {currentPage === 1 ? 'Savings' : 'Activity'}
            </h2>
          </div>
        </div>
      </div>

      {/* Page 1: Savings Progress */}
      {currentPage === 1 && (
        <Savings />
      )}

      {/* Page 2: Activity */}
      {currentPage === 2 && (
        <Activity />
      )}

      {/* Pagination */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 p-2 bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-sm dark:border-[#38393c]">
        <button 
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <HiChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 px-2">
          {currentPage}/{totalPages}
        </span>
        
        <button 
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <HiChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
}

export default SavingsActivityPanel;