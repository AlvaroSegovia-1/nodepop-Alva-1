'use strict'

const mongoose = require('mongoose')
const fs = require('fs')
const configAnuncios = require('../local_config').anuncios;
const path = require('path');


// crear esquema

const productoSchema = mongoose.Schema({
    nombre: {type: String, index: true},
    // nombre: { type: String, index: true} // index: true = indice
    venta: Boolean,
    precio: {type: Number, min: 0 },
    foto: String,
    mensaje: mongoose.Schema.Types.Mixed,  // para datos sin esquema
    tags: ["work", "lifestyle","motor", "mobile" ]

    }, {
        // collection: 'Producto', // Para evitar la pluralización
    autoIndex: process.env.NODE_ENV !== 'produccion' // No crear indices automáticamente
    } )

// método estático
productoSchema.statics.lista = async function(filtro, limit, skip,sort, fields){
    const query = Producto.find(filtro)
    query.limit(limit)
    query.skip(skip)
    query.sort(sort)
    query.select(fields)
    return query.exec()
  
}

// crear el modelo
const Producto = mongoose.model('Producto', productoSchema,'Producto' )

// exportar el modelo

module.exports = Producto