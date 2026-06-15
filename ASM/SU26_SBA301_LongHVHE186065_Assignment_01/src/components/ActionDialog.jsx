export default function ActionDialog({ isOpen, onClose, onSave, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p className="dialog-subtitle">Fill in the details below and click Save.</p>
        <div className="dialog-divider" />

        {/* Khu vực chứa các thẻ input form được truyền từ trang cha vào */}
        <div className="dialog-body">
          {children}
        </div>

        <div className="dialog-actions">
          <button onClick={onClose} className="btn btn-ghost">Cancel</button>
          <button onClick={onSave} className="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
}