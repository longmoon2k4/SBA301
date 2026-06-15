export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1>FUNewsManagementSystem</h1>
        <p>News Management Admin Panel</p>
      </div>
      <div className="header-right">
        <div className="header-avatar">
          <div className="avatar">A</div>
          <div className="user-info">
            <strong>Admin User</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}