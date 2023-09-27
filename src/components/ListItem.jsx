import { AiFillDelete } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { BiSolidPencil } from "react-icons/bi";
import {FaUndoAlt} from "react-icons/fa"

export const ListItem = ({ item, setComplete, deleteItem, setTodoEditingID }) => {
   
    return (
      <div className="task-wrapper" key={item.ref}>
        <div
          className={
            item.complete
              ? "todo-item-text complete"
              : "todo-item-text incomplete "
          }
        >
          {item.name}
        </div>
        <div className="button-wrapper">
          <button className="tick icon" onClick={() => setComplete(item.id, item.complete)}>
            {item.complete ? <FaUndoAlt className="undo"/> : <TiTick />}
          </button>
          <button className="bin icon" onClick={() => deleteItem(item.id)}>
            <AiFillDelete />
          </button>
          <button className="pencil icon" onClick={() => setTodoEditingID(item.id)}>
            <BiSolidPencil />
          </button>
        </div>
      </div>
    );
};
