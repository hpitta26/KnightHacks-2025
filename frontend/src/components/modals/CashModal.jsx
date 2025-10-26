
import { HiX } from 'react-icons/hi';

function CashModal({ isOpen, onClose, selectedAccount }) {

  const accounts = {
    'boa-checking': {
      id: 'boa-checking',
      name: 'Bank of America',
      type: 'Joint Checking',
      balance: 5036.12,
      lastUpdated: '3 min ago',
      transactions: [
        {
          id: 1,
          date: '2024-12-15',
          description: 'Salary Deposit',
          vendor: 'TechCorp Inc.',
          amount: 2500.00,
          type: 'credit',
          category: 'Income'
        },
        {
          id: 2,
          date: '2024-12-14',
          description: 'Rent Payment',
          vendor: 'Sunset Apartments',
          amount: -800.00,
          type: 'debit',
          category: 'Housing'
        },
        {
          id: 3,
          date: '2024-12-13',
          description: 'Grocery Shopping',
          vendor: 'Whole Foods Market',
          amount: -150.00,
          type: 'debit',
          category: 'Food'
        },
        {
          id: 4,
          date: '2024-12-12',
          description: 'Coffee & Pastry',
          vendor: 'Starbucks',
          amount: -45.00,
          type: 'debit',
          category: 'Food'
        },
        {
          id: 5,
          date: '2024-12-11',
          description: 'Gas Station',
          vendor: 'Shell',
          amount: -89.00,
          type: 'debit',
          category: 'Transportation'
        }
      ]
    },
    'boa-savings': {
      id: 'boa-savings',
      name: 'Bank of America',
      type: 'Savings',
      balance: 15477.09,
      lastUpdated: '3 min ago',
      transactions: [
        {
          id: 6,
          date: '2024-12-15',
          description: 'Emergency Fund Transfer',
          vendor: 'Internal Transfer',
          amount: -1200.00,
          type: 'debit',
          category: 'Transfer'
        },
        {
          id: 7,
          date: '2024-12-14',
          description: 'Interest Earned',
          vendor: 'Bank of America',
          amount: 12.50,
          type: 'credit',
          category: 'Interest'
        },
        {
          id: 8,
          date: '2024-12-13',
          description: 'Savings Transfer',
          vendor: 'Internal Transfer',
          amount: 500.00,
          type: 'credit',
          category: 'Transfer'
        }
      ]
    },
    'chase-checking': {
      id: 'chase-checking',
      name: 'Chase',
      type: 'Total Checking',
      balance: 3692.10,
      lastUpdated: '2 min ago',
      transactions: [
        {
          id: 9,
          date: '2024-12-15',
          description: 'Freelance Payment',
          vendor: 'Design Studio LLC',
          amount: 75.00,
          type: 'credit',
          category: 'Income'
        },
        {
          id: 10,
          date: '2024-12-14',
          description: 'Streaming Service',
          vendor: 'Netflix',
          amount: -25.00,
          type: 'debit',
          category: 'Entertainment'
        },
        {
          id: 11,
          date: '2024-12-13',
          description: 'Gym Membership',
          vendor: 'Planet Fitness',
          amount: -120.00,
          type: 'debit',
          category: 'Health'
        }
      ]
    }
  };

  const account = selectedAccount ? accounts[selectedAccount] : null;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl max-w-lg w-full max-h-[75vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#38393c]">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {account ? account.name : 'Account'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {account ? account.type : 'Transaction History'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-lg transition-colors"
          >
            <HiX className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Account Balance */}
        {account && (
          <div className="px-6 py-4 border-b border-gray-200 dark:border-[#38393c] bg-gray-50 dark:bg-[#141414]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Current Balance</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(account.balance)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {account.lastUpdated}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-4 flex-1 overflow-y-auto">
          {account && (
            <div className="space-y-2">
              {account.transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#141414] rounded-lg border border-gray-200 dark:border-[#38393c]">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {transaction.vendor}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-[#2a2a2a] px-2 py-1 rounded">
                          {transaction.category}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {transaction.description}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {formatDate(transaction.date)}
                      </div>
                    </div>
                  </div>
                  <div className={`text-sm font-semibold ${transaction.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {transaction.type === 'credit' ? '+' : ''}{formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CashModal;
