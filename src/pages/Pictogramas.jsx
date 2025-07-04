import React, { useState } from 'react';
import PictogramasInicio from './PictogramasInicio';
import PictogramaChecklist from './PictogramaChecklist';

const Pictogramas = () => {
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState(null);

  const esPrepararseEstudiar = rutinaSeleccionada?.titulo === "Prepararse para estudiar";

  return (
    <>
      {esPrepararseEstudiar ? (
        <PictogramaChecklist onVolver={() => setRutinaSeleccionada(null)} />
      ) : (
        <PictogramasInicio onSeleccionarRutina={setRutinaSeleccionada} />
      )}
    </>
  );
};

export default Pictogramas;
