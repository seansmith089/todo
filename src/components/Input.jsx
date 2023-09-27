import { MdOutlineAdd } from "react-icons/md";

function Input({setInput, addTask, input}) {
    return (
      <form action="">
        <div className="input-wrapper">
          <input
            className="task-input"
            type="text"
            placeholder="Enter Task"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button className="add-btn" onClick={(e) => addTask(e)}>
            <MdOutlineAdd className="plus-symbol" />
          </button>
        </div>
      </form>
    );
}

export default Input;