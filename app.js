'use strict';

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const routes = require('./routes')

const PORT = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json())

app.use(morgan('dev'))

require('./swagger')(app)

app.use(routes.articleRoutes())

app.use(function (err, req, res, next) {
  console.error(`[ERROR] ${err}`)
  res.status(500).json({message: 'Server error'})
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`)
  console.log("Discover server's API /docs")
})