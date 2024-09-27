const axios = require('axios');

export default async function handler(req, res) {
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

        res.status(200).json(response.data);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'An error occurred while fetching data from Nominatim.' });
    }
}
