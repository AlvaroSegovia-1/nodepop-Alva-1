'use strict'

const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// basado en una clase
class LoginController{

    // GET /login
    index(req, res, next){
        res.locals.error = ''
        res.locals.email = ''
        res.render('login')
    }

    // POST /login
    async post(req,res,next){

    try {
      // recoger valores de entrada
      const email = req.body.email
      const password = req.body.password

      // buscar el usuario en la BD
      const usuario = await Usuario.findOne({ email: email })

      // si no existe el usuario o la password no coincide
      // mostrar un error
      if (!usuario || !(await bcrypt.compare( password, usuario.password))){
        res.locals.error = res.__('Invalid credentials')
        res.locals.email = email
        res.render('login')
        return
      }
      // si el usuario existe y la password es correcta

      // apuntar el _id del usuario en su sessión
      req.session.authUser ={
        _id: usuario._id
        // roles: ...
      }

       // redirigir a zona privada
       res.redirect('/privado')

    } catch (err) {
      next(err)
    }
    console.log(req.session)
  }
      
    // JWT
    // POST /api/loginJWT
    async postJWT(req,res,next){
      try {
        // recoger valores de entrada
        const email = req.body.email
        const password = req.body.password
  
        // buscar el usuario en la BD
        const usuario = await Usuario.findOne({ email: email })
  
        // si no existe el usuario o la password no coincide
        // mostrar un error
        if (!usuario || !(await bcrypt.compare( password, usuario.password))){
         // responder un error de autenticación en JSON
          const error = new Error('invalid credentials')
          error.status = 401
          next(error)
          return
        }
      // Si el usuario existe y la password es correcta
      // Crear un JWT

      jwt.sign({ _id: usuario._id }, 'aluohvqljds828hislhdeddd13', { expiresIn: '2d'}, (err, tokenJWT) => {
        if (err) {          // if (err) return next(err)
         next(err)
        return
        }   
        // responder al cliente del API
        res.json({ tokenJWT: tokenJWT })
        //console.log('token_1') 
      })

      } catch (err) {
        return next(err)
      }
    }

    // GET /logout
    logout(req, res, next){
      req.session.regenerate(err =>{
        if (err) {
          next(err)
          return
        }
        res.redirect('/')
      })
    }

}
 

module.exports = new LoginController()
