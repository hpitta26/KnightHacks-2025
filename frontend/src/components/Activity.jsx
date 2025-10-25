import { useState, useEffect } from 'react';

function Activity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch activities data from backend
  useEffect(() => {
    const fetchActivitiesData = async () => {
      try {
        const response = await fetch('http://localhost:8000/get_activities');
        if (!response.ok) {
          throw new Error('Failed to fetch activities data');
        }
        const data = await response.json();
        // Convert timestamp strings to Date objects
        const processedData = data.map(activity => ({
          ...activity,
          timestamp: new Date(activity.timestamp)
        }));
        setActivities(processedData);
      } catch (error) {
        console.error('Error fetching activities data:', error);
        // Fallback to empty array if fetch fails
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivitiesData();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading activities...</div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">No activities found</div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-3 pb-10 overflow-y-auto">
        <div className="space-y-1">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-[#38393c]">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex-1 pl-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.vendor}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.category}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {activity.description}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {activity.account} • {activity.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>
              <div className={`text-sm font-semibold ${activity.type === 'in' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {activity.type === 'in' ? '+' : '-'}{formatCurrency(activity.amount)}
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

export default Activity;
