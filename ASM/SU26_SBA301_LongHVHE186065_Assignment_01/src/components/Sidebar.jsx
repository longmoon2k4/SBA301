import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/category', label: 'Category', icon: '📁' },
    { path: '/admin/news', label: 'News', icon: '📰' },
    { path: '/admin/users', label: 'Users', icon: '👥' },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <img src="/logo.png" alt="FUNews Logo" />
        <div>
          <h3>FUNews</h3>
          <span>Management System</span>
        </div>
      </div>

      <div className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-footer">
        <Link to="/">
          <span className="nav-icon">🚪</span>
          Logout
        </Link>
      </div>
    </nav>
  );
}