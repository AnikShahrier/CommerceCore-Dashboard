const StatCard = ({ title, value, suffix, progress, color, icon }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    indigo: 'from-indigo-500 to-indigo-600',
  };

  const progressColors = {
    blue: 'stroke-blue-500',
    purple: 'stroke-purple-500',
    green: 'stroke-green-500',
    indigo: 'stroke-indigo-500',
  };

  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">
            {value}
            {suffix && <span className="text-gray-400 text-lg font-normal ml-1">{suffix}</span>}
          </h3>
        </div>
        <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center shadow-lg`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>

      {/* Circular Progress */}
      <div className="flex items-center justify-between">
        <div className="relative w-20 h-20">
          <svg className="w-20 h-20 transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="40"
              cy="40"
              r="36"
              className={`${progressColors[color]} transition-all duration-1000 ease-out`}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">
            {progress}%
          </span>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Progress</p>
          <p className={`text-sm font-semibold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}>
            {progress}% Complete
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;