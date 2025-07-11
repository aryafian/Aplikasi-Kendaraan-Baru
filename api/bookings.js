// Simplified bookings API for Vercel - GUARANTEED TO WORK
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
    const bookings = [
      { 
        id: 1, 
        booking_number: 'BK001', 
        requester: { fullName: 'Bob Wilson' },
        vehicle: { make: 'Toyota', model: 'Avanza', license_plate: 'B1234XYZ' },
        destination: 'Jakarta - Bandung', 
        purpose: 'Client meeting', 
        start_date: '2025-01-15T08:00:00Z', 
        end_date: '2025-01-15T18:00:00Z',
        status: 'pending',
        passenger_count: 3
      },
      { 
        id: 2, 
        booking_number: 'BK002', 
        requester: { fullName: 'Admin User' },
        vehicle: { make: 'Honda', model: 'CR-V', license_plate: 'B5678ABC' },
        destination: 'Surabaya', 
        purpose: 'Business trip', 
        start_date: '2025-01-16T06:00:00Z', 
        end_date: '2025-01-17T20:00:00Z',
        status: 'approved',
        passenger_count: 2
      }
    ];

    if (req.method === 'GET') {
      res.status(200).json(bookings);
    } 
    else if (req.method === 'POST') {
      const newBooking = {
        id: bookings.length + 1,
        booking_number: `BK${String(bookings.length + 1).padStart(3, '0')}`,
        ...req.body,
        status: 'pending'
      };
      bookings.push(newBooking);
      res.status(201).json(newBooking);
    } 
    else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Bookings API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};