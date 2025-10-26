import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HiTrendingUp } from 'react-icons/hi';
import { useState, useEffect } from 'react';

function Networth() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  // Fetch networth data from backend
  useEffect(() => {
    const fetchNetworthData = async () => {
      try {
        const response = await fetch('/api/get_networth');
        if (!response.ok) {
          throw new Error('Failed to fetch networth data');
        }
        const networthData = await response.json();
        setData(networthData);
      } catch (error) {
        console.error('Error fetching networth data:', error);
        // Fallback to empty array if fetch fails
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNetworthData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-[#38393c] overflow-hidden h-full">
        <div className="py-2 px-3 border-b border-gray-200 dark:border-[#38393c] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center">
              <HiTrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-900 dark:text-white">Net Worth</h2>
            </div>
          </div>
        </div>
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-gray-500 dark:text-gray-400">Loading networth data...</div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-[#38393c] overflow-hidden h-full">
        <div className="py-2 px-3 border-b border-gray-200 dark:border-[#38393c] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center">
              <HiTrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-900 dark:text-white">Net Worth</h2>
            </div>
          </div>
        </div>
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-gray-500 dark:text-gray-400">No networth data available</div>
        </div>
      </div>
    );
  }
  
  const currentValue = data[data.length - 1].value;
  const value1DayAgo = 352284;
  
  // Calculate 30-day change (approximately 4-5 data points back since data is bi-weekly)
  const value30DaysAgo = data.length >= 3 ? data[data.length - 3].value + 784 : data[0].value;
  
  // Calculate 90-day change (approximately 6-7 data points back since data is bi-weekly)
  const value90DaysAgo = data.length >= 6 ? data[data.length - 7].value + 1269 : data[0].value;
  
  const change90Days = currentValue - value90DaysAgo;
  const change30Days = currentValue - value30DaysAgo;
  const change1Day = currentValue - value1DayAgo;
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatChange = (change) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${formatCurrency(change)}`;
  };

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-[#38393c] overflow-hidden h-full">
      <div className="py-2 px-3 border-b border-gray-200 dark:border-[#38393c] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center">
            <HiTrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-900 dark:text-white">Net Worth</h2>
          </div>
        </div>
        <div className="text-md font-bold text-gray-900 dark:text-white">
            {formatCurrency(currentValue)}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <style>
          {`
            .recharts-wrapper:focus,
            .recharts-wrapper *:focus {
              outline: none !important;
            }
          `}
        </style>
        <div className="h-58">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="currentColor" 
                className="text-gray-200 dark:text-gray-700" 
              />
              <XAxis 
                dataKey="displayDate" 
                stroke="currentColor"
                className="text-gray-600 dark:text-gray-400"
                fontSize={12}
                tick={{ fontSize: 10 }}
                interval="preserveStartEnd"
                hide={true}
              />
              <YAxis 
                stroke="currentColor"
                className="text-gray-600 dark:text-gray-400"
                fontSize={12}
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                domain={[150000, (dataMax) => dataMax + 25000]}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), 'Net Worth']}
                labelFormatter={(label) => `Date: ${label}`}
                labelStyle={{ 
                  color: isDarkMode ? "#ffffff" : "#374151"
                }}
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1a1a1a' : '#f9fafb',
                  border: isDarkMode ? '1px solid #38393c' : '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  color: isDarkMode ? '#ffffff' : '#374151'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center mt-3">
          <div className="flex gap-3 text-xs pl-14">
               <div className="flex items-center gap-1">
                 <span className="text-gray-500 dark:text-gray-400">90-Day:</span>
                 <span className={`font-medium ${change90Days >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                   {formatChange(change90Days)}
                 </span>
               </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-500 dark:text-gray-400">30-Day:</span>
              <span className={`font-medium ${change30Days >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {formatChange(change30Days)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-500 dark:text-gray-400">1-Day:</span>
              <span className={`font-medium ${change1Day >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {formatChange(change1Day)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Networth;
