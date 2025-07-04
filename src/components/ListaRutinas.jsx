import { useState, useEffect } from 'react';
import axios from 'axios';
import './ListaRutinas.css';

function ListaRutinas() {
  const [rutinas, setRutinas] = useState([]);
  const [modo, setModo] = useState('listar');
  const [form, setForm] = useState({
    titulo: '', fecha_inicio: '', fecha_fin: '', hora_inicio: '', hora_fin: ''
  });
  const [rutinaEditando, setRutinaEditando] = useState(null);
  const token = localStorage.getItem('token');

  const cargarRutinas = () => {
    axios.get('http://localhost:8000/api/rutinas/listar-rutinas/', {
      headers: { Authorization: `Token ${token}` }
    }).then(res => setRutinas(res.data));
  };

  useEffect(() => {
    cargarRutinas();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCrear = () => {
    axios.post('http://localhost:8000/api/rutinas/crear-rutina/', form, {
      headers: { Authorization: `Token ${token}` }
    }).then(() => {
      cargarRutinas();
      setModo('listar');
      setForm({});
    }).catch(error => {
      alert('Error al crear rutina: ' + JSON.stringify(error.response?.data || error.message));
    });
  };

  const handleEditar = (rutina) => {
    const { titulo, fecha_inicio, fecha_fin, hora_inicio, hora_fin } = rutina;
    setForm({ titulo, fecha_inicio, fecha_fin, hora_inicio, hora_fin });
    setRutinaEditando(rutina.id);
    setModo('editar');
  };

  const handleGuardarCambios = () => {
    const { titulo, fecha_inicio, fecha_fin, hora_inicio, hora_fin } = form;

    axios.put(`http://localhost:8000/api/rutinas/update-rutina/${rutinaEditando}/`, {
      titulo, fecha_inicio, fecha_fin, hora_inicio, hora_fin
    }, {
      headers: { Authorization: `Token ${token}` }
    })
    .then(() => {
      cargarRutinas();
      setModo('listar');
      setRutinaEditando(null);
      setForm({});
    })
    .catch(error => {
      console.error('Error al guardar:', error.response?.data || error.message);
      alert('Error al guardar: ' + JSON.stringify(error.response?.data || error.message));
    });
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Eliminar esta rutina?')) {
      axios.delete(`http://localhost:8000/api/rutinas/delete-rutina/${id}/`, {
        headers: { Authorization: `Token ${token}` }
      })
      .then(() => {
        cargarRutinas();
      })
      .catch(error => {
        console.error('Error al eliminar:', error.response?.data || error.message);
        alert('No se pudo eliminar: ' + JSON.stringify(error.response?.data || error.message));
      });
    }
  };

  return (
    <div className="crud-container">
      <h2>Rutinas</h2>

      {(modo === 'crear' || modo === 'editar') && (
        <div className="crud-form">
          <label>Título</label>
          <input name="titulo" placeholder="Título" value={form.titulo || ''} onChange={handleChange} />

          <label>Fecha de inicio</label>
          <input name="fecha_inicio" type="date" value={form.fecha_inicio || ''} onChange={handleChange} />

          <label>Fecha de fin</label>
          <input name="fecha_fin" type="date" value={form.fecha_fin || ''} onChange={handleChange} />

          <label>Hora de inicio</label>
          <input name="hora_inicio" type="time" value={form.hora_inicio || ''} onChange={handleChange} />

          <label>Hora de fin</label>
          <input name="hora_fin" type="time" value={form.hora_fin || ''} onChange={handleChange} />

          <button type="button" onClick={modo === 'crear' ? handleCrear : handleGuardarCambios}>
            {modo === 'crear' ? 'Crear Rutina' : 'Guardar Cambios'}
          </button>
          <button type="button" onClick={() => setModo('listar')}>Cancelar</button>
        </div>
      )}

      {modo === 'listar' && (
        <>
          <button className="crear-btn" onClick={() => { setModo('crear'); setForm({}); }}>
            + Crear Rutina
          </button>

          <div className="crud-list">
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {rutinas.map(r => (
                  <tr key={r.id}>
                    <td>{r.titulo}</td>
                    <td>{r.fecha_inicio} → {r.fecha_fin}</td>
                    <td>{r.hora_inicio} → {r.hora_fin}</td>
                    <td>
                      <button onClick={() => handleEditar(r)}>✏️</button>
                      <button onClick={() => handleEliminar(r.id)}>🗑️</button>
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

export default ListaRutinas;
