'use strict'

// servicio de redimensionado de imagen

const jimp = require ('jimp')
//const cote = require ('cote')

const resize = async function main() {
	// Read the image.
	const image = await jimp.read('../uploads/image-2.jpeg')

	// Resize the image to width 150 and auto height.
	await image.resize(100, jimp.AUTO)

	// Save and overwrite the image
	await image.writeAsync('../uploads/image-4.jpeg')
}

   // main()

  module.exports = resize 

