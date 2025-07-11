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
      const result = await query('SELECT * FROM drivers ORDER BY id');
      res.status(200).json(result.rows);
    } 
    else if (req.method === 'POST') {
      const { name, license_number, phone, email } = req.body;
      
      if (!name || !license_number) {
        return res.status(400).json({ message: 'Name and license number required' });
      }

      const result = await query(
        `INSERT INTO drivers (name, license_number, phone, email, status) 
         VALUES ($1, $2, $3, $4, 'available') 
         RETURNING *`,
        [name, license_number, phone, email]
      );

      res.status(201).json(result.rows[0]);
    } 
    else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Drivers API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};