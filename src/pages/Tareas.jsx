import { useState } from 'react';
import './Tareas.css';

export default function Tareas() {
  const [fecha, setFecha] = useState(new Date());

  const cambiarDia = (dias) => {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(fecha.getDate() + dias);
    setFecha(nuevaFecha);
  };

  const formatearFecha = (fecha) => {
    return fecha.toLocaleDateString('es-CL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="horario-container">
      <div className="horario-header">
        <h2>Mi horario</h2>
        <div className="navegacion">
          <span>{formatearFecha(fecha)}</span>
          <button onClick={() => cambiarDia(-1)}>&lt;</button>
          <button onClick={() => cambiarDia(1)}>&gt;</button>
        </div>
        <div className="vista-botones">
          <button className="activo">Día</button>
          <button>Semana</button>
          <button>Mes</button>
        </div>
      </div>

      <div className="calendario-dia">
        {Array.from({ length: 24 }).map((_, i) => {
          const hora = `${i.toString().padStart(2, '0')}:00`;
          return (
            <div key={hora} className="bloque-hora">
              <span className="etiqueta-hora">{hora}</span>
              <div className="bloque-tarea">
                {/* Aquí irán tareas si existen para esa hora */}
              </div>
            </div>
          );
        })}
      </div>


      <div className="contenedor-agregar">
        <button className="btn-agregar">+ Agregar tarea</button>
      </div>
    </div>
  );
}

