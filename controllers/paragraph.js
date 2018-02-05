'use strict'

const {
  Paragraph
} = require('../db')

/**
 * @swagger
 * /paragraph/suggest/:id:
 *   post:
 *     tags:
 *       - Paragraph
 *     description: Suggests paragraph changes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Paragraph database identifier
 *         in: path
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
 *       500:
 *         description: Server error
 */
async function suggest(req, res) {
  const paragraph = await Paragraph.findById({_id: req.params.id})
  paragraph.suggests.push({
    text: req.body.usersText
  })
  await paragraph.save()
  res.status(200).json(paragraph)
}

/**
 * @swagger
 * /paragraph/approve/:paragraph/:suggest:
 *   post:
 *     tags:
 *       - Paragraph
 *     description: Approves paragraph
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: paragraph
 *         description: Paragraph database identifier
 *         in: path
 *         required: true
 *         type: string
 *       - name: suggest
 *         description: Suggest database identifier
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Suggest not found
 *       500:
 *         description: Server error
 */
async function approve(req, res) {
  const paragraph = await Paragraph.findById({_id: req.params.paragraph})
  console.log(paragraph.toObject().suggests)
  console.log(req.params.suggest)
  const suggest = paragraph.suggests
    .find(suggest => suggest._id.toString() === req.params.suggest)

  if(!suggest) return res.status(404).json({message: 'Suggest not found'})

  suggest.isApproved = true

  await paragraph.save()

  res.status(200).json(paragraph)
}

module.exports = {
  suggest,
  approve
}