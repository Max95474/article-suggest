'use strict'

const request = require('request-promise')
const isUrl = require('is-url')

const { parseArticle } = require('../parser')

const {
  Article,
  Paragraph
} = require('../db')

/**
 * @swagger
 * /article:
 *   post:
 *     tags:
 *       - Article
 *     description: Parses an article
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: url
 *         description: Article url
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             paragraphs:
 *               type: array
 *               items:
 *                 type: string
 *       406:
 *         description: URL is not correct
 *       500:
 *         description: Server error
 */
async function parse(req, res) {
  const {url} = req.body
  if(!isUrl(url)) return res.status(406).json({message: 'URL is not correct'})

  const html = await request.get(url)
  const data = parseArticle(html)

  const newArticle = await new Article({articleUrl: url})
  const newParagraphs = await Promise.all(data.paragraphs.map(paragraph =>
    new Paragraph({originalText: paragraph, article: newArticle._id}).save()))
  newArticle.paragraphs = newParagraphs.map(paragraph => paragraph._id)
  await newArticle.save()

  res.status(200).json({
    title: data.title,
    paragraphs: newParagraphs
  })
}

/**
 * @swagger
 * /articles:
 *   get:
 *     tags:
 *       - Article
 *     description: Returns all suggested articles
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               articleUrl:
 *                 type: string
 *               originalText:
 *                 type: string
 *               usersText:
 *                 type: string
 *               isApproved:
 *                 type: boolean
 *       406:
 *         description: URL is not correct
 *       500:
 *         description: Server error
 */
async function getAll(req, res) {
  const articles = await Article.find({}, { __v: 0 })
    .populate('paragraphs').exec()
  res.status(200).json(articles)
}

module.exports = {
  parse,
  getAll,
}