
import Button from "./button";

function Modal({ message, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{message}</h3>

        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}

export default Modal;
