// Test API untuk memastikan Vercel serverless berfungsi
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  res.status(200).json({ 
    message: 'VehicleFlow API berfungsi!',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  });
};