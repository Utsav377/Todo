import { useState } from "react";
export const TodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState({
    id: "",
    content: "",
    checked: false,
  });
  const handleInputChange = (value) => {
    setInputValue({id:value,content:value,checked:false});
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    onAddTodo(inputValue);
    setInputValue({id:"",content:"",checked:false}); //// Clear input after adding new task
  };
  return (
    <section className="form">
      <form onSubmit={handleFormSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="todo-input"
            autoComplete="off"
            value={inputValue.content}
            onChange={(event) => handleInputChange(event.target.value)}
            placeholder="Enter a task..."
          />
          <button type="submit" className="todo-btn">
            Add Task
          </button>
        </div>
      </form>
    </section>
  );
};
