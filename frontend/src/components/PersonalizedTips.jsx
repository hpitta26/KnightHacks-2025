import { useState, useRef, useEffect } from 'react';
import { HiLightBulb, HiInformationCircle, HiExclamation, HiCheckCircle, HiDotsVertical } from 'react-icons/hi';

export default function PersonalizedTips() {
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRefs = useRef({});

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openDropdown && !dropdownRefs.current[openDropdown]?.contains(event.target)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openDropdown]);

    const handleAction = (tipId, action) => {
        console.log(`${action} clicked for tip ${tipId}`);
        setOpenDropdown(null);
    };

    const financialTips = [
        {
            id: 1,
            type: 'warning',
            icon: HiExclamation,
            title: 'Spending Alert',
            description: 'Your spending went over budget last month by $450',
            category: 'Budget',
            priority: 'high'
        },
        {
            id: 2,
            type: 'suggestion',
            icon: HiLightBulb,
            title: 'Portfolio Optimization',
            description: 'Your portfolio is underweight in international markets',
            category: 'Investments',
            priority: 'medium'
        },
        {
            id: 3,
            type: 'success',
            icon: HiCheckCircle,
            title: 'Goal Achievement',
            description: 'You\'re on track to reach your emergency fund goal in 2 months',
            category: 'Savings',
            priority: 'low'
        },
        {
            id: 4,
            type: 'info',
            icon: HiInformationCircle,
            title: 'Tax Tip',
            description: 'Consider maximizing your 401(k) contributions before year-end',
            category: 'Tax',
            priority: 'medium'
        },
        {
            id: 5,
            type: 'warning',
            icon: HiExclamation,
            title: 'Credit Utilization',
            description: 'Your credit card utilization is at 35%, aim for under 30%',
            category: 'Credit',
            priority: 'high'
        },
        {
            id: 6,
            type: 'suggestion',
            icon: HiLightBulb,
            title: 'Dividend Opportunity',
            description: 'Consider dividend-paying stocks for passive income',
            category: 'Investments',
            priority: 'low'
        },
        {
            id: 7,
            type: 'info',
            icon: HiInformationCircle,
            title: 'Market Update',
            description: 'Tech sector showing strong growth potential this quarter',
            category: 'Market',
            priority: 'medium'
        },
        {
            id: 8,
            type: 'success',
            icon: HiCheckCircle,
            title: 'Debt Reduction',
            description: 'You\'ve reduced your total debt by 15% this year',
            category: 'Debt',
            priority: 'low'
        }
    ];
    
    const getTipStyles = (type) => {
        switch(type) {
            case 'warning':
                return {
                    bg: 'bg-amber-50 dark:bg-amber-950/20',
                    border: 'border-amber-200 dark:border-amber-900/30',
                    iconColor: 'text-amber-600 dark:text-amber-400',
                    titleColor: 'text-amber-900 dark:text-amber-100'
                };
            case 'suggestion':
                return {
                    bg: 'bg-blue-50 dark:bg-blue-950/20',
                    border: 'border-blue-200 dark:border-blue-900/30',
                    iconColor: 'text-blue-600 dark:text-blue-400',
                    titleColor: 'text-blue-900 dark:text-blue-100'
                };
            case 'success':
                return {
                    bg: 'bg-green-50 dark:bg-green-950/20',
                    border: 'border-green-200 dark:border-green-900/30',
                    iconColor: 'text-green-600 dark:text-green-400',
                    titleColor: 'text-green-900 dark:text-green-100'
                };
            case 'info':
            default:
                return {
                    bg: 'bg-gray-50 dark:bg-gray-800/20',
                    border: 'border-gray-200 dark:border-gray-700/30',
                    iconColor: 'text-gray-600 dark:text-gray-400',
                    titleColor: 'text-gray-900 dark:text-gray-100'
                };
        }
    };
    return (
        <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#38393c] rounded-2xl overflow-hidden flex flex-col">
            <div className="py-2 px-3 border-b border-gray-200 dark:border-[#38393c]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#28ce78] to-[#1ea560] rounded-lg flex items-center justify-center">
                            <HiLightBulb className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Financial Tips</h2>
                        </div>
                    </div>
                    <span className="px-2 py-1 bg-[#28ce78]/10 text-[#28ce78] text-xs font-medium rounded-full">
                        {financialTips.length} tips
                    </span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
                <div className="space-y-1">
                {financialTips.map((tip) => {
                    const styles = getTipStyles(tip.type);
                    const Icon = tip.icon;
                    
                    return (
                    <div 
                        key={tip.id} 
                        className={`${styles.bg} ${styles.border} border rounded-lg p-2 transition-all hover:shadow-sm relative group`}
                    >
                        <div className="flex items-start gap-2">
                            <Icon className={`w-3 h-3 ${styles.iconColor} mt-0.5 flex-shrink-0`} />
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
                                {tip.description}
                            </p>
                            <div className="relative" ref={el => dropdownRefs.current[tip.id] = el}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenDropdown(openDropdown === tip.id ? null : tip.id);
                                    }}
                                    className=" p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded"
                                >
                                    <HiDotsVertical className="w-4 h-4 text-gray-500" />
                                </button>
                                
                                {openDropdown === tip.id && (
                                    <div className="absolute right-0 top-7 z-10 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#38393c] rounded-lg shadow-lg min-w-[120px]">
                                        <button
                                            onClick={() => handleAction(tip.id, 'consult')}
                                            className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#262626] rounded-t-lg transition-colors"
                                        >
                                            Consult
                                        </button>
                                        <button
                                            onClick={() => handleAction(tip.id, 'dismiss')}
                                            className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#262626] rounded-b-lg transition-colors"
                                        >
                                            Dismiss
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    );
                })}
                </div>
            </div>
        </div>  
    );
};