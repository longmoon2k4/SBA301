export default function ConfirmDelete({ isOpen, onConfirm, onCancel, itemName }) {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="dialog-box confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon">🗑️</div>
        <h3>Xác nhận xóa</h3>
        <p>
          Bạn có chắc chắn muốn xóa <strong>"{itemName || 'mục này'}"</strong> không?
          <br />Hành động này không thể hoàn tác.
        </p>
        <div className="dialog-actions">
          <button onClick={onCancel} className="btn btn-ghost">Hủy</button>
          <button onClick={onConfirm} className="btn btn-danger">Xóa</button>
        </div>
      </div>
    </div>
  );
}