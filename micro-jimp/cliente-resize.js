'use strict'

const cote = require('cote')

// Cliente de reducción de imagen

const requester = new cote.Requester({name: 'consumidor'})

requester.send({
    type: 'reducir imagen'
}, resultado=>{
    console.log(`cliente: imagen reducida` , Date.now())
})


