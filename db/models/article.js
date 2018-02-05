'use strict';

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  articleUrl: {
    type: String,
    required: true
  },
  paragraphs: [{type: Schema.Types.ObjectId, ref: 'Paragraph'}]
})

module.exports = mongoose.model('Article', ArticleSchema)