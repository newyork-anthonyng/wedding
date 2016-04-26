'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const Image = require('../models/image');
const mongoose = require('mongoose');
const config = require('../config');
const utility = require('../public/utility');

mongoose.connect(config['mongoURI'][app.settings.env], (err, res) => {
  if(err) {
    console.log('Error connecting to database. ' + err);
  } else {
    console.log('Connected to database: ' + config['mongoURI'][app.settings.env]);
  }
});

router.get('/all', getAllImages);
router.post('/upload', uploadImage);

function getAllImages(req, res) {
  Image.find({}, (err, images) => {
    if(err) throw err;

    var myImages = images.map(function(currentImage) {
      var obj = {};
      obj.url = currentImage.url;
      obj.date = utility.formatTime(new Date(currentImage.date));

      return obj;
    });

    res.json({
      SUCCESS: true,
      MESSAGE: 'Retrieved all images.',
      Images: myImages
    });
  });
};

function uploadImage(req, res) {
};

module.exports = router;
