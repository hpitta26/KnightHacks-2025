import { useState } from 'react';
import { HiChevronDown, HiChevronRight } from 'react-icons/hi';
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from "react-icons/tb";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCashOpen, setIsCashOpen] = useState(false);
  const [isInvestmentsOpen, setIsInvestmentsOpen] = useState(false);
  const [isCreditOpen, setIsCreditOpen] = useState(false);
  const [isLoansOpen, setIsLoansOpen] = useState(false);

  if (isCollapsed) {
    return (
      <aside className="w-25 bg-white dark:bg-[#141414] border-r border-gray-200 dark:border-[#38393c] h-full overflow-y-auto">
        <div className="p-3 space-y-3">
          {/* Net Worth - Compact with Conditional Display */}
          <div className="group p-3 rounded-xl bg-gray-100 dark:bg-[#1a1a1a] text-center relative overflow-hidden">
            {/* Default state - Net Worth content */}
            <div className="group-hover:opacity-0 transition-opacity duration-200 ease-in-out">
              <div className="flex items-center justify-center mb-1">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  NW
                </p>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                350K
              </p>
            </div>
            
            {/* Hover state - Expand icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
              <button
                onClick={() => setIsCollapsed(false)}
                className="p-2 rounded transition-colors"
              >
                <TbLayoutSidebarRightCollapse className="w-8 h-8 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Assets - Compact */}
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-center">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Assets
            </p>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              650K
            </p>
          </div>

          {/* Liabilities - Compact */}
          <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 text-center">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Liab
            </p>
            <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
              300K
            </p>
          </div>

          {/* Cash - Compact */}
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] text-center">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cash
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              24K
            </p>
          </div>

          {/* Investments - Compact */}
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] text-center">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Invest
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              180K
            </p>
          </div>

          {/* Credit - Compact */}
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] text-center">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Credit
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              -5K
            </p>
          </div>

          {/* Loans - Compact */}
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] text-center">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Loans
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              -295K
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-70 bg-white dark:bg-[#141414] border-r border-gray-200 dark:border-[#38393c] h-full overflow-y-auto">
      <div className="p-3 space-y-3">
        {/* Net Worth Section */}
        <div className="space-y-1.5">
        <div className="p-3 rounded-xl bg-gray-100 dark:bg-[#1a1a1a] space-y-4">
            <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Net Worth
                  </h3>
                  <button
                    onClick={() => setIsCollapsed(true)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-[#2a2a2a] rounded transition-colors"
                  >
                    <TbLayoutSidebarLeftCollapse className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                $350,000
                </p>
            </div>
          </div>

            {/* Assets */}
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                ASSETS
              </span>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                $650,000
              </span>
            </div>

            {/* Liabilities */}
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                LIABILITIES
              </span>
              <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                -$300,000
              </span>
            </div>
        </div>
        

        {/* Cash Section */}
        <div className="p-3 rounded-xl bg-gray-100 dark:bg-[#1a1a1a] space-y-3">
          <button
            onClick={() => setIsCashOpen(!isCashOpen)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-1">
              {isCashOpen ? (
                <HiChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <HiChevronRight className="w-5 h-5 text-gray-400" />
              )}
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Cash
              </h3>
             
            </div>
              <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                $24,205
              </p>
            
          </button>

          {isCashOpen && (
            <div className="space-y-2">
              {/* Bank Accounts */}
              <div className="p-3 rounded-lg bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#38393c]">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Bank of America
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Joint Checking
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      5,036.12
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      3 min ago
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#38393c]">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Bank of America
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Savings
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      15,477.09
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      3 min ago
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#38393c]">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Chase
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Total Checking
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      3,692.10
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      2 min ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Investments Section */}
        <div className="p-3 rounded-xl bg-gray-100 dark:bg-[#1a1a1a] space-y-3">
          <button
            onClick={() => setIsInvestmentsOpen(!isInvestmentsOpen)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-1">
              {isInvestmentsOpen ? (
                <HiChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <HiChevronRight className="w-5 h-5 text-gray-400" />
              )}
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Investments
              </h3>
             
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                $179,918
              </p>
            
          </button>

          {isInvestmentsOpen && (
            <div className="space-y-2">
              {/* Investment Accounts */}
              <div className="p-3 rounded-lg bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#38393c]">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      401k.com
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Vengeance Enterprises
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      5,036.12
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      4 min ago
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#38393c]">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Ameritrade
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Securities
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      11,047.92
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      1 min ago
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#38393c]">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Fidelity
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Inigo Montoya IRA
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      144,694.30
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      1 min ago
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#38393c]">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Scholarshare Ca...
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Inigo Montoya Jr
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      19,140.34
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      9 hrs ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Credit Section */}
        <div className="p-3 rounded-xl bg-gray-100 dark:bg-[#1a1a1a] space-y-3">
          <button
            onClick={() => setIsCreditOpen(!isCreditOpen)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-1">
              {isCreditOpen ? (
                <HiChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <HiChevronRight className="w-5 h-5 text-gray-400" />
              )}
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Credit
              </h3>
             
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                -$4,893
              </p>
          </button>

          {isCreditOpen && (
            <div className="space-y-2">
              {/* Credit Cards */}
              <div className="p-3 rounded-lg bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#38393c]">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Chase
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Sapphire Preferred - En...
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      -1,935.13
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      2 min ago
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#38393c]">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      American Express
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Gold Card
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      -2,127.45
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      5 min ago
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#38393c]">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Discover
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      It Cash Back
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      -830.42
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      1 hr ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Loans Section */}
        <div className="p-3 rounded-xl bg-gray-100 dark:bg-[#1a1a1a] space-y-3">
          <button
            onClick={() => setIsLoansOpen(!isLoansOpen)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-1">
              {isLoansOpen ? (
                <HiChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <HiChevronRight className="w-5 h-5 text-gray-400" />
              )}
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Loans
              </h3>
             
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                -$295,000
              </p>
          </button>

          {isLoansOpen && (
            <div className="space-y-2">
              {/* Loan Accounts */}
              <div className="p-3 rounded-lg bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#38393c]">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Wells Fargo
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Mortgage - Primary Residence
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      -245,000.00
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      2 days ago
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#38393c]">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Bank of America
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Auto Loan - 2023 Honda Civic
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      -28,500.00
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      1 day ago
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#38393c]">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Sallie Mae
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Student Loan - Graduate School
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      -21,500.00
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      3 days ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

