// src/components/TaskForm/TaskForm.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskForm from "./TaskForm";

// Mock the Redux hook to capture dispatch calls
const mockDispatch = vi.fn();
vi.mock("../../store/hooks", () => ({
  __esModule: true,
  useAppDispatch: () => mockDispatch,
}));

// Mock the slice action creator so we assert on the exact payload
const addTaskMock = vi.fn().mockReturnValue({
  type: "tasks/addTask",
  payload: { title: "Buy garlic", isCompleted: false },
});
vi.mock("../../features/tasks/tasksSlice", () => ({
  __esModule: true,
  addTask: (...args: any[]) => addTaskMock(...args),
}));

describe("TaskForm", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    addTaskMock.mockClear();
  });

  it("submits a new todo and clears the input", async () => {
    const user = userEvent.setup();
    render(<TaskForm />);

    const input = screen.getByPlaceholderText(/new task/i);
    const button = screen.getByRole("button", { name: /add/i });

    await user.type(input, "Buy garlic");
    await user.click(button);

    // action creator called with the right payload
    expect(addTaskMock).toHaveBeenCalledWith({
      title: "Buy garlic",
      isCompleted: false,
    });
    // dispatch called with the action it returned
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "tasks/addTask",
      payload: { title: "Buy garlic", isCompleted: false },
    });
    // input cleared
    expect(input).toHaveValue("");
  });

  it("ignores whitespace-only titles", async () => {
    const user = userEvent.setup();
    render(<TaskForm />);

    const input = screen.getByPlaceholderText(/new task/i);
    const button = screen.getByRole("button", { name: /add/i });

    await user.clear(input);
    await user.type(input, "   ");
    await user.click(button);

    expect(addTaskMock).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
