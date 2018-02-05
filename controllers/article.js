'use strict'

const request = require('request-promise')
const isUrl = require('is-url')

const { parseArticle } = require('../parser')

const { Article } = require('../db')

/**
 * @swagger
 * /article:
 *   get:
 *     tags:
 *       - Article
 *     description: Parses an article
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: url
 *         description: Article url
 *         in: query
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
async function get(req, res) {
  const {url} = req.query
  if(!isUrl(url)) return res.status(406).json({message: 'URL is not correct'})

  const html = await request.get(url)
  const article = parseArticle(html)

  res.status(200).json(article)
}

/**
 * @swagger
 * /article:
 *   post:
 *     tags:
 *       - Article
 *     description: Saves article suggestion
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: articleUrl
 *         description: Article url
 *         in: formData
 *         required: true
 *         type: string
 *       - name: originalText
 *         description: Original paragraph text
 *         in: formData
 *         required: true
 *         type: string
 *       - name: usersText
 *         description: Suggested paragraph text
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             articleUrl:
 *               type: string
 *             originalText:
 *               type: string
 *             usersText:
 *               type: string
 *       406:
 *         description: URL is not correct
 *       500:
 *         description: Server error
 */
async function save(req, res) {
  const newArticle = new Article(req.body)
  const article = await newArticle.save()
  res.status(200).json(article)
}

/**
 * @swagger
 * /article/:id:
 *   put:
 *     tags:
 *       - Article
 *     description: Updates article by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: Article database identifier
 *         in: path
 *         required: true
 *         type: string
 *       - name: originalText
 *         description: Original paragraph text
 *         in: formData
 *         required: true
 *         type: string
 *       - name: usersText
 *         description: Suggested paragraph text
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Article not found
 *       500:
 *         description: Server error
 */
async function update(req, res) {
  const _id = req.params.id
  const {
    originalText,
    usersText
  } = req.body
  const article = await Article.findById({_id})
  if(!article) return res.status(404).json({message: 'Article not found'})

  await article.save({originalText, usersText})

  res.status(200).json(article)
}

/**
 * @swagger
 * /article/:id:
 *   delete:
 *     tags:
 *       - Article
 *     description: Deletes article by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: Article database identifier
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Server error
 */
async function remove(req, res) {
  await Article.remove({_id: req.params.id})
  res.status(200).json({message: 'OK'})
}

module.exports = {
  get,
  save,
  update,
  remove
}