const { query } = require('./db.js');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const result = await query(`
        SELECT 
          b.*,
          u.username as requester_username,
          u.full_name as requester_name,
          v.make as vehicle_make,
          v.model as vehicle_model,
          d.name as driver_name
        FROM bookings b
        LEFT JOIN users u ON b.requester_id = u.id
        LEFT JOIN vehicles v ON b.vehicle_id = v.id
        LEFT JOIN drivers d ON b.driver_id = d.id
        ORDER BY b.created_at DESC
      `);
      res.status(200).json(result.rows);
    } 
    else if (req.method === 'POST') {
      const { 
        requester_id, 
        destination, 
        purpose, 
        start_date, 
        end_date, 
        passenger_count 
      } = req.body;
      
      if (!requester_id || !destination || !purpose || !start_date || !end_date) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Generate booking number
      const bookingNumber = 'BK' + Date.now().toString().substr(-8);

      const result = await query(
        `INSERT INTO bookings (
          booking_number, requester_id, destination, purpose, 
          start_date, end_date, passenger_count, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending') 
        RETURNING *`,
        [bookingNumber, requester_id, destination, purpose, start_date, end_date, passenger_count || 1]
      );

      res.status(201).json(result.rows[0]);
    } 
    else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Bookings API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};