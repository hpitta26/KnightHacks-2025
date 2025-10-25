import { useState } from 'react';
import { BsPiggyBankFill } from "react-icons/bs";
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

function Savings() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;
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

  // Activity data
  const activities = [
    {
      id: 1,
      type: 'in',
      amount: 2500,
      account: 'Checking Account',
      description: 'Salary Deposit',
      vendor: 'TechCorp Inc.',
      timestamp: new Date('2024-12-15T09:00:00'),
      category: 'Income'
    },
    {
      id: 2,
      type: 'out',
      amount: 1200,
      account: 'Savings Account',
      description: 'Emergency Fund Transfer',
      vendor: 'Internal Transfer',
      timestamp: new Date('2024-12-14T14:30:00'),
      category: 'Transfer'
    },
    {
      id: 3,
      type: 'in',
      amount: 500,
      account: 'Investment Account',
      description: 'Dividend Payment',
      vendor: 'Apple Inc.',
      timestamp: new Date('2024-12-13T11:15:00'),
      category: 'Investment'
    },
    {
      id: 4,
      type: 'out',
      amount: 800,
      account: 'Checking Account',
      description: 'Rent Payment',
      vendor: 'Sunset Apartments',
      timestamp: new Date('2024-12-12T08:00:00'),
      category: 'Housing'
    },
    {
      id: 5,
      type: 'in',
      amount: 300,
      account: 'Savings Account',
      description: 'Interest Earned',
      vendor: 'Chase Bank',
      timestamp: new Date('2024-12-11T16:45:00'),
      category: 'Interest'
    },
    {
      id: 6,
      type: 'out',
      amount: 150,
      account: 'Checking Account',
      description: 'Grocery Shopping',
      vendor: 'Whole Foods Market',
      timestamp: new Date('2024-12-10T18:20:00'),
      category: 'Food'
    },
    {
      id: 7,
      type: 'out',
      amount: 45,
      account: 'Checking Account',
      description: 'Coffee & Pastry',
      vendor: 'Starbucks',
      timestamp: new Date('2024-12-09T07:30:00'),
      category: 'Food'
    },
    {
      id: 8,
      type: 'out',
      amount: 89,
      account: 'Checking Account',
      description: 'Gas Station',
      vendor: 'Shell',
      timestamp: new Date('2024-12-08T16:15:00'),
      category: 'Transportation'
    },
    {
      id: 9,
      type: 'in',
      amount: 75,
      account: 'Checking Account',
      description: 'Freelance Payment',
      vendor: 'Design Studio LLC',
      timestamp: new Date('2024-12-07T13:20:00'),
      category: 'Income'
    },
    {
      id: 10,
      type: 'out',
      amount: 25,
      account: 'Checking Account',
      description: 'Streaming Service',
      vendor: 'Netflix',
      timestamp: new Date('2024-12-06T00:00:00'),
      category: 'Entertainment'
    },
    {
      id: 11,
      type: 'out',
      amount: 120,
      account: 'Checking Account',
      description: 'Gym Membership',
      vendor: 'Planet Fitness',
      timestamp: new Date('2024-12-05T10:00:00'),
      category: 'Health'
    },
    {
      id: 12,
      type: 'in',
      amount: 200,
      account: 'Investment Account',
      description: 'Stock Sale',
      vendor: 'Tesla Inc.',
      timestamp: new Date('2024-12-04T15:45:00'),
      category: 'Investment'
    }
  ];

  const ActivityComponent = () => (
    <div className="flex-1 p-3 pb-10 overflow-y-auto">
      <div className="space-y-1">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-[#38393c]">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-1 pl-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.vendor}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.category}
                  </span>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {activity.description}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {activity.account} • {activity.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            </div>
            <div className={`text-sm font-semibold ${activity.type === 'in' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {activity.type === 'in' ? '+' : '-'}{formatCurrency(activity.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
      )}

      {/* Page 2: Activity */}
      {currentPage === 2 && (
        <ActivityComponent />
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

export default Savings;