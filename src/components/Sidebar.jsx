import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaUser,FaUsers, FaCalendarAlt, FaClock, FaImages, FaSpa,
  FaChartBar, FaLightbulb, FaBalanceScale, FaBars, FaSignOutAlt
} from 'react-icons/fa';
import './Sidebar.css';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Auto-colapsar si la pantalla es muy estrecha
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // inicial

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
          <FaBars />
        </button>

        {!collapsed && (
          <div className="sidebar-logo">
            <img src="/logo.png" alt="EverPlan App" />
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/app/perfil" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FaUser /> {!collapsed && 'Perfil'}
        </NavLink>
        <NavLink to="/app/tareas" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FaCalendarAlt /> {!collapsed && 'Tareas'}
        </NavLink>
        <NavLink to="/app/horario" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FaClock /> {!collapsed && 'Horario Personal'}
        </NavLink>
        <NavLink to="/app/pictogramas" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FaImages /> {!collapsed && 'Pictogramas'}
        </NavLink>
        <NavLink to="/app/autorregulacion" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FaSpa /> {!collapsed && 'Autorregulación'}
        </NavLink>
        <NavLink to="/app/estadisticas" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FaChartBar /> {!collapsed && 'Estadísticas'}
        </NavLink>
        <NavLink to="/app/sugerencias" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FaLightbulb /> {!collapsed && 'Sugerencias'}
        </NavLink>
        <NavLink to="/app/legal" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FaBalanceScale /> {!collapsed && 'Información Legal'}
        </NavLink>

        <NavLink to="/app/usuarios" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FaUsers /> {!collapsed && 'Usuarios'}
        </NavLink>

        <NavLink to="/app/rutinas" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FaCalendarAlt /> {!collapsed && 'Rutinas'}
        </NavLink>

        <button onClick={handleLogout} className="sidebar-link logout-btn">
          <FaSignOutAlt /> {!collapsed && 'Cerrar sesión'}
        </button>
      </nav>
    </aside>
  );
}

