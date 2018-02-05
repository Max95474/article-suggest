'use strict';

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ParagraphSchema = new Schema({
  article: {
    type: Schema.Types.ObjectId,
    ref: 'Article'
  },
  originalText: {
    type: String,
    required: true
  },
  usersText: {
    type: String
  },
  suggests: [{
    text: String,
    isApproved: {
      type: Boolean,
      default: false
    },
    _id: {
      type: Schema.Types.ObjectId,
      default: new mongoose.mongo.ObjectId()
    }
  }]
})

module.exports = mongoose.model('Paragraph', ParagraphSchema)