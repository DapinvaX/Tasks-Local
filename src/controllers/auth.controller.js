//Importamos el modelo User
import User from '../models/user.model.js';

//Exportamos las funciones de registro y login

//Función para registrar un usuario
//Recibe un request y un response
//El request contiene los datos del usuario que se envían desde el cliente
//El response es la respuesta que se envía al cliente
//La función es asincrona, por lo que utilizamos async
export const register = async (req, res) => {
   
    //Creamos un bloque try-catch para manejar los errores que puedan surgir a la hora de registrar un usuario
    try{
         //Aquí hacemos la lógica de registro

    //res.send('Registro');
    //console.log(req.body);

    //Extraemos los datos del usuario, email y password del request body
    const {user, email, password} = req.body;

    //Imprimimos los datos en la consola
    console.log(user, email, password);

    //Instanciamos un nuevo usuario con los datos extraidos
    const newUser = new User({user, email, password})

    
    //Guardamos el usuario en la base de datos con el método save
    //Al ser una función asincrona, utilizamos await para esperar a que cuando le llegue la respuesta, se guarde en la base de datos.
    await newUser.save();
    
    //Imprimimos el nuevo usuario en la consola
    console.log(newUser);

    //Enviamos una respuesta al cliente con el mensaje "Usuario registrado"
    res.send('Usuario registrado');

    }catch(error){
        
        //Si hay un error, lo imprimimos en la consola
        console.log("Error al registrar el usuario", error);
    
    }
}

export const login = (req, res) => {
    //Aquí hacemos la lógica de login
    
    //res.send('Login');
    //console.log(req.body);

    const {user, password} = req.body;

}