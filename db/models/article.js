'use strict';

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  articleUrl: {
    type: String,
    required: true
  },
  originalText: {
    type: String,
    required: true
  },
  usersText: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Article', ArticleSchema)