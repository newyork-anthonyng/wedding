'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  url: {
    type: String,
    required: true,
    unique: true
  },

  date: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
