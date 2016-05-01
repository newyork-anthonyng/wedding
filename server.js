'use strict';

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const imageRoutes = require('./routes/image');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/image', imageRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/home.html'));
});

app.get('/slideshow', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/slideshow.html'));
});

app.get('/album', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/album.html'));
});

const server = app.listen(process.env.PORT || 8000, () => {
  const port = server.address().port;

  console.log('Server running on ' + port);
});

module.exports = app;
