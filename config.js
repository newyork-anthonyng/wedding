'use strict';

const config = {};

config['mongoURI'] = {
  test: process.env.MONGOLAB_URI || 'mongodb://localhost/images-test',
  development: process.env.MONGOLAB_URI || 'mongodb://localhost/images',
  production: process.env.MONGOLAB_URI
};

module.exports = config;
