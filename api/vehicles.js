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
      const result = await query('SELECT * FROM vehicles ORDER BY id');
      res.status(200).json(result.rows);
    } 
    else if (req.method === 'POST') {
      const { make, model, year, license_plate, capacity, fuel_type } = req.body;
      
      if (!make || !model || !year || !license_plate) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const result = await query(
        `INSERT INTO vehicles (make, model, year, license_plate, capacity, fuel_type, status) 
         VALUES ($1, $2, $3, $4, $5, $6, 'available') 
         RETURNING *`,
        [make, model, year, license_plate, capacity || 4, fuel_type || 'gasoline']
      );

      res.status(201).json(result.rows[0]);
    } 
    else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Vehicles API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};