import { Router } from 'express';
import {login, logout, profile, register} from '../controllers/auth.controller.js';

//Importamos el middleware authRequired para verificar si el token es válido de la ruta de autenticación
import { authRequired } from '../middlewares/validateToken.js';

//Importamos el middleware validateSchema para validar los datos de entrada de los usuarios tanto en el registro como en el login
import { validateSchema } from '../middlewares/validateMiddleware.js';

//Importamos los esquemas de validación para el registro y el login de usuarios
import { loginSchema, registerSchema } from '../schemas/auth.validate.schema.js';

import { verifyToken } from '../controllers/auth.controller.js';


// Declaramos el router para manejar las rutas de autenticación
const router = Router();



// Definimos las rutas de autenticación con sus respectivos controladores
// Ejecutamos antes validateSchema para validar los datos de entrada de los usuarios tanto en el registro como en el login

//Cuando se ejecute un login, lo valida comparandolo con el loginSchema
router.post('/login', validateSchema(loginSchema), login);

//Cuando se ejecute un registro, lo valida comparandolo con el registerSchema
router.post('/register', validateSchema(registerSchema), register);

router.post('/logout', logout);

//Ruta protegida con token
//Ejecutamos antes authRequired para verificar si el token es válido y si lo es, se ejecutará la función profile
router.get('/profile',authRequired, profile);

router.get('/verify', verifyToken);

// Exportamos el router para poder utilizarlo en otros archivos
export default router;