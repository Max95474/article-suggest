'use strict';

const Router = require('express-promise-router')

const article = require('./controllers/article')

function articleRoutes() {
  const router = new Router()

  router
    .get('/article', article.get)
    .post('/article', article.save)

  return router
}

module.exports = {
  articleRoutes
}