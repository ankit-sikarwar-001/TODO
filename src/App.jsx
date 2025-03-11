import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Navbar from "./components/Navbar";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const checkref = useRef();
  const [showFinished, setShowFinished] = useState(false);
  const addref = useRef();
  const updateref = useRef();
  const editref = useRef();
  // const newTodos = useRef();
  useEffect(() => {
    let storedTodos = localStorage.getItem("todoos");
    console.log("reloaded")
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []); // Run only once when the component mounts

  useEffect(() => {
    if (todos.length > 0) { // Prevent overwriting with empty array
      localStorage.setItem("todoos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleAdd = () => {
    if (todo !== "") {
      setTodos([...todos, { id: uuidv4(), todo: todo, isCheckbox: false }]);
      setTodo("");
    }
  };

  const handleInputAddTodo = (e) => {
    setTodo(e.target.value);
  };

  const handleCheck = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((todo) => todo.id === id);
    let newTodos = [...todos];
    newTodos[index].isCheckbox = !newTodos[index].isCheckbox;
    setTodos(newTodos);
  };

  const handleEdit = (e) => {
    let id = e.target.name;
    let indexx = todos.findIndex((todo) => todo.id === id);
    localStorage.setItem("index", indexx);
    let newTodos = [...todos];
    if (newTodos[indexx].isCheckbox === false) {
      addref.current.style.display = "none";
      updateref.current.style.display = "block";
      setTodo(newTodos[indexx].todo);
    }
  };

  const handleDelete = (e) => {
    let id = e.target.name;
    let newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    console.log(`id : ${id} and newTodos :${newTodos} and newtodos length : ${newTodos.length}`)
    if(newTodos.length == 0){
      localStorage.removeItem("todoos")
    }
  };

  const handleUpdate = () => {
    let indexx = localStorage.getItem("index");
    let newTodos = [...todos];
    newTodos[indexx].todo = todo;
    setTodos(newTodos);
    setTodo("");
    addref.current.style.display = "block";
    updateref.current.style.display = "none";
  };

  const handleFinish = () => {
    setShowFinished(!showFinished);
    setTodos(todos);
  };

  return (
    <>
      <Navbar />
      <div className="bg-violet-200 max-[500px]:max-w-[100vw] max-w-[50vw] p-5 rounded-md my-2 m-auto">
        <p className="text-2xl mb-3 font-bold my-1">Add Todo</p>
        <div className="flex w-[90%] max-[500px]:w-[95%] justify-between mb-5">
          <input className="bg-white w-[85%] p-2 rounded-md" onChange={handleInputAddTodo} value={todo} type="text" />
          <button ref={addref} className="bg-red-500 w-[12%] p-1 text-gray-800 rounded-md hover:bg-red-600 cursor-pointer transition-all duration-200"
            onClick={handleAdd}>Add</button>
          <button ref={updateref} className="bg-red-500 max-[500px]:w-[16%] w-[12%] p-1 text-gray-800 rounded-md hover:bg-red-600 cursor-pointer transition-all duration-200 hidden"
            onClick={handleUpdate}>Update</button>
        </div>
        <div className="w-[20vw] max-[500px]:text-nowrap">
          <input type="checkbox" onChange={handleFinish} checked={showFinished} /> Show Finished
        </div>
        <h1 className="text-2xl text-bold m-4">Your Todo`s</h1>
        <div className="w-[84%] max-[500px]:w-[95vw] grid gap-1.5">
          {todos.map(item => {
            return (showFinished || !item.isCheckbox) && <div key={item.id} className={`flex items-center max-[500px]:pl-1 w-[95%] h-[10vh] bg-gray-100 rounded-md justify-around `}>
              <input name={item.id} ref={checkref} checked={item.isCheckbox} onChange={handleCheck} className="h-[100%] w-[4%] max-[500px]:w-[5vw]" type="checkbox" />
              <p className={`overflow-y-auto w-[60%] ${item.isCheckbox ? "line-through" : ""} flex items-center`}>{item.todo}</p>
              <button name={item.id} onClick={handleEdit} ref={editref} className="bg-green-500 w-[14%] p-1 text-gray-800 rounded-md hover:bg-green-600 cursor-pointer transition-all duration-200">Edit</button>
              <button name={item.id} onClick={handleDelete} className="bg-red-500 box-border max-[500px]:w-[14vw] w-[14%] p-1.5 text-gray-800 rounded-md hover:bg-red-600 cursor-pointer transition-all duration-200">Delete</button>
            </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;
