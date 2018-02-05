'use strict'

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const SwaggerValidator = require('swagger-inputs-validator');

function swagger(app) {
  const swaggerDoc = {
    swaggerDefinition: {
      info: {
        title: 'Article suggest',
        version: '1.0.0',
      },
    },
    consumes: [
      'application/json'
    ],
    produces: [
      'application/json'
    ],
    schemes: [
      'http'
    ],
    apis: [
      './controllers/article.js',
      './controllers/paragraph.js'
    ]
  }

  const swaggerSpec = swaggerJSDoc(swaggerDoc)

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, false, {deepLinking: true}));

  const middlewareOptions = {
    strict: true,
    allowNull : false,
    onError: (errors, req, res) => {
      if(errors && errors.length) {
        let errorMessage = '';
        errors.forEach(error => errorMessage += error.message + ' ')
        res.status(400).json({message: errorMessage})
        console.log('Request validation error: ', errorMessage)
      }
    }
  }

  const swaggerMiddleware = new SwaggerValidator(swaggerSpec, middlewareOptions);

  app.use(swaggerMiddleware.all())
}

module.exports = swagger