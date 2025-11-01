const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      version: '1.0.0',
      description: 'Product API with JWT authentication and product management'
    },
    servers: [{ url: 'http://localhost:3000', description: 'Local server' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        UserInput: {
          type: 'object',
          required: ['name','email','password','passwordConfirm'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
            passwordConfirm: { type: 'string' }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            token: { type: 'string' }
          }
        },
        LoginInput: {
          type: 'object',
          required: ['email','password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' }
          }
        },
        ProductInput: {
          type: 'object',
          required: ['colorwayName'],
          properties: {
            colorwayName: { type: 'string' },
            gender: { type: 'string' },
            category: { type: 'string' },
            season: { type: 'string' },
            active: { type: 'boolean' },
            targetVolume: { type: 'number' },
            materialType: { type: 'string' },
            merchFabricType: { type: 'string' },
            currentPlannedLifecycle: { type: 'string' }
          }
        },
        Product: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            colorwayCode: { type: 'string' },
            colorwayName: { type: 'string' },
            brand: { type: 'string' },
            gender: { type: 'string' },
            category: { type: 'string' },
            season: { type: 'string' },
            active: { type: 'boolean' },
            targetVolume: { type: 'number' },
            materialType: { type: 'string' },
            merchFabricType: { type: 'string' },
            currentPlannedLifecycle: { type: 'string' },
            createdBy: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            message: { type: 'string' }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
