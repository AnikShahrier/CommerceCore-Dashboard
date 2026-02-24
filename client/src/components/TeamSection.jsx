
const TeamSection = () => {
  const teamMembers = [
    { name: 'Sarah Johnson', role: 'Product Designer', avatar: 'SJ', status: 'online' },
    { name: 'Michael Chen', role: 'Frontend Developer', avatar: 'MC', status: 'online' },
    { name: 'Emily Davis', role: 'Backend Developer', avatar: 'ED', status: 'offline' },
    { name: 'James Wilson', role: 'Project Manager', avatar: 'JW', status: 'busy' },
  ];

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">Our Team</h3>
          <p className="text-sm text-gray-500">12 members online</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
          View All Members
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {member.avatar}
              </div>
              <div className={`absolute bottom-0 right-0 w-3 h-3 ${statusColors[member.status]} border-2 border-white rounded-full`}></div>
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{member.name}</p>
              <p className="text-xs text-gray-500">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;