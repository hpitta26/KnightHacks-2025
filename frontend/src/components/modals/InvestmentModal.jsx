import { HiX } from 'react-icons/hi';

function InvestmentModal({ isOpen, onClose, selectedAccount, consultationState, onStocksClicked }) {

  const accounts = {
    '401k': {
      id: '401k',
      name: '401k.com',
      type: 'Vengeance Enterprises',
      balance: 5036.12,
      lastUpdated: '4 min ago',
      holdings: [
        {
          id: 1,
          symbol: 'VTI',
          name: 'Vanguard Total Stock Market',
          shares: 25.5,
          price: 185.32,
          value: 4725.66,
          change: 2.45,
          changePercent: 1.34
        },
        {
          id: 2,
          symbol: 'VXUS',
          name: 'Vanguard Total International',
          shares: 15.2,
          price: 65.45,
          value: 994.84,
          change: -0.32,
          changePercent: -0.48
        },
        {
          id: 3,
          symbol: 'BND',
          name: 'Vanguard Total Bond Market',
          shares: 8.3,
          price: 75.21,
          value: 624.24,
          change: 0.15,
          changePercent: 0.20
        }
      ]
    },
    'ameritrade': {
      id: 'ameritrade',
      name: 'Ameritrade',
      type: 'Securities',
      balance: 11047.92,
      lastUpdated: '1 min ago',
      holdings: [
        {
          id: 4,
          symbol: 'AAPL',
          name: 'Apple Inc.',
          shares: 50,
          price: 185.64,
          value: 9282.00,
          change: 4.23,
          changePercent: 2.33
        },
        {
          id: 5,
          symbol: 'MSFT',
          name: 'Microsoft Corporation',
          shares: 10,
          price: 176.59,
          value: 1765.90,
          change: 1.25,
          changePercent: 0.71
        }
      ]
    },
    'fidelity': {
      id: 'fidelity',
      name: 'Fidelity',
      type: 'Inigo Montoya IRA',
      balance: 144694.30,
      lastUpdated: '1 min ago',
      holdings: [
        {
          id: 6,
          symbol: 'SPY',
          name: 'SPDR S&P 500 ETF',
          shares: 150,
          price: 485.32,
          value: 72798.00,
          change: 5.67,
          changePercent: 1.18
        },
        {
          id: 7,
          symbol: 'QQQ',
          name: 'Invesco QQQ Trust',
          shares: 100,
          price: 415.68,
          value: 41568.00,
          change: 3.21,
          changePercent: 0.78
        },
        {
          id: 8,
          symbol: 'TLT',
          name: 'iShares 20+ Year Treasury Bond',
          shares: 75,
          price: 90.45,
          value: 6783.75,
          change: 0.32,
          changePercent: 0.35
        },
        {
          id: 9,
          symbol: 'GLD',
          name: 'SPDR Gold Trust',
          shares: 25,
          price: 198.50,
          value: 4962.50,
          change: -1.25,
          changePercent: -0.63
        },
        {
          id: 10,
          symbol: 'VNQ',
          name: 'Vanguard Real Estate ETF',
          shares: 80,
          price: 89.12,
          value: 7129.60,
          change: 0.45,
          changePercent: 0.51
        }
      ]
    },
    'scholarshare': {
      id: 'scholarshare',
      name: 'Scholarshare Ca...',
      type: 'Inigo Montoya Jr',
      balance: 19140.34,
      lastUpdated: '9 hrs ago',
      holdings: [
        {
          id: 11,
          symbol: 'VT',
          name: 'Vanguard Total World Stock',
          shares: 180,
          price: 105.78,
          value: 19040.40,
          change: 1.23,
          changePercent: 1.17
        },
        {
          id: 12,
          symbol: 'Cash',
          name: 'Money Market',
          shares: 99.94,
          price: 1.00,
          value: 99.94,
          change: 0.00,
          changePercent: 0.00
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

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/75 flex items-center justify-center z-40"
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
              {account ? account.name : 'Investment Account'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {account ? account.type : 'Holdings'}
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
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
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

        {/* Holdings List */}
        <div className="px-6 py-4 flex-1 overflow-y-auto">
          {account && (
            <div className="space-y-2">
              {account.holdings.map((holding) => (
                <div 
                  key={holding.id} 
                  className={`p-4 bg-gray-50 dark:bg-[#141414] rounded-lg border border-gray-200 dark:border-[#38393c] ${consultationState?.highlightStocks ? 'consultation-highlight rounded-lg' : ''}`}
                  onClick={() => {
                    if (consultationState?.highlightStocks && onStocksClicked) {
                      onStocksClicked();
                    }
                  }}
                  style={{ cursor: consultationState?.highlightStocks ? 'pointer' : 'default' }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {holding.symbol}
                        </span>
                        {holding.change !== 0 && (
                          <span className={`text-xs px-2 py-1 rounded font-medium ${
                            holding.change > 0 
                              ? 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400' 
                              : 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400'
                          }`}>
                            {holding.change > 0 ? '+' : ''}{holding.changePercent.toFixed(2)}%
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {holding.name}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(holding.value)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {formatNumber(holding.shares)} shares @ {formatCurrency(holding.price)}
                      </div>
                    </div>
                  </div>
                  {holding.change !== 0 && (
                    <div className={`text-xs font-medium ${
                      holding.change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {holding.change > 0 ? '+' : ''}{formatCurrency(holding.change)} ({holding.change > 0 ? '+' : ''}{holding.changePercent.toFixed(2)}%)
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InvestmentModal;
