import React from "react";
import { useDispatch } from "react-redux";
import { Task } from "../../features/tasks/taskTypes";
import { toggleTask, deleteTask } from "../../features/tasks/tasksSlice";
import styles from "./TaskItem.module.css";

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const dispatch = useDispatch<any>();

  const handleToggle = () => dispatch(toggleTask(task));
  const handleDelete = () => dispatch(deleteTask(task.id!));

  return (
    <li className={`${styles.item} ${task.isCompleted ? styles.done : ""}`}>
      <span className={styles.title} onClick={handleToggle}>
        {task.title}
      </span>
      <button
        type="button"
        className={styles.deleteButton}
        onClick={handleDelete}
        title="Delete task"
      >
        ❌
      </button>
    </li>
  );
}
