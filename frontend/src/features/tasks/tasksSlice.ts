import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { Task, TaskState } from "./taskTypes";

// --------------------
// Initial State
// --------------------
const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// --------------------
// Async Thunks
// --------------------

// Fetch all tasks
export const fetchTasks = createAsyncThunk("tasks/fetchAll", async () => {
  const response = await axiosClient.get<Task[]>("/tasks");
  return response.data;
});

// Add a new task
export const addTask = createAsyncThunk("tasks/add", async (task: Omit<Task, "id">) => {
  const response = await axiosClient.post<Task>("/tasks", task);
  return response.data;
});

// Toggle task completion
export const toggleTask = createAsyncThunk("tasks/toggle", async (task: Task) => {
  const updated = { ...task, isCompleted: !task.isCompleted };
  await axiosClient.put(`/tasks/${task.id}`, updated);
  return updated;
});

// Delete a task
export const deleteTask = createAsyncThunk("tasks/delete", async (id: number) => {
  await axiosClient.delete(`/tasks/${id}`);
  return id;
});

// --------------------
// Slice
// --------------------
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: builder => {
    // FETCH
    builder.addCase(fetchTasks.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch tasks.";
    });

    // ADD
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });

    // TOGGLE
    builder.addCase(toggleTask.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) state.tasks[index] = action.payload;
    });

    // DELETE
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    });
  },
});

export default tasksSlice.reducer;
