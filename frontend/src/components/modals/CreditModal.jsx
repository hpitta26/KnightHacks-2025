import { HiX } from 'react-icons/hi';

function CreditModal({ isOpen, onClose, selectedAccount }) {

  const accounts = {
    'chase-sapphire': {
      id: 'chase-sapphire',
      name: 'Chase',
      type: 'Sapphire Preferred - En...',
      balance: 1935.13,
      lastUpdated: '2 min ago',
      apr: 19.99,
      availableCredit: 30564.87,
      creditLimit: 32500,
      transactions: [
        {
          id: 1,
          date: '2024-12-15',
          description: 'Restaurant - Fine Dining',
          vendor: 'Le Grand Restaurant',
          amount: -185.50,
          type: 'debit',
          category: 'Dining'
        },
        {
          id: 2,
          date: '2024-12-14',
          description: 'Groceries - Whole Foods',
          vendor: 'Whole Foods Market',
          amount: -145.00,
          type: 'debit',
          category: 'Food'
        },
        {
          id: 3,
          date: '2024-12-13',
          description: 'Travel - Hotel Booking',
          vendor: 'Marriott Hotels',
          amount: -420.00,
          type: 'debit',
          category: 'Travel'
        },
        {
          id: 4,
          date: '2024-12-12',
          description: 'Gas Station',
          vendor: 'Shell',
          amount: -65.00,
          type: 'debit',
          category: 'Transportation'
        },
        {
          id: 5,
          date: '2024-12-11',
          description: 'Coffee Shop',
          vendor: 'Starbucks',
          amount: -12.50,
          type: 'debit',
          category: 'Food'
        },
        {
          id: 6,
          date: '2024-12-10',
          description: 'Restaurant',
          vendor: 'Olive Garden',
          amount: -87.20,
          type: 'debit',
          category: 'Dining'
        },
        {
          id: 7,
          date: '2024-12-09',
          description: 'Monthly Payment',
          vendor: 'Payment Received',
          amount: 2000.00,
          type: 'credit',
          category: 'Payment'
        }
      ]
    },
    'amex-gold': {
      id: 'amex-gold',
      name: 'American Express',
      type: 'Gold Card',
      balance: 2127.45,
      lastUpdated: '5 min ago',
      apr: 21.24,
      availableCredit: 22872.55,
      creditLimit: 25000,
      transactions: [
        {
          id: 8,
          date: '2024-12-15',
          description: 'Supermarket',
          vendor: 'Kroger',
          amount: -95.00,
          type: 'debit',
          category: 'Food'
        },
        {
          id: 9,
          date: '2024-12-14',
          description: 'Restaurant',
          vendor: 'Ruth\'s Chris Steakhouse',
          amount: -245.75,
          type: 'debit',
          category: 'Dining'
        },
        {
          id: 10,
          date: '2024-12-13',
          description: 'Airline Ticket',
          vendor: 'Delta Airlines',
          amount: -890.50,
          type: 'debit',
          category: 'Travel'
        },
        {
          id: 11,
          date: '2024-12-12',
          description: 'Restaurant',
          vendor: 'Chipotle',
          amount: -45.20,
          type: 'debit',
          category: 'Dining'
        },
        {
          id: 12,
          date: '2024-12-11',
          description: 'Uber Ride',
          vendor: 'Uber Technologies',
          amount: -28.50,
          type: 'debit',
          category: 'Transportation'
        },
        {
          id: 13,
          date: '2024-12-10',
          description: 'Grocery Store',
          vendor: 'Trader Joe\'s',
          amount: -78.00,
          type: 'debit',
          category: 'Food'
        },
        {
          id: 14,
          date: '2024-12-09',
          description: 'Restaurant',
          vendor: 'The Capital Grille',
          amount: -156.00,
          type: 'debit',
          category: 'Dining'
        },
        {
          id: 15,
          date: '2024-12-08',
          description: 'Online Payment',
          vendor: 'Payment Received',
          amount: 2200.00,
          type: 'credit',
          category: 'Payment'
        }
      ]
    },
    'discover-cash': {
      id: 'discover-cash',
      name: 'Discover',
      type: 'It Cash Back',
      balance: 830.42,
      lastUpdated: '1 hr ago',
      apr: 18.99,
      availableCredit: 14169.58,
      creditLimit: 15000,
      transactions: [
        {
          id: 16,
          date: '2024-12-15',
          description: 'Gas Station',
          vendor: 'Exxon',
          amount: -52.00,
          type: 'debit',
          category: 'Transportation'
        },
        {
          id: 17,
          date: '2024-12-14',
          description: 'Drugstore',
          vendor: 'CVS Pharmacy',
          amount: -45.00,
          type: 'debit',
          category: 'Health'
        },
        {
          id: 18,
          date: '2024-12-13',
          description: 'Restaurant',
          vendor: 'McDonald\'s',
          amount: -18.50,
          type: 'debit',
          category: 'Dining'
        },
        {
          id: 19,
          date: '2024-12-12',
          description: 'Coffee Shop',
          vendor: 'Dunkin\' Donuts',
          amount: -8.75,
          type: 'debit',
          category: 'Food'
        },
        {
          id: 20,
          date: '2024-12-11',
          description: 'Grocery Store',
          vendor: 'Walmart',
          amount: -125.00,
          type: 'debit',
          category: 'Food'
        },
        {
          id: 21,
          date: '2024-12-10',
          description: 'Gas Station',
          vendor: 'BP',
          amount: -48.00,
          type: 'debit',
          category: 'Transportation'
        },
        {
          id: 22,
          date: '2024-12-09',
          description: 'Online Payment',
          vendor: 'Payment Received',
          amount: 800.00,
          type: 'credit',
          category: 'Payment'
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
              {account ? account.name : 'Credit Card'}
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
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Outstanding Balance</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
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
              
              {/* APR and Credit Details */}
              <div className="flex items-start gap-4 pt-3 border-t border-gray-200 dark:border-[#38393c]">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">APR</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {account.apr}%
                  </p>
                </div>
                <div className="flex-1 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Available Credit</p>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(account.availableCredit)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Credit Limit</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(account.creditLimit)}
                  </p>
                </div>
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

export default CreditModal;
