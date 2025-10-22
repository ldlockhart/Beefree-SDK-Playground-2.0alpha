// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware setup
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json()); // Important for parsing the request body from the frontend

const BEE_CLIENT_ID = process.env.BEE_CLIENT_ID;
const BEE_CLIENT_SECRET = process.env.BEE_CLIENT_SECRET;

if (!BEE_CLIENT_ID || !BEE_CLIENT_SECRET) {
  console.error('FATAL ERROR: Missing Beefree credentials in .env file.');
  process.exit(1); // Exit if credentials are not set
}

// Auth Endpoint using the accessible legacy method
app.post('/proxy/bee-auth', async (req, res) => {
  try {
    const { uid } = req.body; // Get the user ID from the frontend's request

    const response = await axios.post(
      'https://auth.getbee.io/loginV2', // Using the working endpoint
      {
        // Sending credentials in the JSON body
        client_id: BEE_CLIENT_ID,
        client_secret: BEE_CLIENT_SECRET,
        uid: uid || 'beefree-sdk-playground-user' // Use the UID from frontend or a default
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    // Forward the successful response from Beefree to the frontend
    res.json(response.data);

  } catch (error) {
    // Provide a more detailed error log for easier debugging
    console.error('Authentication error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to authenticate with Beefree API.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Backend server is running on http://localhost:${PORT}`);
});
