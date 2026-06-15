import { useState } from 'react';
import ActionDialog from '../components/ActionDialog';
import ConfirmDelete from '../components/ConfirmDelete';

// Dữ liệu mẫu khớp với DB schema (Category)
const initialCategories = [
  { id: 1, name: 'University News', description: 'General announcements and institutional updates', parentId: null, isActive: true },
  { id: 2, name: 'Academic News', description: 'Articles about research, faculty, and academics', parentId: 1, isActive: true },
  { id: 3, name: 'Student Affairs', description: 'Student activities, clubs, and initiatives', parentId: 1, isActive: true },
  { id: 4, name: 'Alumni News', description: 'Updates and achievements from alumni', parentId: 1, isActive: true },
  { id: 5, name: 'Capstone Projects', description: 'Projects, innovations, and research showcases', parentId: 2, isActive: true },
  { id: 6, name: 'Campus Safety', description: 'Safety, security, and emergency updates', parentId: 1, isActive: true },
];

export default function CategoryManagement() {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', parentId: '', isActive: true });

  const handleOpenCreate = () => {
    setCurrentItem(null);
    setFormData({ name: '', description: '', parentId: '', isActive: true });
    setDialogOpen(true);
  };

  const handleOpenEdit = (category) => {
    setCurrentItem(category);
    setFormData({
      name: category.name,
      description: category.description,
      parentId: category.parentId || '',
      isActive: category.isActive
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) return alert("Category name cannot be empty!");

    if (currentItem) {
      setCategories(categories.map(cat =>
        cat.id === currentItem.id
          ? { ...cat, name: formData.name, description: formData.description, parentId: formData.parentId || null, isActive: formData.isActive }
          : cat
      ));
    } else {
      setCategories([...categories, {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        parentId: formData.parentId || null,
        isActive: formData.isActive
      }]);
    }
    setDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    setCategories(categories.filter(cat => cat.id !== currentItem.id));
    setDeleteOpen(false);
  };

  const getParentName = (parentId) => {
    const parent = categories.find(c => c.id === parentId);
    return parent ? parent.name : '—';
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h2>Category Management</h2>
        <div className="page-header-actions">
          <input
            type="text"
            className="search-input"
            placeholder="Search categories..."
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
            <th>Category Name</th>
            <th>Description</th>
            <th>Parent Category</th>
            <th style={{ width: '100px' }}>Status</th>
            <th style={{ width: '130px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.length > 0 ? filteredCategories.map((cat, index) => (
            <tr key={cat.id}>
              <td>{index + 1}</td>
              <td><strong>{cat.name}</strong></td>
              <td><span className="text-truncate" style={{ display: 'block' }}>{cat.description}</span></td>
              <td>{getParentName(cat.parentId)}</td>
              <td>
                <span className={`badge ${cat.isActive ? 'badge-active' : 'badge-inactive'}`}>
                  {cat.isActive ? '● Active' : '○ Inactive'}
                </span>
              </td>
              <td>
                <div className="actions-cell">
                  <button onClick={() => handleOpenEdit(cat)} className="btn-icon edit" title="Edit">✏️</button>
                  <button onClick={() => { setCurrentItem(cat); setDeleteOpen(true); }} className="btn-icon delete" title="Delete">🗑️</button>
                </div>
              </td>
            </tr>
          )) : (
            <tr className="empty-row"><td colSpan="6">No categories found</td></tr>
          )}
        </tbody>
      </table>

      <ActionDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        title={currentItem ? "Update Category" : "Create Category"}
      >
        <div className="form-group">
          <label>Category Name</label>
          <input
            type="text"
            placeholder="Enter category name..."
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Enter description..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Parent Category</label>
          <select
            value={formData.parentId}
            onChange={(e) => setFormData({ ...formData, parentId: e.target.value ? Number(e.target.value) : '' })}
          >
            <option value="">— None (Root) —</option>
            {categories
              .filter(c => !currentItem || c.id !== currentItem.id)
              .map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))
            }
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            value={formData.isActive ? 'true' : 'false'}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
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