//Importamos router desde express
import { Router } from 'express';

//Importamos el middleware de autenticación
import { authRequired } from '../middlewares/validateToken.js';

//Importamos las rutas


//Inicializamos router
const router = Router();

//Creamos una ruta llamada tasks que solo se puede acceder si el usuario está autenticado
router.get('/tasks', authRequired, (req, res) =>{
    
    console.log('Tasks');
    res.send('Tasks');
    
});

//Exportamos router
export default router;