import React from 'react';
import './PictogramasInicio.css';

const rutinas = [
  { id: 1, titulo: "Prepararse para estudiar", imagen: "/pictogramas/prepararse_estudiar/portada.png" },
  { id: 2, titulo: "Hacer una tarea", imagen: "/pictogramas/hacer_tarea/portada.png" },
  { id: 3, titulo: "Prepararse para dormir", imagen: "/pictogramas/dormir/portada.png" },
  { id: 4, titulo: "Respiración para calmarse", imagen: "/pictogramas/calmarse/portada.png" },
  { id: 5, titulo: "Ir a clases", imagen: "/pictogramas/ir_clases/portada.png" },
  /*{ id: 6, titulo: "Tomar desayuno", imagen: "/pictogramas/desayuno/portada.png" },
  { id: 7, titulo: "Ir al baño", imagen: "/pictogramas/baño/portada.png" },
  { id: 8, titulo: "Pedir ayuda", imagen: "/pictogramas/pedir_ayuda/portada.png" },
  { id: 9, titulo: "Vestirse", imagen: "/pictogramas/vestirse/portada.png" },
  { id: 10, titulo: "Tomar agua", imagen: "/pictogramas/agua/portada.png" },
  { id: 11, titulo: "Jugar", imagen: "/pictogramas/jugar/portada.png" },
  { id: 12, titulo: "Organizar mochila", imagen: "/pictogramas/mochila/portada.png" },
  { id: 13, titulo: "Leer un libro", imagen: "/pictogramas/leer/portada.png" },
  { id: 14, titulo: "Cepillarse los dientes", imagen: "/pictogramas/dientes/portada.png" },*/
];


const PictogramasInicio = ({ onSeleccionarRutina }) => {
  return (
     <div className="p-6 h-screen overflow-y-auto">
      <div className="pictogramas-inicio">
        <h2 className="pictogramas-titulo">Selecciona una actividad</h2>
        <div className="grid-rutinas">
          {rutinas.map((rutina) => (
            <div
              key={rutina.id}
              className="pictograma-card-container"
              onClick={() => onSeleccionarRutina(rutina)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && onSeleccionarRutina(rutina)}
            >
              <div className="pictograma-card">
                <h3 className="pictograma-titulo">{rutina.titulo}</h3>
                <img src={rutina.imagen} alt={rutina.titulo} className="pictograma-img" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PictogramasInicio;
