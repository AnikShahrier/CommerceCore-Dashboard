import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: '📊', label: 'Home', path: '/' },
    { icon: '📁', label: 'Files', path: '/files' },
    { icon: '📈', label: 'Analytics', path: '/analytics' },
    { icon: '📋', label: 'Integrations', path: '/integrations' },
    { icon: '🔔', label: 'Notifications', path: '/notifications' },
    { icon: '⚙️', label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-xl font-bold">P</span>
        </div>
        <span className="text-xl font-bold text-gray-800">ProServe</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Premium Upgrade */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-4 text-white">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 backdrop-blur-sm">
            <span className="text-2xl">💎</span>
          </div>
          <h4 className="font-semibold mb-1">Upgrade to Premium</h4>
          <p className="text-sm text-purple-100 mb-3">Unlock all features</p>
          <button className="w-full bg-white text-purple-600 py-2 rounded-lg font-semibold text-sm hover:bg-purple-50 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <img 
            src="https://ui-avatars.com/api/?name=Alex+Morgan&background=3b82f6&color=fff" 
            alt="User" 
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <p className="font-semibold text-gray-800 text-sm">Alex Morgan</p>
            <p className="text-xs text-gray-500">alex@proserve.com</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            ⚙️
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;