import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import "./App.Module.css";

function App() {
  return (
    <div className="todoContainer">
      <h1>Task Manager</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
