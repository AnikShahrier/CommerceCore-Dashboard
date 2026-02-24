import { useState } from 'react';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // You can emit search event or navigate to search page
    console.log('Searching for:', e.target.value);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search tasks, projects, team members..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
            <span className="text-xl">🔔</span>
            {notifications > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </button>

          {/* Messages */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
            <span className="text-xl">💬</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>

          {/* Help */}
          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
            <span className="text-xl">❓</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;