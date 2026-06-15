import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="page-content">
          <div className="content-card">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}