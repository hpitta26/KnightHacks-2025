import { HiCurrencyDollar, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useState } from 'react';
import BudgetOverview from './BudgetOverview';
import SpendingChart from './SpendingChart';

export default function Budget() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 2;
    
    const currentMonth = "December";
    const currentSpent = 1222;
    const currentBudget = 5230;
    const lastMonthSpent = 1322;
    const progressPercentage = (currentSpent / currentBudget) * 100;
    const lastMonthPercentage = (lastMonthSpent / currentBudget) * 100;
    const difference = currentSpent - lastMonthSpent;
    const isUnderBudget = difference < 0;

    const budgetTargets = [
        { category: "Rent", amount: 1500, spent: 1500 },
        { category: "Car Insurance", amount: 300, spent: 300 },
        { category: "Groceries", amount: 400, spent: 350 },
        { category: "Utilities", amount: 200, spent: 180 },
        { category: "Entertainment", amount: 300, spent: 350 },
        { category: "Savings", amount: 1000, spent: 500 },
        { category: "Transportation", amount: 200, spent: 150 },
        { category: "Healthcare", amount: 150, spent: 100 },
        { category: "Phone Bill", amount: 80, spent: 80 },
        { category: "Internet", amount: 60, spent: 60 },
        { category: "Gym Membership", amount: 50, spent: 50 },
        { category: "Coffee & Dining", amount: 200, spent: 250 },
        { category: "Clothing", amount: 150, spent: 120 },
        { category: "Gas", amount: 180, spent: 160 },
        { category: "Subscriptions", amount: 40, spent: 40 },
        { category: "Emergency Fund", amount: 500, spent: 300 },
        { category: "Travel Fund", amount: 300, spent: 200 },
        { category: "Gifts", amount: 100, spent: 80 },
        { category: "Dining Out", amount: 150, spent: 200 }
    ];

    const sortedBudgetTargets = [...budgetTargets].sort((a, b) => {
        const aOverBudget = a.spent > a.amount;
        const bOverBudget = b.spent > b.amount;
        const aCompleted = a.spent >= a.amount && !aOverBudget;
        const bCompleted = b.spent >= b.amount && !bOverBudget;
        
        // Over-budget items first
        if (aOverBudget && !bOverBudget) return -1;
        if (!aOverBudget && bOverBudget) return 1;
        
        // Then completed items
        if (aCompleted && !bCompleted) return -1;
        if (!aCompleted && bCompleted) return 1;
        
        return 0;
    });

    return (
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-[#38393c] overflow-hidden flex flex-col relative">
            <div className="py-2 px-3 border-b border-gray-200 dark:border-[#38393c]">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                        <HiCurrencyDollar className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                            {currentPage === 1 ? 'Budget' : 'Spending'}
                        </h2>
                    </div>
                </div>
            </div>

            {currentPage === 1 && (
                <BudgetOverview
                    currentMonth={currentMonth}
                    currentSpent={currentSpent}
                    currentBudget={currentBudget}
                    lastMonthSpent={lastMonthSpent}
                    progressPercentage={progressPercentage}
                    lastMonthPercentage={lastMonthPercentage}
                    difference={difference}
                    isUnderBudget={isUnderBudget}
                    sortedBudgetTargets={sortedBudgetTargets}
                />
            )}
            
            {currentPage === 2 && (
                <SpendingChart />
            )}
            
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
