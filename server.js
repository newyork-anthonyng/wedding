'use strict';

const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/home.html'));
});

app.get('/slideshow', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/slideshow.html'));
});

const server = app.listen(process.env.PORT || 8000, () => {
  const port = server.address().port;

  console.log('Server running on ' + port);
});
