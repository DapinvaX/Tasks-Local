import { Router } from 'express';
import {login, logout, profile, register} from '../controllers/auth.controller.js';

//Importamos el middleware authRequired para verificar si el token es válido de la ruta de autenticación
import { authRequired } from '../middlewares/validateToken.js';

// Declaramos el router para manejar las rutas de autenticación
const router = Router();



// Definimos las rutas de autenticación con sus respectivos controladores
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

//Ruta protegida con token
//Ejecutamos antes authRequired para verificar si el token es válido y si lo es, se ejecutará la función profile
router.get('/profile',authRequired, profile);

// Exportamos el router para poder utilizarlo en otros archivos
export default router;