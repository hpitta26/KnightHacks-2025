import { useState } from 'react';
import { HiTrendingUp, HiTrendingDown, HiCash, HiChartBar, HiCreditCard, HiLightningBolt } from 'react-icons/hi';

function BentoGrid() {
  return (
    <div className="p-6 grid grid-cols-12 grid-rows-6 gap-4 h-full">
      {/* Portfolio Overview - Large Card */}
      <div className="col-span-8 row-span-3 bg-gradient-to-br from-[#28ce78] to-[#1ea560] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold opacity-90">Portfolio Overview</h3>
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">YTD</span>
          </div>
          <div className="space-y-2">
            <p className="text-5xl font-bold">$350,000</p>
            <div className="flex items-center gap-2">
              <HiTrendingUp className="w-5 h-5" />
              <span className="text-lg font-medium">+12.5% ($38,750)</span>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
              <p className="text-xs opacity-75">Monthly Return</p>
              <p className="text-xl font-bold">+2.3%</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
              <p className="text-xs opacity-75">Best Performer</p>
              <p className="text-xl font-bold">AAPL</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
              <p className="text-xs opacity-75">Risk Score</p>
              <p className="text-xl font-bold">6.8/10</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats - Two Vertical Cards */}
      <div className="col-span-4 row-span-3 space-y-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg h-[calc(50%-0.5rem)]">
          <div className="flex items-start justify-between mb-2">
            <HiCash className="w-8 h-8" />
            <HiTrendingUp className="w-5 h-5" />
          </div>
          <p className="text-sm opacity-90 mb-1">Total Assets</p>
          <p className="text-3xl font-bold">$650K</p>
          <p className="text-xs opacity-75 mt-2">+8.2% from last month</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg h-[calc(50%-0.5rem)]">
          <div className="flex items-start justify-between mb-2">
            <HiCreditCard className="w-8 h-8" />
            <HiTrendingDown className="w-5 h-5" />
          </div>
          <p className="text-sm opacity-90 mb-1">Total Liabilities</p>
          <p className="text-3xl font-bold">$300K</p>
          <p className="text-xs opacity-75 mt-2">-3.1% from last month</p>
        </div>
      </div>

      {/* Monthly Cash Flow */}
      <div className="col-span-5 row-span-3 bg-white dark:bg-[#1a1a1a] rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-[#38393c]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Cash Flow</h3>
          <HiChartBar className="w-6 h-6 text-[#28ce78]" />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-100 dark:border-green-900/30">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Income</span>
            <span className="text-lg font-bold text-green-600 dark:text-green-400">+$8,250</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-100 dark:border-red-900/30">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Expenses</span>
            <span className="text-lg font-bold text-red-600 dark:text-red-400">-$4,820</span>
          </div>
          <div className="h-px bg-gray-200 dark:bg-[#38393c] my-2"></div>
          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-[#141414] rounded-xl border border-gray-200 dark:border-[#38393c]">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Net Cash Flow</span>
            <span className="text-xl font-bold text-[#28ce78]">+$3,430</span>
          </div>
        </div>
      </div>

      {/* Investment Distribution */}
      <div className="col-span-4 row-span-3 bg-white dark:bg-[#1a1a1a] rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-[#38393c]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Investment Distribution</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-600 dark:text-gray-400">Stocks</span>
              <span className="font-medium text-gray-900 dark:text-white">45%</span>
            </div>
            <div className="h-2.5 bg-gray-200 dark:bg-[#141414] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 w-[45%]"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-600 dark:text-gray-400">Bonds</span>
              <span className="font-medium text-gray-900 dark:text-white">25%</span>
            </div>
            <div className="h-2.5 bg-gray-200 dark:bg-[#141414] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-green-600 w-[25%]"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-600 dark:text-gray-400">Real Estate</span>
              <span className="font-medium text-gray-900 dark:text-white">20%</span>
            </div>
            <div className="h-2.5 bg-gray-200 dark:bg-[#141414] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 w-[20%]"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-600 dark:text-gray-400">Crypto</span>
              <span className="font-medium text-gray-900 dark:text-white">10%</span>
            </div>
            <div className="h-2.5 bg-gray-200 dark:bg-[#141414] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 w-[10%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="col-span-3 row-span-3 bg-white dark:bg-[#1a1a1a] rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-[#38393c] overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <HiLightningBolt className="w-5 h-5 text-[#28ce78]" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activity</h3>
        </div>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 dark:bg-[#141414] rounded-xl border border-gray-200 dark:border-[#38393c]">
            <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">AAPL Purchase</p>
            <p className="text-sm text-[#28ce78] font-semibold">+$2,500</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-[#141414] rounded-xl border border-gray-200 dark:border-[#38393c]">
            <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">Dividend Payment</p>
            <p className="text-sm text-[#28ce78] font-semibold">+$125</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BentoGrid;

