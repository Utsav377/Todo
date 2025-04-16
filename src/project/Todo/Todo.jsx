import { useEffect, useState } from "react";
import "./Todo.css";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoDateTime } from "./TodoDateTime";
import {
  getLocalStorageTodoData,
  setLocalStorageTodoData,
} from "./TodoLocalStorage";

export const Todo = () => {
  const [task, setTask] = useState(() => getLocalStorageTodoData());

  const handleFormSubmit = (inputValue) => {
    const { id, content, checked } = inputValue;
  
    // Remove leading/trailing whitespace and quotes
    const normalizedInput = content.trim().replace(/^"+|"+$/g, "");
  
    // Prevent empty input
    if (!normalizedInput) return;
  
    // Check for duplicate (case-insensitive)
    const isDuplicate = task.find(
      (currTask) =>
        currTask.content.trim().toLowerCase() === normalizedInput.toLowerCase()
    );
  
    if (isDuplicate) return;
  
    // Add new task
    setTask((prevTask) => [
      ...prevTask,
      { id, content: normalizedInput, checked },
    ]);
  };
  

  //Todo add data to local storage
  setLocalStorageTodoData(task);

  //Todo delete data function
  const handleDeleteTodo = (value) => {
    //  console.log(task);
    //   console.log(value);
    const updatedTask = task.filter((currTask) => currTask.content !== value);
    setTask(updatedTask);
  };

  //todo checked functionality
  const handleCheckedTodo = (content) => {
    const updatedTask = task.map((currTask) => {
      if (currTask.content == content) {
        return { ...currTask, checked: !currTask.checked };
      } else {
        return currTask;
      }
    });
    setTask(updatedTask);
  };

  //Todo Clear Data
  const handleClearTodoData = () => {
    setTask([]);
  };

  return (
    <section className="todo-container">
      <header>
        <h1>Todo List</h1>
        <TodoDateTime />
      </header>
      <TodoForm onAddTodo={handleFormSubmit} />
      <section className="myUnOrdList">
        <ul>
          {task.map((currTask) => {
            return (
              <TodoList
                key={currTask.id}
                data={currTask.content}
                checked={currTask.checked}
                onHandleDeleteTodo={handleDeleteTodo}
                onHandleCheckedTodo={handleCheckedTodo}
              />
            );
          })}
        </ul>
      </section>
      <section>
        <button className="clear-btn" onClick={handleClearTodoData}>
          Clear All
        </button>
      </section>
    </section>
  );
};
