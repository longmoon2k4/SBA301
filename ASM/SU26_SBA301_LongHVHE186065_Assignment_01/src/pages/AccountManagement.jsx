import { useState } from 'react';
import ActionDialog from '../components/ActionDialog';
import ConfirmDelete from '../components/ConfirmDelete';

// Dữ liệu mẫu khớp với DB schema (SystemAccount)
const initialAccounts = [
  { id: 1, name: 'Emma William', email: 'EmmaWilliam@FUNewsManagement.org', role: 'staff', password: '****' },
  { id: 2, name: 'Olivia James', email: 'OliviaJames@FUNewsManagement.org', role: 'staff', password: '****' },
  { id: 3, name: 'Isabella David', email: 'IsabellaDavid@FUNewsManagement.org', role: 'staff', password: '****' },
  { id: 4, name: 'Michael Charlotte', email: 'MichaelCharlotte@FUNewsManagement.org', role: 'staff', password: '****' },
  { id: 5, name: 'Steve Paris', email: 'SteveParis@FUNewsManagement.org', role: 'admin', password: '****' },
];

export default function AccountManagement() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'staff', password: '' });

  const handleOpenCreate = () => {
    setCurrentItem(null);
    setFormData({ name: '', email: '', role: 'staff', password: '' });
    setDialogOpen(true);
  };

  const handleOpenEdit = (account) => {
    setCurrentItem(account);
    setFormData({ name: account.name, email: account.email, role: account.role, password: '' });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) return alert("Account name cannot be empty!");
    if (!formData.email.trim()) return alert("Email cannot be empty!");
    if (!currentItem && !formData.password.trim()) return alert("Password is required for new accounts!");

    if (currentItem) {
      setAccounts(accounts.map(acc =>
        acc.id === currentItem.id
          ? { ...acc, name: formData.name, email: formData.email, role: formData.role }
          : acc
      ));
    } else {
      setAccounts([...accounts, {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        password: '****'
      }]);
    }
    setDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    setAccounts(accounts.filter(acc => acc.id !== currentItem.id));
    setDeleteOpen(false);
  };

  const filteredAccounts = accounts.filter(acc =>
    acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acc.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h2>Account Management</h2>
        <div className="page-header-actions">
          <input
            type="text"
            className="search-input"
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleOpenCreate} className="btn btn-success btn-sm">+ Add New</button>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th style={{ width: '60px' }}>#</th>
            <th>Account Name</th>
            <th>Email</th>
            <th style={{ width: '120px' }}>Role</th>
            <th style={{ width: '130px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.length > 0 ? filteredAccounts.map((acc, index) => (
            <tr key={acc.id}>
              <td>{index + 1}</td>
              <td><strong>{acc.name}</strong></td>
              <td>{acc.email}</td>
              <td>
                <span className={`badge ${acc.role === 'admin' ? 'badge-admin' : 'badge-staff'}`}>
                  {acc.role === 'admin' ? '🔑 Admin' : '👤 Staff'}
                </span>
              </td>
              <td>
                <div className="actions-cell">
                  <button onClick={() => handleOpenEdit(acc)} className="btn-icon edit" title="Edit">✏️</button>
                  <button onClick={() => { setCurrentItem(acc); setDeleteOpen(true); }} className="btn-icon delete" title="Delete">🗑️</button>
                </div>
              </td>
            </tr>
          )) : (
            <tr className="empty-row"><td colSpan="5">No accounts found</td></tr>
          )}
        </tbody>
      </table>

      <ActionDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        title={currentItem ? "Update Account" : "Create Account"}
      >
        <div className="form-group">
          <label>Account Name</label>
          <input
            type="text"
            placeholder="Enter full name..."
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter email address..."
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        {!currentItem && (
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password..."
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        )}
        <div className="form-group">
          <label>Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
        </div>
      </ActionDialog>

      <ConfirmDelete
        isOpen={isDeleteOpen}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={currentItem?.name}
      />
    </div>
  );
}