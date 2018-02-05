'use strict';

const Router = require('express-promise-router')

const article = require('./controllers/article')

function articleRoutes() {
  const router = new Router()

  router
    .get('/article', article.get)
    .post('/article', article.save)
  router
    .put('/article/:id', article.update)
    .delete('/article/:id', article.remove)

  return router
}

module.exports = {
  articleRoutes
}