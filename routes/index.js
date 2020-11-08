var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.locals.title= 'Express' // Igual que abajo
  // res.locals - son las variables locales de la vista
  res.render('index') //  { title: 'Express' });
})

module.exports = router
