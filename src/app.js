import express from 'express';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';

import cookieParser from 'cookie-parser';

// Inicialización de express
const app = express();

// Middleware
app.use(morgan('dev'));

// Convierte los request body a json para que el servidor entienda los datos que se envían desde el cliente
app.use(express.json());

// Convierte las cookies a un objeto para que el servidor entienda los datos que se envían desde el cliente
app.use(cookieParser());

// Rutas
//Establecemos la ruta base para las rutas de autenticación "/api"
app.use("/api",authRoutes);

export default app;