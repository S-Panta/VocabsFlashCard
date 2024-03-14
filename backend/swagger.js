const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FlashCard',
      version: '1.0.0'
    }
  },
  apis: ['./controllers/*.js']
}

const specs = swaggerJsdoc(options)

module.exports = specs
