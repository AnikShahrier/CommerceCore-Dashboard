import { useEffect, useState } from 'react';
import { getStats, getSalesChart } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({ revenue: 0, orders: 0, lowStock: 0 });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both stats and chart data in parallel
        const [statsRes, chartRes] = await Promise.all([getStats(), getSalesChart()]);
        setStats(statsRes.data);
        setChartData(chartRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-10">Loading Dashboard...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">E-Commerce Dashboard</h1>
      
      {/* 1. Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Revenue" value={`$${stats.revenue}`} color="bg-green-500" />
        <StatCard title="Total Orders" value={stats.orders} color="bg-blue-500" />
        <StatCard title="Low Stock Items" value={stats.lowStock} color="bg-red-500" />
      </div>

      {/* 2. Sales Graph */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Sales Last 7 Days</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Helper Component for Cards
const StatCard = ({ title, value, color }) => (
  <div className={`${color} text-white p-6 rounded-lg shadow-md`}>
    <h3 className="text-lg opacity-90">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default Dashboard;