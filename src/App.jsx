import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Registro from './components/Registro';
import Landing from './components/Landing';

import MainLayout from './layout/MainLayout';
import Tareas from './pages/Tareas';

// Páginas restantes como placeholders
const Perfil = () => <div>Perfil</div>;
const Horario = () => <div>Horario Personal</div>;
const Pictogramas = () => <div>Pictogramas</div>;
const Autorregulacion = () => <div>Autorregulación</div>;
const Estadisticas = () => <div>Estadísticas</div>;
const Sugerencias = () => <div>Sugerencias</div>;
const Legal = () => <div>Información Legal</div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas protegidas o internas de la app */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="tareas" />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="tareas" element={<Tareas />} />
          <Route path="horario" element={<Horario />} />
          <Route path="pictogramas" element={<Pictogramas />} />
          <Route path="autorregulacion" element={<Autorregulacion />} />
          <Route path="estadisticas" element={<Estadisticas />} />
          <Route path="sugerencias" element={<Sugerencias />} />
          <Route path="legal" element={<Legal />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

