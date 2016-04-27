'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const Image = require('../models/image');
const mongoose = require('mongoose');
const config = require('../config');
const utility = require('../public/utility');
const aws = require('aws-sdk');

mongoose.connect(config['mongoURI'][app.settings.env], (err, res) => {
  if(err) {
    console.log('Error connecting to database. ' + err);
  } else {
    console.log('Connected to database: ' + config['mongoURI'][app.settings.env]);
  }
});

const AWS_ACCESS_KEY = config['aws_access_key'];
const AWS_SECRET_KEY = config['aws_secret_key'];
const S3_BUCKET = config['s3_bucket'];

router.get('/all', getAllImages);
router.get('/sign_s3', getSignedS3Request);
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

function getSignedS3Request(req, res) {
  aws.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY
  });

  let s3 = new aws.S3();
  let s3_params = {
    Bucket: S3_BUCKET,
    Key: req.query.file_name,
    Expires: 60,
    ContentType: req.query.file_type,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3_params, function(err, data) {
    if(err) {
      res.json({
        SUCCESS: false,
        MESSAGE: 'Failed to retrive signed S3 request. Error: ' + err
      });
    } else {
      res.json({
        SUCCESS: true,
        MESSAGE: 'Retrieved signed S3 request.',
        SignedRequest: data,
        url: 'https://' + S3_BUCKET + '.s3.amazonaws.com/' + req.query.file_name
      });
    };
  });
}

function uploadImage(req, res) {
};

module.exports = router;
