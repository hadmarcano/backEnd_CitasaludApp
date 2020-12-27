# Health Appointment API

## Health Appointment API Rest Server

## Realizado por: Héctor Adolfo Díaz Marcano

## Tecnologias utilizadas NodeJS, Express y MongoDB:

Este Rest Server se realizó utilizando nodejs, expressjs y MongoDB.

## Acerca de

Backend de aplicación que será usada basicamente para almacenar y manejar información de reserva de citas, no consta de funcionalidades complejas, creación y manejo de usuarios y specialistas, definición de seguridad, autenticación de usuarios y especialistas(administradores) con JWT.

1. Con esta API se pueden registrar usuarios y especialistas, ademas de poder administrar sus perfiles, los usuarios pueden realizar reservas de citas de consultas medicas con los especialistas, actualizar y eliminar las reservas, asi como tambien podrán acceder a todas las reservas realizadas, de igual manera los specialistas podran acceder a todas las citas que hayan reservado con el, este tambien tendra acceso de actualizar y eliminar estas citas.
   Esta API esta diseñada para reservar citas en bloques de 30min,
   ejemplo hourIn : 08:30 / hourOut : 09:00.

2. Schema de datos

```javascript
// User schema ...
{
    id: integer,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    salt: string,
    role: integer,
    birthDate: Date,
    rut: integer,
    ocupation: string,
    civilState: string,
    sexType: string,
    phone: integer,
    address: string,
}

// Specialist schema ...
{
    id: integer,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    salt: string,
    role: integer
    rut: integer,
    speciality: string,
    specialization: string,
    phone: integer,
    address: string,
}

// Appointment schema ...
{
    id: integer,
    specialist: ObjectId,
    User: ObjectId,
    date: string,
    hourIn: string,
    hourOut: string
}

```

## REQUERIMIENTOS

Necesitas tener instalado:

- NodeJS
- MongoDB

## VARIABLES DE ENTORNO

Esta api necesita de las siguientes variables de entorno:

- DATABASE=mongodb://localhost/citasaludbdd
- PORT=5000
- JWT_SECRET=csaludbdd

## INICIALIZACION DE API

Para iniciar la API es necesario ejecutar los siguientes comandos desde la ubicación del directorio que contiene el archivo app.js y el package.json :

- npm install

#### Iniciar Mongodb

- mongod

#### Modo 'start'

- npm run start

#### Modo 'dev

- npm run dev

## DOCUMENTACION API

Esta API esta documentada con swagger y openapi, para acceder a la documentación
luego de iniciar la API acceda a la siguiente dirección desde su navegador:

- http://localhost:5000/api-docs
