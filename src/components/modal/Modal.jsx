import "./modal.css"


function Modal({ modalActive, setModalActive }) {
  if (!modalActive) return null;


  return(
    <div className="overlay">
      <div className="modal-body">
        <div className="message-container">
          <h2>Todo can't be empty</h2>
        </div>
        <button className="modal-button" onClick={() => setModalActive(false)}>OK</button>
      </div>
    </div>
  )
}

export default Modal;