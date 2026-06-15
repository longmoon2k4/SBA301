export default function Dashboard() {
  return (
    <div>
      <div className="welcome-card" style={{ marginBottom: '28px' }}>
        <h2>👋 Welcome back, Admin!</h2>
        <p>Manage your FUNewsManagement system — articles, categories, and user accounts all in one place.</p>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-icon">📰</div>
          <div className="stat-value">5</div>
          <div className="stat-label">News Articles</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📁</div>
          <div className="stat-value">6</div>
          <div className="stat-label">Categories</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">5</div>
          <div className="stat-label">User Accounts</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏷️</div>
          <div className="stat-value">9</div>
          <div className="stat-label">Tags</div>
        </div>
      </div>
    </div>
  );
}