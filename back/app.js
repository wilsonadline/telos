const express = require('express');
const bodyParser = require('body-parser');
const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');
const db = require('./src/config/config');

const app = express();
const PORT = process.env.PORT || 3001;
var cors = require('cors')

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const consumer_key = 'KdW2k223cF9soo7SsQDyOzwLe';
const consumer_secret = '3aTTlV8BZynfNQQSoOPEhjiNI7KXltvb27HAXTdgeXxAEvj0Gz';
const access_token = '1779670777308041217-Gg57PIL7DNrVK08LjwYoX0mvKaTepe';
const access_secret = 'QRaLQvAjsWblFzNnOGunYzf5ULXuVykeXNzqgAXmoVCOb';

const client = new TwitterApi({
  appKey: consumer_key,
  appSecret: consumer_secret,
  accessToken: access_token,
  accessSecret: access_secret,
});

app.get('/api/contacts', (req, res) => {
  db.query('SELECT * FROM contacts', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des contacts :', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des contacts' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/senders', (req, res) => {
  
  const sql = 'SELECT id, email FROM contacts WHERE email IS NOT NULL AND email != ""';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des contacts :', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des contacts' });
      return;
    }
    res.json(results);
  });
});

app.post('/sendTweet', async (req, res) => {
  try {
    const { text } = req.body;

    const response = await client.v2.tweet({"text": text,});
    console.log('Tweet sent:', response);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending tweet:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/sendTweetWithMedia', async (req, res) => {
  try {
    const { text } = req.body;
    let media_ids = [];

    if (req.files && req.files.image) {
      const image = req.files.image;
      const imagePath = __dirname + '/uploads/' + image.name;
      await image.mv(imagePath);
      const media = await client.uploadMedia(imagePath);
      media_ids.push(media.media_id);
      fs.unlinkSync(imagePath);
    }

    const response = await client.v2.tweet({
      "text": text,
      "media": {"media_ids": media_ids }
    });
    console.log('Tweet sent:', response);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending tweet:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur Express démarré sur le port ${PORT}`);
});
