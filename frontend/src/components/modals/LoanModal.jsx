import { HiX } from 'react-icons/hi';

function LoanModal({ isOpen, onClose, selectedAccount }) {

  const accounts = {
    'wells-fargo-mortgage': {
      id: 'wells-fargo-mortgage',
      name: 'Wells Fargo',
      type: 'Mortgage - Primary Residence',
      balance: 245000.00,
      lastUpdated: '2 days ago',
      interestRate: 3.25,
      monthlyPayment: 1062.00,
      loanTerm: 360,
      remainingPayments: 328,
      loanStartDate: '2020-06-15'
    },
    'boa-auto': {
      id: 'boa-auto',
      name: 'Bank of America',
      type: 'Auto Loan - 2023 Honda Civic',
      balance: 28500.00,
      lastUpdated: '1 day ago',
      interestRate: 4.5,
      monthlyPayment: 520.00,
      loanTerm: 60,
      remainingPayments: 52,
      loanStartDate: '2023-08-01'
    },
    'sallie-mae-student': {
      id: 'sallie-mae-student',
      name: 'Sallie Mae',
      type: 'Student Loan - Graduate School',
      balance: 21500.00,
      lastUpdated: '3 days ago',
      interestRate: 5.8,
      monthlyPayment: 280.00,
      loanTerm: 120,
      remainingPayments: 96,
      loanStartDate: '2018-09-01'
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
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateTotalPaid = () => {
    if (!account) return 0;
    const totalPayments = account.loanTerm - account.remainingPayments;
    return totalPayments * account.monthlyPayment;
  };

  const calculateTotalRemaining = () => {
    if (!account) return 0;
    return account.balance;
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
              {account ? account.name : 'Loan Account'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {account ? account.type : 'Loan Details'}
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
                  <p className="text-sm text-gray-500 dark:text-gray-400">Remaining Balance</p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
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
              
              {/* Loan Details */}
              <div className="flex items-start gap-4 pt-3 border-t border-gray-200 dark:border-[#38393c]">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Interest Rate</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {account.interestRate}%
                  </p>
                </div>
                <div className="flex-1 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Monthly Payment</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(account.monthlyPayment)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Remaining Payments</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {account.remainingPayments}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-4 flex-1 overflow-y-auto">
          {account && (
            <div className="space-y-3">
              {/* Loan Summary */}
              <div className="p-4 bg-gray-50 dark:bg-[#141414] rounded-lg border border-gray-200 dark:border-[#38393c]">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Loan Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Original Loan Term</span>
                    <span className="font-medium text-gray-900 dark:text-white">{account.loanTerm} months ({Math.round(account.loanTerm / 12)} years)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Loan Start Date</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formatDate(account.loanStartDate)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Payments Made</span>
                    <span className="font-medium text-gray-900 dark:text-white">{account.loanTerm - account.remainingPayments} / {account.loanTerm}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Amount Paid to Date</span>
                    <span className="font-medium text-green-600 dark:text-green-400">{formatCurrency(calculateTotalPaid())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Remaining Balance</span>
                    <span className="font-medium text-red-600 dark:text-red-400">{formatCurrency(calculateTotalRemaining())}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="pt-2">
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                  <span>Loan Progress</span>
                  <span>{Math.round(((account.loanTerm - account.remainingPayments) / account.loanTerm) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-[#2a2a2a] rounded-full h-2">
                  <div 
                    className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${((account.loanTerm - account.remainingPayments) / account.loanTerm) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoanModal;
