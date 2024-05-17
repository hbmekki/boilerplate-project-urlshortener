require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const url = require('url').URL;
const bodyParser = require('body-parser');

const urlMap = [];

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', function(req, res) {

  try {
    new url(req.body.url);
    const urlItem ={
      original_url : req.body.url,  short_url : urlMap.length + 1
    };
    urlMap.push(urlItem)

    return  res.json(urlItem);
  } catch(err) {
    res.json({ error: 'invalid url' });
  }
});

app.get('/api/shorturl/:short', function(req, res) {
  const short = Number(req.params.short);
  const url = urlMap[short - 1]["original_url"];
  res.redirect(url);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
