var express = require('express')
const multer = require('multer')
var router = express.Router()
const Producto = require('../../models/Producto')
//const cote = require('cote')

//const requester = new cote.Requester({name: 'consumidor'})

 // const upload = multer({dest: 'uploads/'}) // configuración simple

 const storage = multer.diskStorage({
 destination: function(req, file, cb){
    cb(null, 'uploads/')
 },
 filename: function(req, file, cb){
    const myFilename = `producto_${file.fieldname}_${Date.now()}_${file.originalname}`
    cb(null, myFilename)
 }
 })
 const upload = multer({storage: storage})  
 


 /* GET /api/productos */
 router.get('/', async function(req, res, next) {
    try {
        console.log('El usuario tiene el _id:', req.apiAuthUserId)
        
      // http://localhost:3100/api/productos?nombre=silla
      const nombre = req.query.nombre

      // http://localhost:3100/api/productos?precio=30
      const precio = req.query.precio
  
      // http://localhost:3100/api/productos?limit=3
      const limit = parseInt(req.query.limit || 10)

      // http://localhost:3000/api/productos?skip=20&limit=5
      const skip = parseInt(req.query.skip)
  
      // http://localhost:3100/api/productos?sort=precio
      // Ordenar por dos campos
      // http://localhost:3100/api/productos?sort=precio nombre
      const sort = req.query.sort

      // Solo campo precio, (sale id)
      // http://localhost:3100/api/productos?fields=precio
      // Solo campos precio y nombre, sin id
      //http://localhost:3100/api/productos?fields=precio%20nombre%20-_id
      const fields = req.query.fields

      const tags = req.query.tags

      const venta = req.query.venta
  
      const filtro = {}
  
      // if (nombre) { filtro.nombre = nombre }

      if (nombre){
        filtro.nombre = new RegExp('^'+ req.query.nombre, 'i')
      }
      if (venta){
        filtro.venta=venta
      }

      if (precio){
        
        let rango = precio.split('-');
       
        if (rango.length === 1){
            filtro.precio = rango[0];
        }
        else if (rango.length === 2){
            // - precio
            if (rango[0]===''){
                filtro.precio = {'$lte':rango[1]};
            }
            // precio -
            else if (rango[1]===''){
                filtro.precio = {'$gte':rango[0]};
            }
            // limiteInf - limiteSup
            else {
                filtro.precio = {'$gte':rango[0],'$lte':rango[1]};
            }
        } 
      } 
      if (tags){
        filtro.tags = tags
      }
        
    } catch (err) {
       next(err)
    }
  })

  // Filtro precio
  // productos mayor que 90 euros
  // {precio:{'$gte:'90'}} 
  // {precio:{'$lte':'50'}}

 /* GET /api/productos/<_id> */
 router.get('/:_id', async (req, res, next) =>{
    try {
    const _id = req.params._id
    //console.log(_id)
    const productos = await Producto.findOne({_id: _id})
    //res.send('ok')
    //res.json(productos)

    
    res.json({result: productos})
    }catch(err){
    next(err)
    }
 })


 /* POST /api/productos */
 router.post('/', async (req,res,next)=>{
    try{
    const productoData = req.body
    // Creamos el documento en memoria
    const producto = new Producto(productoData)
    // Lo guardamos en la Base de datos
    const productoGuardado = await producto.save()

    res.json({result: productoGuardado})

    }catch(err){
        next(err)
    }
 })



 /*PUT /api/productos/:_id */
 router.put('/:_id', async (req,res,next)=>{
    try{
    const _id = req.params._id
    const productoData=req.body
    // Creamos el documento en memoria
    const productoGuardado = await Producto.findOneAndUpdate({_id:_id}, productoData, {
        new:true,
        useFindAndModify: false // Para evitar warning
    })
   
    res.json({result: productoGuardado})

    }catch(err){
     next(err)
    }
 })

 /*DELETE /api/productos/:_id */
 router.delete('/:_id', async ( req, res, next)=>{
    try{
    const _id = req.params._id
    await Producto.deleteOne({_id: _id})
    res.json()
    }catch(err){
     next(err)
    }
 })

  function filtroPrecio(precio) {
	var re = /^((\s?|\d+)-?(\s?|\d+))$$/;
            
	if (precio && re.test(precio) && precio !== '-') {
		var precios = precio.split('-');
		if (precios.length===1) {
			precio = precios[0];
		} else {
			precio = {};
			if (precios[0]!=='') {
				precio.$gte = precios[0];
			}
			if (precios[1]!=='') {
				precio.$lte = precios[1];
			}
		}
		return precio;
	}
  }

    // Para subir imagenes
    router.post('/uploads', upload.single('foto'), (req, res, next)=>{
    console.log(req.file)
    // Cliente para reducir imagenes    
    /* requester.send({
        type: 'reducir imagen'
    }, resultado=>{
        console.log(`cliente: imagen reducida` , Date.now())
    }) */

    res.send('ok, muy bien')
    })

    // Return the list of available tags
    router.get('/tags', function (req, res) {
        res.json({ ok: true, allowedTags: Producto.allowedTags() })
    })

  module.exports = router