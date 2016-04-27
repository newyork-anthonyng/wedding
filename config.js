'use strict';

const config = {};

config['mongoURI'] = {
  test: process.env.MONGOLAB_URI || 'mongodb://localhost/images-test',
  development: process.env.MONGOLAB_URI || 'mongodb://localhost/images',
  production: process.env.MONGOLAB_URI
};

config['aws_access_key'] = process.env.AWS_ACCESS_KEY;
config['aws_secret_key'] = process.env.AWS_SECRET_KEY;
config['s3_bucket'] = process.env.S3_BUCKET;

module.exports = config;
