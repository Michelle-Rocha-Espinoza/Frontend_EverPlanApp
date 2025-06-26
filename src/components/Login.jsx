import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);

  try {
    const response = await axios.post('http://localhost:8000/api/auth/login/', {
      username: username, 
      password: password
    });

    const token = response.data.token;
    console.log('Login exitoso. Token:', token);

    // Guardar token para futuras peticiones (ej: en localStorage)
    localStorage.setItem('token', token);
    navigate('/app/Tareas'); // o redirige a donde quieras después del login

  } catch (error) {
    console.error('Error al iniciar sesión:', error.response?.data || error.message);
    alert('Credenciales inválidas o error del servidor');
  }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="logo-wrapper">
            <img src="/logo.png" alt="Logo EverPlanApp" className="logo" /> 
        </div>

        <h1>Inicia sesión</h1>
        <label htmlFor="username">Usuario</label>
        <input
          type="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
          required
        /> 

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Iniciar sesión</button>

        <div className="extras">
            <div className="link-line">
                <a href="#" className="olvido">¿Olvidaste tu contraseña?</a>
            </div>
            <div className="link-line">
                <span>¿No tienes una cuenta? <Link to="/registro" className="registro">Regístrate</Link></span>
            </div>
            
        </div>
        <footer>
          Una aplicación para organizar tu vida diaria
        </footer>
        <div className="volver-wrapper">
            <Link to="/app/landing" className="volver">◀ Volver</Link>
        </div>
        


      </form>
    </div>
  );
}

export default Login;
