import { useState } from 'react';
import axios from 'axios';
import './Registro.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Registro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    genero: '',
    fecha_nacimiento: '',
    telefono: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    console.log('Datos enviados:', formData);
  try {
      const response = await axios.post('http://localhost:8000/api/auth/registro/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        nombre: formData.nombre,
        apellido_paterno: formData.apellido_paterno,
        apellido_materno: formData.apellido_materno,
        genero: formData.genero,
        fecha_nacimiento: formData.fecha_nacimiento,
        telefono: formData.telefono
      });

      console.log('Registro exitoso:', response.data);
      alert('Cuenta registrada correctamente');

    } catch (error) {
      console.error('Error al registrar:', error.response?.data || error.message);
      alert('Error del servidor: ' + JSON.stringify(error.response?.data || error.message));
    }

  };

  return (
    <div className="registro-container">
      <form className="registro-form" onSubmit={handleSubmit}>
        <div className="logo-wrapper">
          <img src="/logo.png" alt="Logo EverPlanApp" className="logo" />
        </div>

        <h1>Crea tu cuenta</h1>

        <div className="form-grid">
          <div className="col-left">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />

            <label htmlFor="apellido_paterno">Apellido Paterno</label>
            <input type="text" id="apellido_paterno" name="apellido_paterno" value={formData.apellido_paterno} onChange={handleChange} required />

            <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
            <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} required />
            
            <label htmlFor="telefono">Teléfono</label>
            <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required />

            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

            
          </div>

          <div className="col-right">
            <label htmlFor="username">Nombre de Usuario</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />

            <label htmlFor="apellido_materno">Apellido Materno</label>
            <input type="text" id="apellido_materno" name="apellido_materno" value={formData.apellido_materno} onChange={handleChange} required />
            
            <label htmlFor="genero">Género</label>
            <select id="genero" name="genero" value={formData.genero} onChange={handleChange} required>
              <option value="">Selecciona una opción</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Otro</option>
            </select>

            <label htmlFor="email">Correo electrónico</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
    
          </div>
        </div>

        <button type="submit">Registrarse</button>
        <div className="volver-wrapper">
            <Link to="/login" className="volverregistro">◀ Volver</Link>
        </div>

        <footer>Organiza tu vida académica con EverPlanApp</footer>
      </form>
    </div>
  );
}

export default Registro;
