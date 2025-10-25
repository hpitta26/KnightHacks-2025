import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HiTrendingUp } from 'react-icons/hi';

function Networth() {
  const generateNetworthData = () => {
    const data = [
      { date: '2024-03-01', value: 200000, displayDate: 'Mar 1' },
      { date: '2024-03-15', value: 220000, displayDate: 'Mar 15' },
      { date: '2024-04-01', value: 235000, displayDate: 'Apr 1' },
      { date: '2024-04-15', value: 225000, displayDate: 'Apr 15' },
      { date: '2024-05-01', value: 260000, displayDate: 'May 1' },
      { date: '2024-05-15', value: 265000, displayDate: 'May 15' },
      { date: '2024-06-01', value: 245000, displayDate: 'Jun 1' },
      { date: '2024-06-15', value: 235000, displayDate: 'Jun 15' },
      { date: '2024-07-01', value: 270000, displayDate: 'Jul 1' },
      { date: '2024-07-15', value: 272000, displayDate: 'Jul 15' },
      { date: '2024-08-01', value: 285000, displayDate: 'Aug 1' },
      { date: '2024-08-15', value: 267000, displayDate: 'Aug 15' },
      { date: '2024-09-01', value: 246000, displayDate: 'Sep 1' },
      { date: '2024-09-15', value: 254000, displayDate: 'Sep 15' },
      { date: '2024-10-01', value: 272000, displayDate: 'Oct 1' },
      { date: '2024-10-15', value: 295000, displayDate: 'Oct 15' },
      { date: '2024-10-31', value: 290000, displayDate: 'Oct 31' },
      { date: '2024-11-15', value: 296000, displayDate: 'Nov 15' },
      { date: '2024-12-01', value: 305000, displayDate: 'Dec 1' },
      { date: '2024-12-15', value: 285000, displayDate: 'Dec 15' },
      { date: '2024-12-31', value: 300000, displayDate: 'Dec 31' },
      { date: '2025-01-15', value: 320000, displayDate: 'Jan 15' },
      { date: '2025-01-31', value: 295000, displayDate: 'Jan 31' },
      { date: '2025-02-15', value: 315000, displayDate: 'Feb 15' },
      { date: '2025-02-28', value: 315000, displayDate: 'Feb 28' },
      { date: '2025-03-15', value: 310000, displayDate: 'Mar 15' },
      { date: '2025-03-31', value: 330000, displayDate: 'Mar 31' },
      { date: '2025-04-15', value: 340000, displayDate: 'Apr 15' },
      { date: '2025-04-30', value: 325000, displayDate: 'Apr 30' },
      { date: '2025-05-15', value: 335000, displayDate: 'May 15' },
      { date: '2025-05-31', value: 365000, displayDate: 'May 31' },
      { date: '2025-06-15', value: 350000, displayDate: 'Jun 15' }
    ];
    
    return data;
  };

  const data = generateNetworthData();
  
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
                contentStyle={{
                  backgroundColor: 'var(--tooltip-bg, white)',
                  border: '1px solid var(--tooltip-border, #e5e7eb)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  color: 'var(--tooltip-text, #374151)'
                }}
                wrapperClassName="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
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
