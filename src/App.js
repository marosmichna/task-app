import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import { db } from "./firebase";
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from "firebase/firestore";



const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  header: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-blue-400 text-white`,
  count: `text-center p-2`
}

function App() {

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  console.log(input)

  // create todo

  const createTask = async (e) => {
    e.preventDefault(e);
    if(input === "") {
      alert("Please eneter Task")
      return
    }
    await addDoc(collection(db, "tasks"), {
      text: input,
      completed:false,
    })
    setInput("")
  }

  // read todo from firebase

  useEffect(() => {
    const q = query(collection(db, "tasks"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tasksArr = []
      querySnapshot.forEach((doc) => {
        tasksArr.push({...doc.data(), id: doc.id})
      });
      setTasks(tasksArr)
    })
    return () => unsubscribe()
  },[])

  // update todo in firebase

  const toggleComplete = async (task) => {
    await updateDoc(doc(db, "tasks", task.id), {
      completed: !task.completed
    })
  }

  // delete todo

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id))
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.header}>Task App</h3>
        <form onSubmit={createTask} className={style.form}>
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            className={style.input} 
            type="text" 
            placeholder="Add Task" 
          />
          <button className={style.button}><AiOutlinePlus size={30} /></button>
        </form>
        <ul>
          {tasks.map((task, index) => (
            <Todo 
              key={index} 
              task={task} 
              toggleComplete={toggleComplete}
              deleteTask={deleteTask} 
            />
          ))}
        </ul>
        {tasks.length < 1 ? null : <p className={style.count}>{`You have ${tasks.length} tasks`}</p> }
        
      </div>
    </div>
  );
}

export default App;
