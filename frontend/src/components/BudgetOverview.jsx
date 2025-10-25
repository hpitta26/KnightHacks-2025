import { HiCheck } from 'react-icons/hi';

export default function BudgetOverview({ 
    currentMonth, 
    currentSpent, 
    currentBudget, 
    lastMonthSpent, 
    progressPercentage, 
    lastMonthPercentage, 
    difference, 
    isUnderBudget, 
    sortedBudgetTargets 
}) {
    return (
        <div className="flex-1 overflow-y-auto p-3 pb-12">
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
                                strokeLinecap="round"
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
                            <div className="text-sm font-bold text-gray-900 dark:text-white">
                                ${currentSpent.toLocaleString()} <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">of ${currentBudget.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/30" style={{
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
    );
}
