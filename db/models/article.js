'use strict';

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  title: String,
  paragraphs: Array[String]
})

module.exports = mongoose.model(ArticleSchema, 'Article')