import { HiCurrencyDollar, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import BudgetOverview from './BudgetOverview';
import SpendingChart from './SpendingChart';

export default function Budget() {
    const [currentPage, setCurrentPage] = useState(1);
    const [budgetTargets, setBudgetTargets] = useState([]);
    const [loading, setLoading] = useState(true);
    const totalPages = 2;
    
    const currentMonth = "December";
    
    // Calculate totals from fetched data
    const currentSpent = budgetTargets.reduce((sum, item) => sum + item.spent, 0);
    const currentBudget = budgetTargets.reduce((sum, item) => sum + item.amount, 0);
    const lastMonthSpent = budgetTargets.reduce((sum, item) => sum + item.lastMonthSpent, 0);
    
    const progressPercentage = currentBudget > 0 ? (currentSpent / currentBudget) * 100 : 0;
    const lastMonthPercentage = currentBudget > 0 ? (lastMonthSpent / currentBudget) * 100 : 0;
    const difference = currentSpent - lastMonthSpent;
    const isUnderBudget = difference < 0;

    // Fetch budget data from backend
    useEffect(() => {
        const fetchBudgetData = async () => {
            try {
                const response = await fetch('http://localhost:8000/get_budget');
                if (!response.ok) {
                    throw new Error('Failed to fetch budget data');
                }
                const data = await response.json();
                setBudgetTargets(data);
            } catch (error) {
                console.error('Error fetching budget data:', error);
                // Fallback to empty array if fetch fails
                setBudgetTargets([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBudgetData();
    }, []);

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

    if (loading) {
        return (
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg border border-gray-200 dark:border-[#38393c] overflow-hidden flex flex-col relative">
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
                <div className="flex items-center justify-center p-8">
                    <div className="text-gray-500 dark:text-gray-400">Loading budget data...</div>
                </div>
            </div>
        );
    }

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
