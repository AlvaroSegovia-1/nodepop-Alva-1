'use strict'

//  require('dotenv').config()

const readline = require ('readline')
const conn = require ('./lib/connectMongoose')
const Producto = require('./models/Producto')
const i18n = require('./lib/i18nConfig')
const Usuario = require('./models/Usuario')

conn.once('open', async ()=> {
    try {
        const respuesta = await askUser(i18n.__('Do you want to initialize the database? (no,si)'))

        if (respuesta.toLowerCase() !== 'si'){
            console.log('Proceso abortado')
            return process.exit(0)
        }
        await initProductos()
        await initUsuarios()
        // ...

        //cerrar la conexión
        conn.close()    
    }catch (err){
    console.log('Hubo un error:', err)
    process.exit(1)
}

})

async function initProductos(){
 // borrar documentos existentes de la colección
 console.log('Vaciando colección de productos ...')
 await Producto.deleteMany()

 // cargar los documentos iniciales
 console.log('Cargando productos ...')
 const result = await Producto.insertMany([
     {nombre: 'Reloj', venta: true, precio: 80, foto: "reloj.jpeg", mensaje:'Reloj antigüo, todavia funciona', tags: "lifestyle" },
     {nombre: 'Bicicleta', venta: true, precio: 300, foto: "bicicleta.jpeg", tags: "lifestyle" },
     {nombre: 'coche', venta: false, precio: 43800, foto: "coche.jpeg", tags: 'motor'},
     {nombre: 'avion', venta: false, precio: 125000, foto: 'avion.jpeg', mensaje: " En buen estado", tags: 'motor'},
     {nombre: 'silla', venta: true, precio: 30, foto: 'silla.jpeg', mensaje: ' Del siglo XVIII', tags: 'work'}
 ])
 console.log(`Se han creado ${result.length} productos.`)
//console.log(result)
}

async function initUsuarios(){
    // borrar documentos existentes de la colección
    console.log('Vaciando colección de usuarios ...')
    await Usuario.deleteMany()
   
    // cargar los documentos iniciales
    console.log('Cargando usuarios ...')
    const result = await Usuario.insertMany([
        {email: 'user@example.com', password: await Usuario.hashPassword('1234') },
        {email: 'user@nodepop.com', password: await Usuario.hashPassword('2233') }
        
    ])
    console.log(`Se han creado ${result.length} usuarios.`)
   //console.log(result)
   }

// readline funciona con callbacks
function askUser(pregunta){
    return new Promise ((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        rl.question(pregunta, answer =>{
            rl.close()
            resolve(answer)
        })
    })
}
