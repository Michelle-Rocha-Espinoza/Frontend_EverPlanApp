import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Registro from './components/Registro';
import Landing from './components/Landing';
import ListaUsuarios from './components/ListaUsuarios';
import ListaRutinas from './components/ListaRutinas';

import MainLayout from './layout/MainLayout';
import Tareas from './pages/Tareas';
import Pictogramas from './pages/Pictogramas';


// Páginas internas como placeholders
const Perfil = () => <div>Perfil</div>;
const Horario = () => <div>Horario Personal</div>;
const Autorregulacion = () => <div>Autorregulación</div>;
const Estadisticas = () => <div>Estadísticas</div>;
const Sugerencias = () => <div>Sugerencias</div>;
const Legal = () => <div>Información Legal</div>;


function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Ruta principal pública: Landing */}
        <Route path="/" element={<Landing />} />

        {/* Rutas públicas adicionales */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* ✅ Rutas protegidas: agrupadas bajo /app */}
        <Route path="/app" element={<MainLayout />}>
          <Route index element={<Navigate to="tareas" />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="tareas" element={<Tareas />} />
          <Route path="horario" element={<Horario />} />
          <Route path="pictogramas" element={<Pictogramas />} />
          <Route path="autorregulacion" element={<Autorregulacion />} />
          <Route path="estadisticas" element={<Estadisticas />} />
          <Route path="sugerencias" element={<Sugerencias />} />
          <Route path="legal" element={<Legal />} />
          <Route path="usuarios" element={<ListaUsuarios />} />
          <Route path="rutinas" element={<ListaRutinas />} />
        </Route>

        {/* Ruta no encontrada opcional */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;