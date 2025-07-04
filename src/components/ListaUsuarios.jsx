import { useState, useEffect } from 'react';
import axios from 'axios';
import './ListaUsuarios.css';

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [modo, setModo] = useState('listar');
  const [form, setForm] = useState({
    username: '', email: '', nombre: '', apellido_paterno: '', apellido_materno: ''
  });
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const token = localStorage.getItem('token');

  const cargarUsuarios = () => {
    axios.get('http://localhost:8000/api/usuarios/listar/', {
      headers: { Authorization: `Token ${token}` }
    }).then(res => setUsuarios(res.data.usuarios));
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCrear = () => {
    axios.post('http://localhost:8000/api/usuarios/crear/', form, {
      headers: { Authorization: `Token ${token}` }
    }).then(() => {
      cargarUsuarios();
      setModo('listar');
      setForm({});
    }).catch(error => {
      alert('Error al crear usuario: ' + JSON.stringify(error.response?.data || error.message));
    });
  };

  const handleEditar = (usuario) => {
    const { username, email, nombre, apellido_paterno, apellido_materno } = usuario;
    setForm({ username, email, nombre, apellido_paterno, apellido_materno });
    setUsuarioEditando(usuario.id);
    setModo('editar');
  };

  const handleGuardarCambios = () => {
    const { username, email, nombre, apellido_paterno, apellido_materno } = form;

    axios.patch(`http://localhost:8000/api/usuarios/editar/${usuarioEditando}/`, {
    username,
    email,
    nombre,
    apellido_paterno,
    apellido_materno
    }, {
    headers: { Authorization: `Token ${token}` }
    })

    .then(() => {
      cargarUsuarios();
      setModo('listar');
      setUsuarioEditando(null);
      setForm({});
    })
    .catch(error => {
      console.error('Error al guardar cambios:', error.response?.data || error.message);
      alert('Error al guardar: ' + JSON.stringify(error.response?.data || error.message));
    });
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Eliminar este usuario?')) {
      axios.delete(`http://localhost:8000/api/usuarios/eliminar/${id}/`, {
        headers: { Authorization: `Token ${token}` }
      })
      .then(() => {
        cargarUsuarios();
      })
      .catch(error => {
        console.error('Error al eliminar:', error.response?.data || error.message);
        alert('No se pudo eliminar: ' + JSON.stringify(error.response?.data || error.message));
      });
    }
  };

  return (
    <div className="crud-container">
      <h2>Usuarios</h2>

      {(modo === 'crear' || modo === 'editar') && (
        <div className="crud-form">
          <label>Nombre de usuario</label>
          <input name="username" placeholder="Username" value={form.username || ''} onChange={handleChange} />

          <label>Correo</label>
          <input name="email" placeholder="Correo" value={form.email || ''} onChange={handleChange} />

          <label>Nombre</label>
          <input name="nombre" placeholder="Nombre" value={form.nombre || ''} onChange={handleChange} />

          <label>Apellido Paterno</label>
          <input name="apellido_paterno" placeholder="Apellido Paterno" value={form.apellido_paterno || ''} onChange={handleChange} />

          <label>Apellido Materno</label>
          <input name="apellido_materno" placeholder="Apellido Materno" value={form.apellido_materno || ''} onChange={handleChange} />

          <button type="button" onClick={modo === 'crear' ? handleCrear : handleGuardarCambios}>
            {modo === 'crear' ? 'Crear Usuario' : 'Guardar Cambios'}
          </button>
          <button type="button" onClick={() => setModo('listar')}>Cancelar</button>
        </div>
      )}

      {modo === 'listar' && (
        <>
          <button className="crear-btn" onClick={() => { setModo('crear'); setForm({}); }}>
            + Crear Usuario
          </button>

          <div className="crud-list">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Username</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(u => (
                  <tr key={u.id}>
                    <td>{u.nombre} {u.apellido_paterno}</td>
                    <td>{u.email}</td>
                    <td>{u.username}</td>
                    <td>
                      <button onClick={() => handleEditar(u)}>✏️</button>
                      <button onClick={() => handleEliminar(u.id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default ListaUsuarios;
