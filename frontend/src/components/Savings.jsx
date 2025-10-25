import { BsPiggyBankFill } from "react-icons/bs";

function Savings() {
  const currentAmount = 15706;
  const goalAmount = 22000;
  const progressPercentage = (currentAmount / goalAmount) * 100;
  const remainingAmount = goalAmount - currentAmount;
  const monthsRemaining = 12; // Assuming we're calculating for the full year
  const monthlyTarget = Math.ceil(remainingAmount / monthsRemaining);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-[#38393c] overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="py-2 px-3 border-b border-gray-200 dark:border-[#38393c] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center">
            <BsPiggyBankFill className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-end gap-1">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Savings</h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        {/* Semi-circular Progress Bar */}
        <div className="relative w-48 h-32 mb-4">
          <svg className="w-48 h-32" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
            {/* Background arc */}
            <path
              d="M 30 90 A 70 70 0 0 1 170 90"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
              strokeLinecap="round"
            />
            {/* Progress arc */}
            <path
              d="M 30 90 A 70 70 0 0 1 170 90"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${progressPercentage * 2.2} 220`}
              className="text-teal-500"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center mt-5">
            <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
              {formatCurrency(currentAmount)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              of {formatCurrency(goalAmount)}
            </div>
          </div>
        </div>

        {/* Monthly target */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Save {formatCurrency(monthlyTarget)} per month to hit your savings goal this year.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Savings;
