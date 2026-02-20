const pool = require('../config/db');

// Get Key Metrics (Total Revenue, Total Orders, Low Stock)
exports.getDashboardStats = async (req, res) => {
  try {
   const [revenueResult, ordersResult, stockResult] = await Promise.all([
  pool.query('SELECT SUM(total_amount) as total FROM orders'),
  pool.query('SELECT COUNT(*) as count FROM orders'),
  pool.query("SELECT COUNT(*) as count FROM products WHERE stock < 100")
]);

    res.json({
      revenue: revenueResult.rows[0].total || 0,
      orders: ordersResult.rows[0].count || 0,
      lowStock: stockResult.rows[0].count || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get Sales Data for Graph (Last 7 Days)
exports.getSalesChart = async (req, res) => {
  try {
    // We group orders by date and sum the amount
    const query = `
      SELECT DATE(created_at) as date, SUM(total_amount) as total 
      FROM orders 
      WHERE created_at >= NOW() - INTERVAL '7 days'
      GROUP BY DATE(created_at) 
      ORDER BY date ASC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};