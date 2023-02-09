const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
//validation
const createError = require('http-errors');
const cors = require('cors');
const { infoValidation } = require('./validation.js');

const port = process.env.PORT || 8080;
const app = express();

// express setup
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app
.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) // express setup
  .use(bodyParser.json())
  //validation
  .use(express.json())
  .use(bodyParser.urlencoded({
    extended: true
}))
.use(cors())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Content-Type', 'appication/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
  })
  .use('/', require('./routes'))

  .use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});