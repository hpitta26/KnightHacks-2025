import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Spending() {
    const [timeGranularity, setTimeGranularity] = useState('Month');
    const [isDarkMode, setIsDarkMode] = useState(false);

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

    const CustomLabel = (props) => {
        const { x, y, width, value } = props;
        if (value === 0) return null;
        
        return (
            <text 
                x={x + width / 2} 
                y={y - 5} 
                textAnchor="middle" 
                fontSize="10" 
                fill={isDarkMode ? "#a3a3a3" : "#6b7280"}
                fontWeight="500"
            >
                ${value.toLocaleString()}
            </text>
        );
    };

    const timeOptions = ['Year', 'Month', 'Week'];
    const spendingData = {
        'Year': [
            { month: 'Jan 2023', amount: 2800 },
            { month: 'Feb 2023', amount: 5200 },
            { month: 'Mar 2023', amount: 1900 },
            { month: 'Apr 2023', amount: 6500 },
            { month: 'May 2023', amount: 3100 },
            { month: 'Jun 2023', amount: 4800 },
            { month: 'Jul 2023', amount: 2400 },
            { month: 'Aug 2023', amount: 5800 },
            { month: 'Sep 2023', amount: 3300 },
            { month: 'Oct 2023', amount: 4900 },
            { month: 'Nov 2023', amount: 2200 },
            { month: 'Dec 2023', amount: 6100 }
        ],
        'Month': [
            { month: 'Week 1', amount: 150 },
            { month: 'Week 2', amount: 480 },
            { month: 'Week 3', amount: 220 },
            { month: 'Week 4', amount: 380 }
        ],
        'Week': [
            { month: 'Mon', amount: 25 },
            { month: 'Tue', amount: 85 },
            { month: 'Wed', amount: 15 },
            { month: 'Thu', amount: 95 },
            { month: 'Fri', amount: 45 },
            { month: 'Sat', amount: 8 },
            { month: 'Sun', amount: 65 }
        ]
    };

    return (
        <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
                {/* Time Granularity Controls */}
                <div className="flex gap-2">
                    {timeOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => setTimeGranularity(option)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                                timeGranularity === option
                                    ? 'bg-green-600 dark:bg-green-500 text-white'
                                    : 'bg-gray-100 dark:bg-[#141414] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2a2a2a]'
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                
                {/* Bar Graph */}
                <div className="rounded-lg p-4">
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart 
                            data={spendingData[timeGranularity]}
                            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                        >
                            <CartesianGrid 
                                strokeDasharray="3 3" 
                                stroke={isDarkMode ? "#525252" : "#9ca3af"} 
                            />
                            <XAxis 
                                dataKey="month" 
                                tick={{ 
                                    fontSize: 12, 
                                    fill: isDarkMode ? "#a3a3a3" : "#6b7280"
                                }}
                                axisLine={{ stroke: isDarkMode ? "#525252" : "#d1d5db" }}
                            />
                            <YAxis 
                                tick={{ 
                                    fontSize: 12, 
                                    fill: isDarkMode ? "#a3a3a3" : "#6b7280"
                                }}
                                axisLine={{ stroke: isDarkMode ? "#525252" : "#d1d5db" }}
                                tickFormatter={(value) => `$${value.toLocaleString()}`}
                            />
                            <Tooltip 
                                formatter={(value) => [`$${value.toLocaleString()}`, 'Spending']}
                                labelStyle={{ 
                                    color: isDarkMode ? "#ffffff" : "#374151"
                                }}
                                contentStyle={{ 
                                    backgroundColor: isDarkMode ? "#1a1a1a" : "#f9fafb", 
                                    border: isDarkMode ? "1px solid #38393c" : "1px solid #e5e7eb",
                                    borderRadius: '8px',
                                    color: isDarkMode ? "#ffffff" : "#374151"
                                }}
                                cursor={{
                                    fill: isDarkMode ? 'rgba(56, 57, 60, 0.2)' : 'rgba(243, 244, 246, 0.5)',
                                    stroke: 'transparent'
                                }}
                            />
                            <Bar 
                                dataKey="amount" 
                                fill="#16a34a" 
                                radius={[4, 4, 0, 0]}
                                label={<CustomLabel />}
                                maxBarSize={timeGranularity === 'Month' ? 50 : 40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}