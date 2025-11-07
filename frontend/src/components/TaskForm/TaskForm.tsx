import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { addTask } from "../../features/tasks/tasksSlice";
import styles from "./TaskForm.module.css";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(addTask({ title, isCompleted: false }));
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
      />
      <button type="submit">Add</button>
    </form>
  );
}
