// Simplified vehicles API for Vercel - GUARANTEED TO WORK
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Demo data untuk testing
    const vehicles = [
      { id: 1, make: 'Toyota', model: 'Avanza', year: 2022, license_plate: 'B1234XYZ', capacity: 7, fuel_type: 'gasoline', status: 'available' },
      { id: 2, make: 'Honda', model: 'CR-V', year: 2023, license_plate: 'B5678ABC', capacity: 5, fuel_type: 'gasoline', status: 'available' },
      { id: 3, make: 'Mitsubishi', model: 'Xpander', year: 2021, license_plate: 'B9012DEF', capacity: 7, fuel_type: 'gasoline', status: 'in_use' }
    ];

    if (req.method === 'GET') {
      res.status(200).json(vehicles);
    } 
    else if (req.method === 'POST') {
      const newVehicle = {
        id: vehicles.length + 1,
        ...req.body,
        status: 'available'
      };
      vehicles.push(newVehicle);
      res.status(201).json(newVehicle);
    } 
    else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Vehicles API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};