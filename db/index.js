'use strict';

const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')

mongoose.connect("mongodb://localhost:27017/article-suggest")
  .catch(err => {
    console.log('Mongoose error: ', err)
    process.exit(1)
  })

const db = {}

fs
  .readdirSync(path.join(__dirname, 'models'))
  .filter(file =>(file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))
    db[model.name] = model;
  });

module.exports = db