import express from 'express';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';

// Inicialización de express
const app = express();

// Middleware
app.use(morgan('dev'));

// Convierte los request body a json para que el servidor entienda los datos que se envían desde el cliente
app.use(express.json());

// Rutas
//Establecemos la ruta base para las rutas de autenticación "/api"
app.use("/api",authRoutes);

export default app;