import { useState } from 'react';
import ActionDialog from '../components/ActionDialog';
import ConfirmDelete from '../components/ConfirmDelete';

// Dữ liệu mẫu khớp với DB schema (NewsArticle)
const initialNews = [
  {
    id: 1,
    title: 'FU Celebrates Alumni Achievements',
    headline: 'FU Alumni Shine Across Industries',
    content: 'Alumni from FU continue to make significant impacts in business, arts, and science.',
    source: 'Internet',
    categoryId: 4,
    status: true,
    createdBy: 'Emma William',
    createdDate: '2024-05-05'
  },
  {
    id: 2,
    title: 'Mentorship Program Launches for New Graduates',
    headline: 'Alumni Association Mentorship Initiative',
    content: 'The FU Alumni Association launches mentorship for graduates to connect with experienced professionals.',
    source: 'FU Portal',
    categoryId: 4,
    status: true,
    createdBy: 'Olivia James',
    createdDate: '2024-05-06'
  },
  {
    id: 3,
    title: 'AI Department Appoints New Head',
    headline: 'Leading Scholar Joins FU AI Department',
    content: 'Dr. Nitzevet joins as Head of AI, bringing deep learning expertise and leadership.',
    source: 'N/A',
    categoryId: 2,
    status: true,
    createdBy: 'Olivia James',
    createdDate: '2024-05-07'
  },
  {
    id: 4,
    title: 'Groundbreaking Research in STEM',
    headline: 'New Findings in STEM Field',
    content: 'FU researchers uncover key insights in engineering and mathematics.',
    source: 'FU Research Center',
    categoryId: 5,
    status: true,
    createdBy: 'Isabella David',
    createdDate: '2024-05-08'
  },
  {
    id: 5,
    title: 'Campus Safety Week Launched',
    headline: 'Safety Awareness Campaign Begins',
    content: 'The FU campus launches safety awareness week to promote health and emergency readiness.',
    source: 'N/A',
    categoryId: 6,
    status: true,
    createdBy: 'Michael Charlotte',
    createdDate: '2024-05-09'
  },
];

const categoryMap = {
  1: 'University News',
  2: 'Academic News',
  3: 'Student Affairs',
  4: 'Alumni News',
  5: 'Capstone Projects',
  6: 'Campus Safety',
};

export default function NewsManagement() {
  const [news, setNews] = useState(initialNews);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '', headline: '', content: '', source: '', categoryId: 1, status: true
  });

  const handleOpenCreate = () => {
    setCurrentItem(null);
    setFormData({ title: '', headline: '', content: '', source: '', categoryId: 1, status: true });
    setDialogOpen(true);
  };

  const handleOpenEdit = (article) => {
    setCurrentItem(article);
    setFormData({
      title: article.title,
      headline: article.headline,
      content: article.content,
      source: article.source,
      categoryId: article.categoryId,
      status: article.status
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.title.trim()) return alert("News title cannot be empty!");
    if (!formData.headline.trim()) return alert("Headline cannot be empty!");

    if (currentItem) {
      setNews(news.map(item =>
        item.id === currentItem.id ? { ...item, ...formData } : item
      ));
    } else {
      setNews([...news, {
        id: Date.now(),
        ...formData,
        createdBy: 'Admin User',
        createdDate: new Date().toISOString().split('T')[0]
      }]);
    }
    setDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    setNews(news.filter(item => item.id !== currentItem.id));
    setDeleteOpen(false);
  };

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.headline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h2>News Article Management</h2>
        <div className="page-header-actions">
          <input
            type="text"
            className="search-input"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleOpenCreate} className="btn btn-success btn-sm">+ Add New</button>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th style={{ width: '50px' }}>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Source</th>
            <th style={{ width: '100px' }}>Status</th>
            <th style={{ width: '100px' }}>Date</th>
            <th style={{ width: '130px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredNews.length > 0 ? filteredNews.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <strong className="text-truncate" style={{ display: 'block', maxWidth: '250px' }}>{item.title}</strong>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>{item.headline}</span>
              </td>
              <td>{categoryMap[item.categoryId] || 'Unknown'}</td>
              <td>{item.source}</td>
              <td>
                <span className={`badge ${item.status ? 'badge-active' : 'badge-inactive'}`}>
                  {item.status ? '● Active' : '○ Inactive'}
                </span>
              </td>
              <td style={{ fontSize: '13px', color: '#64748b' }}>{item.createdDate}</td>
              <td>
                <div className="actions-cell">
                  <button onClick={() => handleOpenEdit(item)} className="btn-icon edit" title="Edit">✏️</button>
                  <button onClick={() => { setCurrentItem(item); setDeleteOpen(true); }} className="btn-icon delete" title="Delete">🗑️</button>
                </div>
              </td>
            </tr>
          )) : (
            <tr className="empty-row"><td colSpan="7">No articles found</td></tr>
          )}
        </tbody>
      </table>

      <ActionDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        title={currentItem ? "Update News Article" : "Create News Article"}
      >
        <div className="form-group">
          <label>News Title</label>
          <input
            type="text"
            placeholder="Enter news title..."
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Headline</label>
          <input
            type="text"
            placeholder="Enter headline..."
            value={formData.headline}
            onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            placeholder="Enter news content..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>News Source</label>
          <input
            type="text"
            placeholder="Enter source..."
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: Number(e.target.value) })}
          >
            {Object.entries(categoryMap).map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            value={formData.status ? 'true' : 'false'}
            onChange={(e) => setFormData({ ...formData, status: e.target.value === 'true' })}
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
        itemName={currentItem?.title}
      />
    </div>
  );
}