'use strict';

const Router = require('express-promise-router')

const article = require('./controllers/article')
const paragraph = require('./controllers/paragraph')

function articleRoutes() {
  const router = new Router()

  router
    .post('/article', article.parse)
    .get('/articles', article.getAll)

  return router
}

function paragraphRoutes() {
  const router = new Router()

  router
    .post('/paragraph/suggest/:id', paragraph.suggest)
    .post('/paragraph/approve/:paragraph/:suggest', paragraph.approve)

  return router
}

module.exports = {
  articleRoutes,
  paragraphRoutes
}