'use strict'

// basado en una clase

class PrivadoController{

    // GET /privado
    index(req, res, next){
        //console.log(req.session)
        //console.log(req.session.authUser)

        // verificar quien pide la pagina
        if(!req.session.authUser){
            res.redirect('/login')
            return
        }
        res.render('privado')
    }
}
module.exports = new PrivadoController()
