const { query } = require('../db.js');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get total bookings
    const totalBookingsResult = await query('SELECT COUNT(*) as count FROM bookings');
    const totalBookings = parseInt(totalBookingsResult.rows[0].count);

    // Get pending approvals
    const pendingResult = await query("SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'");
    const pendingApproval = parseInt(pendingResult.rows[0].count);

    // Get active vehicles
    const vehiclesResult = await query("SELECT COUNT(*) as count FROM vehicles WHERE status = 'available'");
    const activeVehicles = parseInt(vehiclesResult.rows[0].count);

    // Calculate efficiency (approved vs total)
    const approvedResult = await query("SELECT COUNT(*) as count FROM bookings WHERE status = 'approved'");
    const approved = parseInt(approvedResult.rows[0].count);
    const efficiency = totalBookings > 0 ? Math.round((approved / totalBookings) * 100) : 0;

    res.status(200).json({
      totalBookings,
      pendingApproval,
      activeVehicles,
      efficiency
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};