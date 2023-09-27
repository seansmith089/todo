import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./App.css";

import Modal from "./components/modal/Modal";
import Input from "./components/Input";
import EditMode from "./components/EditMode";
import { ListItem } from "./components/ListItem";

function App() {
  const [modalActive, setModalActive] = useState(false);

  const todoCollectionRef = collection(db, "todo");

  // full list of to-do's
  const [todo, setToDo] = useState([]);

  // todo input
  const [input, setInput] = useState("");

  // edit
  const [todoEditingID, setTodoEditingID] = useState(null);
  const [editText, setEditText] = useState("");

  // ADD BUTTON HANDLER
  const addTask = async (e) => {
    e.preventDefault();
    setInput("");

    if (input.length === 0) {
      setModalActive(true);
    } else {
      await addDoc(todoCollectionRef, {
        complete: false,
        name: input,
        ref: Date.now(),
      });
      getToDos();
    }
  };

  // DELETE BUTTON HANDLER
  const deleteItem = async (id) => {
    const todoDoc = doc(db, "todo", id);
    await deleteDoc(todoDoc);
    getToDos();
  };

  // SET COMPLETE HANDLER
  const setComplete = async (id, complete) => {
    const todoDoc = doc(db, "todo", id);
    const completeStatus = { complete: !complete };
    await updateDoc(todoDoc, completeStatus);
    getToDos();
  };

  // FINISH EDIT
  const submitEdit = async (id) => {
    setTodoEditingID(null);

    if (editText.length === 0) {
      setModalActive(true);
    } else {
      const todoDoc = doc(db, "todo", id);
      const editUpdate = { name: editText };
      await updateDoc(todoDoc, editUpdate);

      getToDos();
      setEditText("");
    }
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setTodoEditingID(null);
    setEditText("");
  };

  // finds any pre-saved to-do's and displays on page
  const getToDos = async () => {
    try {
      const data = await getDocs(todoCollectionRef);
      setToDo(data.docs.map((task) => ({ ...task.data(), id: task.id })));
      console.log("Fetching ToDo's");
    } catch {
      setToDo([]);
    }
  };

  useEffect(() => {
    getToDos();
  }, []);

  return (
    <>
      {createPortal(
        <Modal modalActive={modalActive} setModalActive={setModalActive} />,
        document.getElementById("portal")
      )}

      <div className="App">
        <div className="banner">
          <h1>Todo List</h1>
          <Input setInput={setInput} addTask={addTask} input={input} />
        </div>

        {todo.map((item) => {
          return (
            <div className="todo-list-wrapper" key={item.id}>
              {todoEditingID === item.id ? (
                <EditMode
                  setEditText={setEditText}
                  submitEdit={submitEdit}
                  cancelEdit={cancelEdit}
                  item={item}
                />
              ) : (
                <ListItem
                  item={item}
                  setComplete={setComplete}
                  deleteItem={deleteItem}
                  setTodoEditingID={setTodoEditingID}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
