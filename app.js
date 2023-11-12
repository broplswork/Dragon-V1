// app.js
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/search', async (req, res) => {
  const { q } = req.query;
  const proxyUrl = 'https://www.google.com/?safe=active&ssui=on';

  try {
    const response = await axios.get(proxyUrl, {
      params: {
        q,
      },
    });

    const results = extractResults(response.data);

    res.json(results);
  } catch (error) {
    console.error('Error searching:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function extractResults(html) {
  const $ = cheerio.load(html);
  const results = [];

  $('div.g').each((index, element) => {
    const title = $(element).find('h3').text();
    results.push({ title });
  });

  return results;
}

app.listen(PORT, () => {
  console.log(`GODLY Proxies V4 is running on http://localhost:${PORT}`);
});
