
// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware setup
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from the frontend
app.use(express.json()); // Parse JSON request bodies

const BEE_CLIENT_ID = process.env.BEE_CLIENT_ID;
const BEE_CLIENT_SECRET = process.env.BEE_CLIENT_SECRET;

/**
 * Fetches an access token from the Beefree Auth v2 API.
 * This function encapsulates the token request logic to be reused.
 * @returns {Promise<string>} A promise that resolves with the access token.
 * @throws {Error} If fetching the token fails.
 */
const getBeeToken = async () => {
  try {
    // Encode client ID and secret for Basic Authentication header
    const credentials = Buffer.from(`${BEE_CLIENT_ID}:${BEE_CLIENT_SECRET}`).toString('base64');
    
    const response = await axios.post(
      'https://auth.beefree.io/v2/token',
      'grant_type=client_credentials', // The request body
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Beefree token:', error.response ? error.response.data : error.message);
    throw new Error('Failed to authenticate with Beefree API.');
  }
};

// --- API Endpoints ---

/**
 * @route GET /api/auth
 * @description Provides a Beefree API access token to the frontend.
 * The frontend needs this token to initialize the Beefree SDK editor.
 */
app.get('/api/auth', async (req, res) => {
  try {
    const accessToken = await getBeeToken();
    res.json({ access_token: accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route POST /api/import-html
 * @description Accepts HTML content, converts it to Beefree's JSON format, and returns it.
 * This allows users to import their existing HTML templates into the editor.
 */
app.post('/api/import-html', async (req, res) => {
  const { html } = req.body;

  if (!html) {
    return res.status(400).json({ error: 'HTML content is required.' });
  }

  try {
    // Get a fresh token for this request
    const accessToken = await getBeeToken();

    // Call the Beefree HTML transform API
    const transformResponse = await axios.post(
      'https://transform.getbee.io/v1/html/to/json',
      html, // The user's HTML string is the body
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'text/html', // The content type of the request body
          'Accept': 'application/json' // We expect a JSON response
        },
      }
    );

    res.json(transformResponse.data);
  } catch (error) {
    console.error('Error importing HTML:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to import HTML.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
