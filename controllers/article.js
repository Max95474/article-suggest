'use strict'

const request = require('request-promise')
const isUrl = require('is-url')

const { parseArticle } = require('../parser')

async function get(req, res) {
  const {url} = req.query
  if(!isUrl(url)) return res.status(406).json({message: 'URL is not correct'})

  const html = await request.get(url)
  const article = parseArticle(html)
  console.log('Article: ', article)

  res.sendStatus(200)
}

async function save(req, res) {

}

module.exports = {
  get,
  save
}