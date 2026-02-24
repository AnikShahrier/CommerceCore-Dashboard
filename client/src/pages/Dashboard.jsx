import { useEffect, useState } from 'react';
import { getStats, getSalesChart } from '../services/api';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import HeroSection from '../components/HeroSection';

import CalendarWidget from '../components/CalendarWidget';
import TaskList from '../components/TaskList';
import TeamSection from '../components/TeamSection';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({ revenue: 0, orders: 0, lowStock: 0, completedProjects: 0 });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, chartRes] = await Promise.all([getStats(), getSalesChart()]);
        setStats({
          revenue: statsRes.data.revenue,
          orders: statsRes.data.orders,
          lowStock: statsRes.data.lowStock,
          completedProjects: 42
        });
        setChartData(chartRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Hero Section */}
            <HeroSection />
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="In Progress Projects"
                value={stats.orders}
                suffix="/12"
                progress={75}
                color="blue"
                icon="📊"
              />
              <StatCard 
                title="Tasks"
                value={stats.lowStock * 10}
                suffix="/126"
                progress={60}
                color="purple"
                icon="✅"
              />
              <StatCard 
                title="Completed Projects"
                value={stats.completedProjects}
                suffix="/56"
                progress={85}
                color="green"
                icon="🎯"
              />
              <StatCard 
                title="Total Revenue"
                value={`$${stats.revenue}`}
                progress={90}
                color="indigo"
                icon="💰"
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Productivity Metrics - Takes 2 columns */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Productivity Metrics</h3>
                  <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>This Year</option>
                  </select>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="total" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', r: 4 }}
                        activeDot={{ r: 6, fill: '#2563eb' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right Column - Calendar & Tasks */}
              <div className="space-y-6">
                <CalendarWidget />
                <TaskList />
              </div>
            </div>

            {/* Team Section */}
            <TeamSection />
            
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;