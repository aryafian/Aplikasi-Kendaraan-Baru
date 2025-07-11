// Simplified login for Vercel deployment - GUARANTEED TO WORK
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    // Demo users untuk testing (replace dengan database nanti)
    const users = {
      'admin': { 
        password: 'admin123', 
        user: { id: 1, username: 'admin', fullName: 'Administrator', role: 'admin', department: 'IT' }
      },
      'approver1': { 
        password: 'approver123', 
        user: { id: 2, username: 'approver1', fullName: 'John Doe', role: 'approver', department: 'Operations', approvalLevel: 'level1' }
      },
      'user1': { 
        password: 'user123', 
        user: { id: 3, username: 'user1', fullName: 'Bob Wilson', role: 'requester', department: 'Sales' }
      }
    };

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    const userRecord = users[username];
    if (!userRecord || userRecord.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ user: userRecord.user });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};