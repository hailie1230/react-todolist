import { useEffect, useState, useRef } from "react";
import axios from "axios";

const SERVER_URL = "https://todolist-vercel-six.vercel.app/";

function App() {
  const [todoList, setTodoList] = useState([]);

  const formRef = useRef(null);
  const inputRef = useRef(null);

  const fetchData = async () => {
    const response = await axios.get(SERVER_URL);
    setTodoList(response.data);
    formRef.current.reset();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const done = e.target.done.checked;

    await axios.post(SERVER_URL, { text, done });
    fetchData();
  };

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <form onSubmit={onSubmitHandler} ref={formRef}>
        <input name="text" ref={inputRef} />
        <input name="done" type="checkbox" />
        <button>추가</button>
      </form>
      {todoList?.map((todo) => (
        <div key={todo.id} style={{ display: "flex", gap: "10px" }}>
          <div>{todo.id}</div>
          <div>{todo.text}</div>
          <div>{todo.done ? "Y" : "N"}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
