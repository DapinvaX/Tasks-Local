//Importamos router desde express
import { Router } from 'express';

//Importamos el middleware de autenticación
import { authRequired } from '../middlewares/validateToken.js';

//Importamos las rutas
import { 
    obtenerTaks, 
    obtenerTaskID, 
    crearTask, 
    modificarTask, 
    eliminarTask } from '../controllers/tasks.controller.js';

//Inicializamos router
const router = Router();



//CRUD de tareas


//Definimos las rutas
//A estas riuas solo se puede acceder si se está autenticado


//Obtener todas las tareas
router.get('/tasks', authRequired, obtenerTaks,(req, res) =>{});

//Obtener una tarea por id
router.get('/tasks/:id', authRequired, obtenerTaskID, (req, res) =>{});

//Crear una tarea
router.post('/tasks', authRequired, crearTask, (req, res) =>{});

//Actualizar/Modificar una tarea
router.put('/tasks/:id', authRequired, modificarTask, (req, res) =>{});

//Eliminar una tarea
router.delete('/tasks/:id', authRequired, eliminarTask, (req, res) =>{});

//Exportamos router
export default router;