// server.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Route for geocoding an address
app.get('/api/geocode', async (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({ error: 'Address query parameter is required.' });
    }

    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: address,
                format: 'json',
                addressdetails: 1
            },
            headers: {
                'User-Agent': 'MyGeocodingApp/1.0 (myemail@example.com)' // Replace with your app name and email
            }
        });

        if (response.data.length === 0) {
            return res.status(404).json({ error: 'No results found.' });
        }

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data from Nominatim.' });
    }
});

// Route for reverse geocoding
app.get('/api/reverse', async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude query parameters are required.' });
    }

    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
            params: {
                lat,
                lon,
                format: 'json',
                addressdetails: 1
            },
            headers: {
                'User-Agent': 'MyGeocodingApp/1.0 (myemail@example.com)' // Replace with your app name and email
            }
        });

        if (!response.data) {
            return res.status(404).json({ error: 'No results found.' });
        }

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data from Nominatim.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
