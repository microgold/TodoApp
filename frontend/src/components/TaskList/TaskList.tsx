import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  fetchTasks,
  toggleTask,
  deleteTask,
} from "../../features/tasks/tasksSlice";
import styles from "./TaskList.module.css";
import TaskItem from "../TaskItem/TaskItem";

export default function TaskList() {
  const { tasks, loading } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("Fetching tasks...");
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <ul className={styles.list}>
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} />
      ))}
    </ul>
  );
}
