import React, { useState } from 'react';
import './PictogramaChecklist.css';

const pasos = [
  { id: 1, texto: 'Ir al baño', img: '/pictogramas/prepararse_estudiar/01_ir_al_bano.png' },
  { id: 2, texto: 'Lavarse manos o cara', img: '/pictogramas/prepararse_estudiar/02_lavarse_manos.png' },
  { id: 3, texto: 'Ponerse ropa cómoda', img: '/pictogramas/prepararse_estudiar/03_ropa_comoda.png' },
  { id: 4, texto: 'Ordenar el escritorio', img: '/pictogramas/prepararse_estudiar/04_ordenar_escritorio.png' },
  { id: 5, texto: 'Preparar materiales', img: '/pictogramas/prepararse_estudiar/05_materiales.png' },
  { id: 6, texto: 'Silenciar el celular', img: '/pictogramas/prepararse_estudiar/06_silenciar_celular.png' },
  { id: 7, texto: 'Respirar y empezar', img: '/pictogramas/prepararse_estudiar/07_respirar_y_empezar.png' }
];

const PictogramaChecklist = ({ onVolver }) => {
  const [modoExpandido, setModoExpandido] = useState(false);
  const [pasoActual, setPasoActual] = useState(0);
  const [completados, setCompletados] = useState([]);

  const togglePaso = (id) => {
    setCompletados((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="checklist-container">
      <div className="checklist-header">
        <button onClick={onVolver} className="btn-volver">⬅ Volver</button>
        <h2>Prepararse para estudiar</h2>
        <button onClick={() => setModoExpandido(!modoExpandido)} className="btn-modo">
          {modoExpandido ? '🔙 Ver todos' : '🧩 Ver paso a paso'}
        </button>
      </div>

      <div className="contenido-central">
        {modoExpandido ? (
          <div className="paso-expandido">
            <img
              src={pasos[pasoActual].img}
              alt={pasos[pasoActual].texto}
              className="img-grande"
            />
            <h3>{pasos[pasoActual].texto}</h3>
            <label className="check-label">
              <input
                type="checkbox"
                checked={completados.includes(pasos[pasoActual].id)}
                onChange={() => togglePaso(pasos[pasoActual].id)}
              />
              Hecho
            </label>
            <div className="navegacion">
              <button
                onClick={() => setPasoActual((prev) => Math.max(prev - 1, 0))}
                disabled={pasoActual === 0}
              >◀ Anterior</button>
              <button
                onClick={() => setPasoActual((prev) => Math.min(prev + 1, pasos.length - 1))}
                disabled={pasoActual === pasos.length - 1}
              >Siguiente ▶</button>
            </div>
          </div>
        ) : (
          <div className="scroll-wrapper">
            <button className="scroll-btn left" onClick={() => {
              document.querySelector('.pasos-miniatura').scrollBy({ left: -220, behavior: 'smooth' });
            }}>⬅</button>

            <div className="pasos-miniatura">
              {pasos.map((paso) => (
                <div
                  key={paso.id}
                  className={`miniatura ${completados.includes(paso.id) ? 'hecho' : ''}`}
                  onClick={() => {
                    setPasoActual(paso.id - 1);
                    setModoExpandido(true);
                  }}
                >
                  <img src={paso.img} alt={paso.texto} />
                  <p>{paso.texto}</p>
                </div>
              ))}
            </div>

            <button className="scroll-btn right" onClick={() => {
              document.querySelector('.pasos-miniatura').scrollBy({ left: 220, behavior: 'smooth' });
            }}>➡</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PictogramaChecklist;
