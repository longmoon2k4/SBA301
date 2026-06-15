export default function Settings() {
  return (
    <div>
      <div className="page-header">
        <h2>Settings</h2>
      </div>

      <div className="settings-section">
        <h3>🔧 General</h3>
        <div className="settings-item">
          <div>
            <div className="settings-label">System Name</div>
            <div className="settings-desc">The display name of the system</div>
          </div>
          <span style={{ color: '#1565c0', fontWeight: 600 }}>FUNewsManagementSystem</span>
        </div>
        <div className="settings-item">
          <div>
            <div className="settings-label">Language</div>
            <div className="settings-desc">Default language for the interface</div>
          </div>
          <span style={{ color: '#64748b' }}>English</span>
        </div>
        <div className="settings-item">
          <div>
            <div className="settings-label">Timezone</div>
            <div className="settings-desc">Server timezone setting</div>
          </div>
          <span style={{ color: '#64748b' }}>UTC+7 (Ho Chi Minh)</span>
        </div>
      </div>

      <div className="settings-section">
        <h3>🔒 Security</h3>
        <div className="settings-item">
          <div>
            <div className="settings-label">Password Hashing</div>
            <div className="settings-desc">Algorithm used for password storage</div>
          </div>
          <span className="badge badge-active">BCrypt</span>
        </div>
        <div className="settings-item">
          <div>
            <div className="settings-label">Session Timeout</div>
            <div className="settings-desc">Auto logout after inactivity</div>
          </div>
          <span style={{ color: '#64748b' }}>30 minutes</span>
        </div>
      </div>

      <div className="settings-section">
        <h3>ℹ️ About</h3>
        <div className="settings-item">
          <div>
            <div className="settings-label">Version</div>
            <div className="settings-desc">Current application version</div>
          </div>
          <span style={{ color: '#64748b' }}>1.0.0</span>
        </div>
        <div className="settings-item">
          <div>
            <div className="settings-label">Developer</div>
            <div className="settings-desc">Assignment — SBA301</div>
          </div>
          <span style={{ color: '#64748b' }}>LongHVHE186065</span>
        </div>
      </div>
    </div>
  );
}