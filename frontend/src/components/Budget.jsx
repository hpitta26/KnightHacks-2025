import { HiCurrencyDollar, HiTrendingDown, HiTrendingUp, HiCheck } from 'react-icons/hi';

export default function Budget() {
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
        { category: "Entertainment", amount: 300, spent: 200 },
        { category: "Savings", amount: 1000, spent: 500 },
        { category: "Transportation", amount: 200, spent: 150 },
        { category: "Healthcare", amount: 150, spent: 100 },
        { category: "Phone Bill", amount: 80, spent: 80 },
        { category: "Internet", amount: 60, spent: 60 },
        { category: "Gym Membership", amount: 50, spent: 50 },
        { category: "Coffee & Dining", amount: 200, spent: 180 },
        { category: "Clothing", amount: 150, spent: 120 },
        { category: "Gas", amount: 180, spent: 160 },
        { category: "Subscriptions", amount: 40, spent: 40 },
        { category: "Emergency Fund", amount: 500, spent: 300 },
        { category: "Travel Fund", amount: 300, spent: 200 },
        { category: "Gifts", amount: 100, spent: 80 }
    ];

    // Sort completed items to the top
    const sortedBudgetTargets = [...budgetTargets].sort((a, b) => {
        const aCompleted = a.spent >= a.amount;
        const bCompleted = b.spent >= b.amount;
        if (aCompleted && !bCompleted) return -1;
        if (!aCompleted && bCompleted) return 1;
        return 0;
    });

    return (
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg border border-gray-200 dark:border-[#38393c] overflow-hidden flex flex-col">
            <div className="py-2 px-3 border-b border-gray-200 dark:border-[#38393c]">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                        <HiCurrencyDollar className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-gray-900 dark:text-white">Budget</h2>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <div className="flex gap-6 h-full">
                    <div className="flex-shrink-0 flex flex-col items-center justify-center">
                        <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">{currentMonth} 2024</div>
                        <div className="relative w-48 h-24">
                            <svg className="w-48 h-26" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid meet">
                                <path
                                    d="M 30 70 A 70 70 0 0 1 170 70"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="none"
                                    className="text-gray-200 dark:text-gray-700"
                                />
                                <path
                                    d="M 30 70 A 70 70 0 0 1 170 70"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeDasharray={`${Math.max(lastMonthPercentage * 2.2, 100)} 220`}
                                    className="text-orange-400 dark:text-orange-500"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M 30 70 A 70 70 0 0 1 170 70"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeDasharray={`${progressPercentage * 2.2} 220`}
                                    className="text-blue-600 dark:text-blue-500"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                    {Math.round(progressPercentage)}%
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    used
                                </div>
                                <div className="text-center">
                                    <div className="text-xs">
                                        {isUnderBudget ? (
                                            <span className="text-green-600 dark:text-green-400 font-semibold">
                                                ${Math.abs(difference).toLocaleString()} under
                                            </span>
                                        ) : (
                                            <span className="text-red-600 dark:text-red-400 font-semibold">
                                                ${difference.toLocaleString()} over
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-xs text-orange-500 dark:text-orange-400">
                                        last month
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                Budget Targets
                            </h3>
                            <div className="text-right">
                                <div className="text-lg font-bold text-gray-900 dark:text-white">
                                    ${currentSpent.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    of ${currentBudget.toLocaleString()}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 pb-6 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/30" style={{
                            scrollbarWidth: 'auto',
                            scrollbarColor: '#6b7280 #e5e7eb'
                        }}>
                            {sortedBudgetTargets.map((target, index) => {
                                const isOverBudget = target.spent > target.amount;
                                const isCompleted = target.spent >= target.amount;
                                const isUnderBudget = target.spent < target.amount;
                                
                                return (
                                    <div key={index} className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                                        isCompleted 
                                            ? 'bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30' 
                                            : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                                    }`}>
                                        <div className="flex items-center gap-2">
                                            {isCompleted && (
                                                <div className="p-1 bg-green-500 rounded-full">
                                                    <HiCheck className="w-3 h-3 text-white" />
                                                </div>
                                            )}
                                            <span className={`text-sm font-medium ${
                                                isCompleted 
                                                    ? 'text-green-800 dark:text-green-200 line-through' 
                                                    : 'text-gray-900 dark:text-white'
                                            }`}>
                                                {target.category}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-sm font-semibold ${
                                                isOverBudget 
                                                    ? 'text-red-600 dark:text-red-400' 
                                                    : isCompleted
                                                        ? 'text-green-700 dark:text-green-300'
                                                        : 'text-gray-900 dark:text-white'
                                            }`}>
                                                ${target.spent.toLocaleString()}
                                            </span>
                                            <span className={`text-xs ${
                                                isCompleted 
                                                    ? 'text-green-600 dark:text-green-400' 
                                                    : 'text-gray-500 dark:text-gray-400'
                                            }`}>
                                                / ${target.amount.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
