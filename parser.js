'use strict'

const cheerio = require('cheerio')

/**
 * Parses article page
 *
 * @param {String} html
 *
 * @returns {Object}
 * */
function parseArticle(html) {
  const $ = cheerio.load(html)

  const title = $('title').text()
  const paragraphs = $('article p')
    .map(function () { return $(this).text() })
    .toArray()

  return {
    title,
    paragraphs
  }
}

module.exports = {
  parseArticle
}