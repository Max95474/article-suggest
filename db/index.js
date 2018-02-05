'use strict';

const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')

mongoose.connect("mongodb://mongo:27017/article-suggest")
  .catch(err => {
    console.log('Mongoose error: ', err)
    process.exit(1)
  })

const db = {}

fs
  .readdirSync(path.join(__dirname, 'models'))
  .filter(file =>(file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, 'models', file))
    db[model.modelName] = model;
  });

module.exports = db