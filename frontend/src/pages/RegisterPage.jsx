import { useState, useEffect, useRef } from 'react';
import { registerReq } from '../api/auth';
import { checkUserExists } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';
import { hashPassword } from '../services/hashService';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { TextInput, PasswordInput } from '../components/UI/TextInput';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [useHashedPassword, setUseHashedPassword] = useState(true); // Nuevo estado para hasheo
  const [userExists, setUserExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const debounceUser = useRef();
  const debounceEmail = useRef();
  const { setUser, setIsAuthenticated } = useAuth(); // Obtenemos todo el objeto de contexto para mayor seguridad
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    try {
      // Hashear la contraseña solo si la opción está activada
      let passwordToSend = password;
      if (useHashedPassword) {
        passwordToSend = await hashPassword(password);
      }
      
      // Crear objeto de usuario con los campos correctos que espera el backend
      const userData = {
        user: name,        // Cambiado de username a user para que coincida con el backend
        email: email,
        password: passwordToSend
      };
      
      console.log('Datos que se envían al backend:', { 
        ...userData, 
        password: useHashedPassword ? '********' : '(sin hashear, solo para pruebas)' 
      });
      
      // Enviar los datos al backend
      const response = await registerReq(userData);
      
      console.log('Respuesta del backend:', response);

      toast.success(`Usuario registrado con éxito!\nBienvenido a su página de tareas ${name}!`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });

        setError(null); // Limpiar error si lo había
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        
        // Actualizar el contexto de autenticación
        if (typeof setUser === 'function') {
          setUser(response);
          if (typeof setIsAuthenticated === 'function') {
            setIsAuthenticated(true);
          }
        } else {
          console.error("setUser no es una función o no está disponible");
        }
        
        setTimeout(() => {

          //Redireccionar al login después de 1.7 segundos
          //console.log("Redirigiendo al login...");
          //navigate('/login');
        
          // Redireccionar a la página de tareas después de 1.7 segundos
          console.log('Redirigiendo a la página de tareas...');
          navigate('/tasks');
        
        });
        return;

      
    } catch (error) {
      console.error("Error completo:", error);
      
      // Manejo de errores
      const res = error.response;
      
      if(res && res.status === 505) {
        toast.error("El usuario ya existe", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        
        setError(null); // Limpiar error si lo había
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword(''); 
        
      } else {
        toast.error("Error al registrar! Inténtelo de nuevo.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }

    }

  };

  // Comprobación en tiempo real de usuario existente
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setError(null);
    clearTimeout(debounceUser.current);
    debounceUser.current = setTimeout(async () => {
      if (value) {
        const exists = await checkUserExists({ user: value });
        setUserExists(exists);
        if (exists) {
          setError('El usuario ya existe');
        } else if (emailExists) {
          setError('El correo ya está registrado');
        } else if (password && confirmPassword && password !== confirmPassword) {
          setError('Las contraseñas no coinciden');
        } else {
          setError(null);
        }
      } else {
        setUserExists(false);
        if (emailExists) {
          setError('El correo ya está registrado');
        } else if (password && confirmPassword && password !== confirmPassword) {
          setError('Las contraseñas no coinciden');
        } else {
          setError(null);
        }
      }
    }, 400);
  };

  // Comprobación en tiempo real de email existente
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError(null);
    clearTimeout(debounceEmail.current);
    debounceEmail.current = setTimeout(async () => {
      if (value) {
        const exists = await checkUserExists({ email: value });
        setEmailExists(exists);
        if (exists) {
          setError('El correo ya está registrado');
        } else if (userExists) {
          setError('El usuario ya existe');
        } else if (password && confirmPassword && password !== confirmPassword) {
          setError('Las contraseñas no coinciden');
        } else {
          setError(null);
        }
      } else {
        setEmailExists(false);
        if (userExists) {
          setError('El usuario ya existe');
        } else if (password && confirmPassword && password !== confirmPassword) {
          setError('Las contraseñas no coinciden');
        } else {
          setError(null);
        }
      }
    }, 400);
  };

  return (
    <div className="flex items-center justify-center pt-16 md:pt-20 lg:pt-24 px-4 min-h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 my-8">
        
        <div className="flex justify-center mb-6">
          <UserPlus className="h-12 w-12 text-blue-500 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Registro
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contenedor que cambia a layout de columnas en pantallas bajas */}
          <div className="@container">
            {/* Primera fila: Usuario y Correo electrónico */}
            <div className="@[670px]:grid @[670px]:grid-cols-2 @[670px]:gap-4">
              <div>
                <TextInput
                  id="username"
                  label="Usuario"
                  placeholder="Introduce tu nombre de usuario"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div className="mt-6 @[670px]:mt-0">
                <TextInput
                  id="email"
                  label="Correo electrónico"
                  placeholder="Introduce tu correo"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
            </div>
            
            {/* Segunda fila: Contraseña y Confirmación */}
            <div className="@[670px]:grid @[670px]:grid-cols-2 @[670px]:gap-4 mt-6">
              <div>
                <PasswordInput
                  id="password"
                  label="Contraseña"
                  placeholder="Introduce tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  required
                />
              </div>
              <div className="mt-6 @[670px]:mt-0">
                <PasswordInput
                  id="confirmPassword"
                  label="Confirmar Contraseña"
                  placeholder="Confirma tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => {
                    const value = e.target.value;
                    setConfirmPassword(value);
                    if (password && value !== password) {
                      setError('Las contraseñas no coinciden');
                    } else if (userExists) {
                      setError('El usuario ya existe');
                    } else if (emailExists) {
                      setError('El correo ya está registrado');
                    } else {
                      setError(null);
                    }
                  }}
                  showPassword={showConfirmPassword}
                  setShowPassword={setShowConfirmPassword}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              style={{ width: 'auto', minWidth: 'unset' }}
            >
              Registrarse
            </button>
          </div>
          
          {/* Opción para probar sin hasheo (movida debajo del botón) */}
         {/*  <div className="flex items-center justify-center mt-4">
            <input
              id="hashPassword"
              type="checkbox"
              checked={useHashedPassword}
              onChange={() => setUseHashedPassword(!useHashedPassword)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="hashPassword" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Usar contraseña hasheada (desmarcar solo para pruebas)
            </label>
          </div> */}
        </form>
      </div>
    </div>
  );
}