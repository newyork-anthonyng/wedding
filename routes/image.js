'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const Image = require('../models/image');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/images', (err, res) => {
  if(err) {
    console.log('Error connecting to database.');
  } else {
    console.log('Connected to database.');
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
      obj.date = new Date(currentImage.date);

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
