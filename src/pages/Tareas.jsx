import { useState, useEffect } from 'react';
import './Tareas.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function Tareas() {
  const [fecha, setFecha] = useState(new Date());
  const [tareas, setTareas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [vista, setVista] = useState('dia');
  const [mostrarMenuTarea, setMostrarMenuTarea] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [editandoTarea, setEditandoTarea] = useState(null);
  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: '', descripcion: '', fecha_hora_inicio: '', fecha_hora_fin: '',
    todo_el_dia: false, intervalo: 0, dias_semana: '',
    tiempo_repetido: 0, max_repeticiones: '', completado: false
  });

  const prepararEntero = (valor, porDefecto = null) => {
    return valor === '' || valor === null || isNaN(valor) ? porDefecto : parseInt(valor);
  };

  const cargarTareas = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/tareas/listar-tareas/`, {
        headers: { Authorization: `Token ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setTareas(data);
      }
    } catch (err) {
      console.error('Error de red:', err);
    }
  };

  useEffect(() => { cargarTareas(); }, []);

  const cambiarDia = (dias) => {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(fecha.getDate() + dias);
    setFecha(nuevaFecha);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'todo_el_dia') {
      const soloFecha = (str) => str ? str.split('T')[0] : '';
      setNuevaTarea((prev) => ({
        ...prev,
        todo_el_dia: checked,
        fecha_hora_inicio: checked ? soloFecha(prev.fecha_hora_inicio) : '',
        fecha_hora_fin: checked ? soloFecha(prev.fecha_hora_fin) : '',
      }));
      return;
    }

    if (name === 'fecha_hora_inicio' || name === 'fecha_hora_fin') {
      setNuevaTarea((prev) => ({
        ...prev,
        [name]: value
      }));
      return;
    }

    setNuevaTarea((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGuardar = async () => {
    try {
      if (nuevaTarea.fecha_hora_inicio && nuevaTarea.fecha_hora_fin) {
        const inicio = new Date(`${nuevaTarea.fecha_hora_inicio}T00:00:00`);
        const fin = new Date(`${nuevaTarea.fecha_hora_fin}T00:00:00`);
        if (inicio > fin) {
          alert('La fecha de inicio no puede ser posterior a la fecha de fin.');
          return;
        }
      }

      const token = localStorage.getItem('token');

      let inicioUTC;
      let finUTC = null;

      if (nuevaTarea.todo_el_dia) {
        inicioUTC = new Date(`${nuevaTarea.fecha_hora_inicio}T00:00:00`).toISOString();
        if (nuevaTarea.fecha_hora_fin) {
          finUTC = new Date(`${nuevaTarea.fecha_hora_fin}T00:00:00`).toISOString();
        }
      } else {
        inicioUTC = new Date(nuevaTarea.fecha_hora_inicio).toISOString();
        if (nuevaTarea.fecha_hora_fin) {
          finUTC = new Date(nuevaTarea.fecha_hora_fin).toISOString();
        }
      }

      const body = {
        titulo: nuevaTarea.titulo,
        descripcion: nuevaTarea.descripcion || '',
        fecha_hora_inicio: inicioUTC,
        fecha_hora_fin: finUTC,
        todo_el_dia: nuevaTarea.todo_el_dia,
        intervalo: prepararEntero(nuevaTarea.intervalo, 0),
        dias_semana: nuevaTarea.dias_semana || null,
        tiempo_repetido: prepararEntero(nuevaTarea.tiempo_repetido, 0),
        max_repeticiones: prepararEntero(nuevaTarea.max_repeticiones, null),
        completado: false
      };

      const url = editandoTarea
        ? `${API_URL}/api/tareas/update-tarea/${editandoTarea}/`
        : `${API_URL}/api/tareas/crear-tarea/`;

      const res = await fetch(url, {
        method: editandoTarea ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const error = await res.json();
        alert('Error al guardar tarea:\n' + JSON.stringify(error));
        return;
      }

      await cargarTareas();
      setMostrarFormulario(false);
      setEditandoTarea(null);
      setNuevaTarea({
        titulo: '',
        descripcion: '',
        fecha_hora_inicio: '',
        fecha_hora_fin: '',
        todo_el_dia: false,
        intervalo: 0,
        dias_semana: '',
        tiempo_repetido: 0,
        max_repeticiones: '',
        completado: false
      });
    } catch (err) {
      alert('No se pudo conectar al servidor');
    }
  };

  const toggleCompletado = async (id) => {
    const token = localStorage.getItem('token');
    const tarea = tareas.find(t => t.id === id);
    try {
      const res = await fetch(`${API_URL}/api/tareas/update-tarea/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({ completado: !tarea.completado })
      });
      if (res.ok) cargarTareas();
    } catch {}
  };

  const eliminarTarea = async (id) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('¿Estás seguro de eliminar esta tarea?')) return;
    try {
      const res = await fetch(`${API_URL}/api/tareas/delete-tarea/${id}/`, {
        method: 'DELETE',
        headers: { Authorization: `Token ${token}` }
      });
      if (res.ok) setTareas((prev) => prev.filter((t) => t.id !== id));
    } catch {}
  };

  const formatearLocal = (fechaObj) => {
    const y = fechaObj.getFullYear();
    const m = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
    const d = fechaObj.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
  };
  return (
    <div className="horario-container">
      <div className="horario-header">
        <h2>Mi horario</h2>
        <div className="navegacion">
          <span>{fecha.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <button onClick={() => cambiarDia(-1)}>&lt;</button>
          <button onClick={() => cambiarDia(1)}>&gt;</button>
        </div>
        <div className="vista-botones">
          {['dia', 'semana', 'mes'].map(v => (
            <button
              key={v}
              className={vista === v ? 'activo' : ''}
              onClick={() => setVista(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>

      </div>

      <div className="calendario-dia">
        <div className="tareas-todo-el-dia">
          <details>
            <summary>Tareas todo el día</summary>
            <div className="contenedor-todo-el-dia">
              {tareas.filter(t => {
                if (!t.todo_el_dia) return false;

                const inicio = new Date(t.fecha_hora_inicio);
                const fin = t.fecha_hora_fin ? new Date(t.fecha_hora_fin) : inicio;

                inicio.setHours(0, 0, 0, 0);
                fin.setHours(0, 0, 0, 0);

                const actual = new Date(fecha);
                actual.setHours(0, 0, 0, 0);

                // Verifica si el día actual está dentro del rango
                const dentroDeRango = actual >= inicio && actual <= fin;

                // Repetición por días de la semana
                const dias = t.dias_semana?.split(',').map(Number) || [];
                const diaSemanaActual = fecha.getDay();
                const diaRepetido = dias.includes(diaSemanaActual);

                return dentroDeRango || diaRepetido;

              }).map(tarea => (

                <div key={tarea.id} className={`tarea-box ${tarea.completado ? 'tarea-hecha' : ''}`} onClick={(e) => {
                  e.stopPropagation();
                  setTareaSeleccionada(tarea);
                  setMostrarMenuTarea(true);
                }}>
                  {tarea.titulo}
                </div>
              ))}
            </div>
          </details>
        </div>

        {Array.from({ length: 24 }).map((_, i) => {
          const horaActual = i;
          const tareasEnHora = tareas.filter((t) => {
            if (t.todo_el_dia) return false;
            const inicio = new Date(t.fecha_hora_inicio);
            return (
              inicio.getHours() === horaActual &&
              inicio.getDate() === fecha.getDate() &&
              inicio.getMonth() === fecha.getMonth() &&
              inicio.getFullYear() === fecha.getFullYear()
            );
          });
          const horaLabel = `${horaActual.toString().padStart(2, '0')}:00`;

          return (
            <div key={horaLabel} className="bloque-hora">
              <span className="etiqueta-hora">{horaLabel}</span>
              <div className="bloque-tarea-multiple">
                {tareasEnHora.map(tarea => (
                  <div
                    key={tarea.id}
                    className={`tarea-box ${tarea.completado ? 'tarea-hecha' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setTareaSeleccionada(tarea); setMostrarMenuTarea(true); }}
                  >
                    {tarea.titulo}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="contenedor-agregar">
        <button className="btn-agregar" onClick={() => {
          const ahora = new Date();
          const unaHoraDespues = new Date(ahora.getTime() + 60 * 60 * 1000);
          const formatoInput = (fecha) => {
            const off = fecha.getTimezoneOffset();
            const local = new Date(fecha.getTime() - off * 60 * 1000);
            return local.toISOString().slice(0, 16);
          };


          setNuevaTarea({
            titulo: '',
            descripcion: '',
            fecha_hora_inicio: formatoInput(ahora),
            fecha_hora_fin: formatoInput(unaHoraDespues),
            todo_el_dia: false,
            intervalo: 0,
            dias_semana: '',
            tiempo_repetido: 0,
            max_repeticiones: '',
            completado: false
          });
          setEditandoTarea(null);
          setMostrarFormulario(true);
        }}>+ Agregar tarea</button>
      </div>

      {mostrarFormulario && (
        <div className="modal">
          <div className="modal-contenido">
            <h3>{editandoTarea ? 'Editar tarea' : 'Nueva tarea'}</h3>

            <label>Título:
              <input type="text" name="titulo" value={nuevaTarea.titulo} onChange={handleChange} />
            </label>

            <label>Descripción:
              <textarea name="descripcion" value={nuevaTarea.descripcion} onChange={handleChange} />
            </label>

            <label>Desde:
              <input
                type={nuevaTarea.todo_el_dia ? 'date' : 'datetime-local'}
                name="fecha_hora_inicio"
                value={
                  nuevaTarea.todo_el_dia
                    ? nuevaTarea.fecha_hora_inicio?.split('T')[0] || ''
                    : nuevaTarea.fecha_hora_inicio
                }
                onChange={handleChange}
              />
            </label>

            <label>Hasta:
              <input
                type={nuevaTarea.todo_el_dia ? 'date' : 'datetime-local'}
                name="fecha_hora_fin"
                value={
                  nuevaTarea.todo_el_dia
                    ? nuevaTarea.fecha_hora_fin?.split('T')[0] || ''
                    : nuevaTarea.fecha_hora_fin
                }
                onChange={handleChange}
              />
            </label>




            <label>
              <input type="checkbox" name="todo_el_dia" checked={nuevaTarea.todo_el_dia} onChange={handleChange} /> Todo el día
            </label>

            <div className="botones-formulario">
              <button onClick={handleGuardar}>Guardar</button>
              <button onClick={() => setMostrarFormulario(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {mostrarMenuTarea && tareaSeleccionada && (
        <div className="menu-tarea" onClick={() => setMostrarMenuTarea(false)}>
          <div className="menu-tarea-contenido" onClick={(e) => e.stopPropagation()}>
            <p><strong>{tareaSeleccionada.titulo}</strong></p>
            <button onClick={() => {
              setNuevaTarea({
                ...tareaSeleccionada,
                fecha_hora_inicio: tareaSeleccionada.todo_el_dia
                  ? tareaSeleccionada.fecha_hora_inicio.split('T')[0]
                  : tareaSeleccionada.fecha_hora_inicio,
                fecha_hora_fin: tareaSeleccionada.todo_el_dia && tareaSeleccionada.fecha_hora_fin
                  ? tareaSeleccionada.fecha_hora_fin.split('T')[0]
                  : tareaSeleccionada.fecha_hora_fin
              });
              setEditandoTarea(tareaSeleccionada.id);
              setMostrarFormulario(true);
              setMostrarMenuTarea(false);
            }}>✏️ Editar</button>
            <button onClick={async () => {
              await toggleCompletado(tareaSeleccionada.id);
              setMostrarMenuTarea(false);
            }}>{tareaSeleccionada.completado ? '✅ Desmarcar' : '✔️ Marcar como hecha'}</button>
            <button onClick={() => {
              if (window.confirm('¿Seguro que deseas eliminar esta tarea?')) {
                eliminarTarea(tareaSeleccionada.id);
                setMostrarMenuTarea(false);
              }
            }}>🗑 Eliminar</button>
            <button onClick={() => setMostrarMenuTarea(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
