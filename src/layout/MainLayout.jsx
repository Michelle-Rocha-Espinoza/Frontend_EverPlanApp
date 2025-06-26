import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import '../layout/MainLayout.css';

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

