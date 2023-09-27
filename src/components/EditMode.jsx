import { MdOutlineCancel } from "react-icons/md";
import { TiTick } from "react-icons/ti";


function EditMode({ setEditText, submitEdit, cancelEdit, item }) {
  return (
    <div className="edit-wrapper">
      <input 
        className="edit-input" 
        onChange={(e) => setEditText(e.target.value)} 
        type="text"
        placeholder="Change todo.." 
        />
      <div className="edit-button-wrapper">
        <button className="tick icon" onClick={() => submitEdit(item.id)}>
          <TiTick />
        </button>
        <button className="cancel icon" onClick={() => cancelEdit()}>
          <MdOutlineCancel />
        </button>
      </div>
    </div>
  );
}

export default EditMode;
