'use strict'

// servicio de thumbail
const cote = require('cote')
const resize = require ('./resize')

// declarar micro-servicio
const micro = new cote.Responder({name: 'reduciendo'})

// lógica de microservicio
micro.on('reducir imagen', (req, done)=>{
    console.log('servicio:', Date.now())

    // calcular el resultado
    const resultado = resize()

done(resultado)    
} )


