const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Welcome Back, Alex! 👋</h1>
          <p className="text-blue-100 mb-6 max-w-md">
            You have 12 tasks pending and 3 meetings today. Let's make it productive!
          </p>
          <div className="flex space-x-3">
            <button className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg">
              View Tasks
            </button>
            <button className="bg-blue-500/30 backdrop-blur-sm text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-500/40 transition-colors border border-white/20">
              Schedule
            </button>
          </div>
        </div>

        {/* 3D Cube Illustration */}
        <div className="hidden lg:block">
          <div className="w-48 h-48 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-200 rounded-2xl transform rotate-12 opacity-80"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl transform -rotate-6 shadow-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;