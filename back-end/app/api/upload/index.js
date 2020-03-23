//require express library
var express = require('express')
var router = express.Router()
//require multer for the file uploads
var multer = require('multer')
// set the directory for the uploads to the uploaded to
var DIR = './uploads/'
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({dest: DIR}).single('img')
/* GET home page. */

router.get('/', function(req, res) {
// render the index page, and pass data to it.
  res.render('index', { title: 'Express' })
})

//our file upload function.
router.post('/', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      res.status(422).end()
    }
    // No error occured.
    res.status(201).end()
  })
})

module.exports = router
