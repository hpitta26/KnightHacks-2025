import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HiTrendingUp } from 'react-icons/hi';

function Networth() {
  const generateNetworthData = () => {
    const data = [];
    const today = new Date();
    let currentValue = 125000;
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      let dailyChange;
      const dayOfWeek = date.getDay();
      const randomFactor = Math.random();
      
      if (randomFactor > 0.70) {
        dailyChange = (Math.random() - 0.5) * 50000;
      }
      else if (randomFactor > 0.40) {
        dailyChange = (Math.random() - 0.5) * 35000;
      }
      else if (randomFactor > 0.20) {
        dailyChange = (Math.random() - 0.5) * 25000;
      }
      else if (randomFactor > 0.05) {
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          dailyChange = (Math.random() - 0.5) * 15000;
        } else {
          dailyChange = (Math.random() - 0.5) * 20000;
        }
      }
      else {
        dailyChange = (Math.random() - 0.5) * 10000;
      }
      
      if (Math.random() > 0.85) {
        dailyChange = Math.random() > 0.5 ? -40000 : 35000;
      }
      
      if (Math.random() > 0.80) {
        dailyChange += (Math.random() - 0.5) * 30000;
      }
      
      if (Math.random() > 0.75) {
        dailyChange += (Math.random() - 0.5) * 20000;
      }
      
      if (currentValue + dailyChange < 30000) {
        dailyChange = Math.abs(dailyChange) * 0.2;
      }
      
      currentValue += dailyChange;
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.round(currentValue),
        displayDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      });
    }
    
    return data;
  };

  const data = generateNetworthData();
  
  const currentValue = data[data.length - 1].value;
  const value30DaysAgo = data[0].value;
  const value1DayAgo = data[data.length - 2].value;
  
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
    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg border border-gray-200 dark:border-[#38393c] overflow-hidden flex flex-col">
      <div className="py-2 px-3 border-b border-gray-200 dark:border-[#38393c]">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center">
            <HiTrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Net Worth</h2>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {formatCurrency(currentValue)}
          </div>
          <div className="flex gap-3 text-xs">
            <div className="flex items-center gap-1">
              <span className="text-gray-500 dark:text-gray-400">30d:</span>
              <span className={`font-medium ${change30Days >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {formatChange(change30Days)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-500 dark:text-gray-400">1d:</span>
              <span className={`font-medium ${change1Day >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {formatChange(change1Day)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
              />
              <YAxis 
                stroke="currentColor"
                className="text-gray-600 dark:text-gray-400"
                fontSize={12}
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
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
      </div>
    </div>
  );
}

export default Networth;
