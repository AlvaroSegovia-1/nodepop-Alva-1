# NODEPOP API
práctica del curso de backend avanzado, del Bootcamp-web de Keepcoding, año 2020.

  Consiste en desarrollar los siguientes puntos :

1. Autenticación
   Se desarrola el módulo 'jwt' en la página de la API
   Se implementa el login con bcrypt
   Se hace session con 'express-session'

2. Internacionalización
   mediante el módulo 'i18n' se puede cambiar de idioma en la  página principal, en la barra de navegación y en scripts.

3. Subida de imagen con tarea en background
   Se hace un microservicio con 'cote' que reduce una imagen, la coje de la carpeta uploads y la vuelve a dejar reducida y con un nombre diferente.
   micro-resize.js arranca el servicio y cliente-resize.js es el cliente.
   No se ha podido implementar en el website.

El ejercicio se hace sobre la práctica del módulo anterior.

## Instrucciones de instalación
## Versiones
nodejs versión 12.18.1
mongodb 

## Instalación
cd nodepop-Alva-1 - situarse en la carpeta

npm install  -  ejecutar el comando que instala las dependencias 

## Configurar las variables de desarrollo

Copiar  .env.example  a  .env y revisar los settings.

## Como arrancar una instancia local de mongodb para desarrollo

./bin/mongod --dbpath ./data/db --directoryperdb

## en un segundo terminal creación de base de datos e inicialización de pequeña muestra 

npm run init-db

Warning! Este script borra el contenido de la base de datos antes de la carga.

Usa en producción solo en el primer despliegue.

## Arranque

npm start  -- arranque en producción

## Arranque en desarrollo

La aplicación está configurada para arrancar en el puerto 3100. Si se desea utilizar otro puerto se puede configurar en _package.json_

npm run dev  




## Metodos de la API

### Lista de productos
GET /api/productos
[
   {
        "tags": [
            "lifestyle"
        ],
        "_id": "5f5e8c7439c214acc4e9eb15",
        "nombre": "Reloj",
        "venta": true,
        "precio": 80,
        "foto": "reloj.jpeg",
        "mensaje": "Reloj antigüo, todavia funciona",
        "__v": 0
    }
]
### Obtener un producto por su id 
GET /api/agentes/_id
{
    "result": {
        "tags": [
            "lifestyle"
        ],
        "_id": "5f5e8c7439c214acc4e9eb15",
        "nombre": "Reloj",
        "venta": true,
        "precio": 80,
        "foto": "reloj.jpeg",
        "mensaje": "Reloj antigüo, todavia funciona",
        "__v": 0
    }
}

### Crear un producto
POST /api/productos  body: { nombre: 'coche', precio: 15000, venta: true, tags: 'motor, mensaje: 'coche en buen estado'}

{
    "result": {
        "tags": [
            "motor"
        ],
        "_id": "5f5e8f799b0b37acd2b8c7e7",
        "nombre": "coche",
        "venta": true,
        "precio": 15000,
        "mensaje": "coche en buen estado",
        "__v": 0
    }
}

### Actualizar producto
PUT /api/productos/_id  body: { precio: 13500}

{
    "result": {
        "tags": [
            "motor"
        ],
        "_id": "5f5e8f799b0b37acd2b8c7e7",
        "nombre": "coche",
        "venta": true,
        "precio": 13500,
        "mensaje": "coche en buen estado",
        "__v": 0
    }
}

### Borrar producto
DELETE /api/productos/_id 

Returns: HTTPCode 200

### Filtros que se pueden realizar

http://localhost:3100/api/productos?nombre=silla
busca por nombre exacto
http://localhost:3100/api/productos?precio=80
busca por precio exacto
http://localhost:3100/api/productos?limit=2
limita la entrega de productos a 2
http://localhost:3100/api/productos?sort=precio
ordena los productos por precio
http://localhost:3100/api/productos?sort=precio nombre
ordena los productos por precio y nombre
http://localhost:3100/api/productos?fields=precio%20-_id 
solo muestra el campo precio y excluyendo el _id

### Filtros solicitados en la práctica

http://localhost:3100/api/productos?tags=motor
busca por tags
http://localhost:3100/api/productos?nombre=a
busca por nombre que empiezen por 'a'
http://localhost:3100/api/productos?precio=30-100
busca productos entre dos precios
http://localhost:3100/api/productos?precio=100-
busca productos con precio mayor a 100
http://localhost:3100/api/productos?precio=-15000
busca productos con precio menor a 15000
http://localhost:3100/api/productos?precio=13500
busca productos con precio igual a 13500
http://localhost:3100/api/productos?venta=false
busca productos que venta=false


## Author

👤 **Alvaro**

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_