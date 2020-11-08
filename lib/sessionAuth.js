'use strict'

// modulo que exporta una función
// que crea un middleware y lo devuelve

module.exports = function(options) {
  return function(req, res, next) {

    // si el usuario no está autenticado le mandamos al login
    if (!req.session.authUser) {
      res.redirect('/login')
      return
    }
    //combrobar roles
    // buscar usuario en base de datos
    // comprobar que tiene al menos los roles de optins.roles

    next()
  }
}