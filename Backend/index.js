// index.js (ES Module-Version)
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/spotify-token', async (req, res) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

    res.json({
      access_token: response.data.access_token,
      expires_in: response.data.expires_in
    });
  } catch (error) {
    console.error('Fehler beim Abrufen des Tokens:', error.response?.data || error.message);
    res.status(500).json({ error: 'Token konnte nicht geholt werden' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend läuft auf http://localhost:${PORT}`);
});
