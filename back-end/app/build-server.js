const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api')

module.exports = (cb) => {
  const app = express()
  app.disable('x-powered-by')
  app.use(cors())
  app.use(bodyParser.json({}))
  app.use(morgan('[:date[iso]] :method :url :status :response-time ms - :res[content-length]'))
  //create a cors middleware
  app.use(function(req, res, next) {
    //set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use('/api', api)
  app.use('*', (req, res) => res.status(404).end())
  const server = app.listen(process.env.PORT || 9428, () => cb && cb(server))
}
