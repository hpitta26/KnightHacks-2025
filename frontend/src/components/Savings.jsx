import { BsPiggyBankFill } from "react-icons/bs";
import { useState, useEffect } from "react";

function Savings() {
  const [savingsData, setSavingsData] = useState({ currentAmount: 0, goalAmount: 0 });
  const [loading, setLoading] = useState(true);

  // Use the single savings data object
  const totalCurrentAmount = savingsData.currentAmount;
  const totalGoalAmount = savingsData.goalAmount;
  const totalProgressPercentage = totalGoalAmount > 0 ? (totalCurrentAmount / totalGoalAmount) * 100 : 0;
  const totalRemainingAmount = totalGoalAmount - totalCurrentAmount;
  const monthsRemaining = 12; // Assuming we're calculating for the full year
  const monthlyTarget = Math.ceil(totalRemainingAmount / monthsRemaining);

  // Fetch savings data from backend
  useEffect(() => {
    const fetchSavingsData = async () => {
      try {
        const response = await fetch('http://localhost:8000/get_savings');
        if (!response.ok) {
          throw new Error('Failed to fetch savings data');
        }
        const data = await response.json();
        setSavingsData(data);
      } catch (error) {
        console.error('Error fetching savings data:', error);
        // Fallback to default object if fetch fails
        setSavingsData({ currentAmount: 0, goalAmount: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchSavingsData();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading savings data...</div>
      </div>
    );
  }

  return (
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
              strokeDasharray={`${totalProgressPercentage * 2.2} 220`}
              className="text-teal-500"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center mt-5">
            <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
              {formatCurrency(totalCurrentAmount)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              of {formatCurrency(totalGoalAmount)}
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
  );
}

export default Savings;