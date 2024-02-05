import "./App.css";
import { useMemo, useState } from "react";

function App() {
  const [data, setData] = useState("");
  const [todo, setTodo] = useState([]);
  const [edit, setEdit] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("abc");
  const [selectedUser, setSelectedUser] = useState("");

  const [value, setValue] = useState({
    title: "",
    status: "",
  });

  function handleClick(e) {
    e.preventDefault();

    if (edit !== null) {
      setTodo((prevTodos) =>
        prevTodos.map((prevTodo) =>
          prevTodo.id === edit.id ? { ...prevTodo, title: data } : prevTodo
        )
      );

      setEdit(null);
    } else {
      if (data.trim() === "") {
        alert("Please enter a task before adding.");
        return;
      }

      let updatedTodo;
      if (edit !== null) {
        updatedTodo = setTodo((prevTodos) =>
          prevTodos.map((prevTodo) =>
            prevTodo.id === edit.id ? { ...prevTodo, title: data } : prevTodo
          )
        );

        setTodo(updatedTodo);
        setEdit(null);
      } else {
        const newTask = {
          id: Math.random(),
          title: data,
          status: selectedUser,
          completed: false,
        };

        updatedTodo = [...todo, newTask];
        setTodo(updatedTodo, value);
        setValue((prev) => ({ ...prev, title: "", status: "" }));

        // setTodo((prevTodos) => [
        //   ...prevTodos,
        //   // { id: Math.random(), title: data, completed: false },
        //   value
        // ]);
        // setValue((prev)=>{
        //   return{...prev,  }
        // })
      }
    }

    setData("");
  }

  const handleUserChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedUser(selectedValue);
  };

  function handleChange(id, completed) {
    setTodo((e) => {
      return e.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(e) {
    const deleteData = todo.filter((a) => a.id !== e);

    setTodo(deleteData);
  }

  const handleEdit = (id) => {
    const findTodo = todo.find((todo) => todo.id === id);
    setEdit(findTodo);
    setData(findTodo.title);
  };

  const filterTask = useMemo(() => {
    if (searchText !== "") {
      return todo.filter((a) =>
        a.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return todo;
  }, [todo, searchText]);

  const sortedTasks = useMemo(() => {
    return filterTask.slice().sort((a, b) => {
      const compareValue = a.title.localeCompare(b.title);
      return sortOrder === "abc" ? compareValue : -compareValue;
    });
  }, [filterTask, sortOrder]);

  const handleSortClick = () => {
    setSortOrder((prevOrder) => (prevOrder === "abc" ? "desc" : "abc"));
  };

  return (
    <>
      <div className="app">
        <div className="h1todo">
          <h1>Todo list app </h1>
          <form className="formtodo">
            <input
              type="text"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="inputAdd"
              placeholder="Enter a new task"
            />
            <select
              onChange={handleUserChange}
              value={selectedUser}
              className="sortButton"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>

            <button className="addButton" onClick={handleClick}>
              Add
            </button>
          </form>
          <div className="container">
            <input
              type="text"
              className="inputAdd"
              placeholder="Search Todo Value"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button onClick={handleSortClick} className="sortButton">
              {sortOrder === "abc" ? "Sort A-Z" : "Sort Z-A"}
            </button>
          </div>

          <ul className="ulFirst">
            {sortedTasks.map((todo) => {
              return (
                <li className="liFirst">
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={(e) => handleChange(todo.id, e.target.checked)}
                    checked={todo.completed}
                  />

                  <span className="todoText">{todo.title}</span>
                  <span className="todoText">{todo.status}</span>

                  <button onClick={() => handleEdit(todo.id)}>Edit</button>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
