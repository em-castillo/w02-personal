// basic usage
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API contacts',
    description: 'contacts',
  },
  // match port from render this time including https
  host: 'lesson-02.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);