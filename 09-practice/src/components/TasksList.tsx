import { FormEvent, useRef } from "react";

import { TaskType } from "../App.tsx";
import Button from "./Button.tsx";
import Task from "./Task.tsx";

type TaskListProps = {
  tasks: TaskType[];
  onTogglePending: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  onAdd: (name: string) => void;
};

export default function TasksList({
  tasks,
  onAdd,
  onDelete,
  onTogglePending,
}: TaskListProps) {
  const taskName = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAdd(taskName.current!.value);
    taskName.current!.value = "";
  }

  return (
    <>
      <form
        className="flex my-4 justify-between w-full"
        onSubmit={handleSubmit}
      >
        <input
          className="w-3/4 p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
          placeholder="New task"
          ref={taskName}
        />
        <Button>+ Add task</Button>
      </form>
      <ul>
        {tasks
          .sort((a, b) => {
            if (a.isPending !== b.isPending) {
              return a.isPending ? -1 : 1;
            }
            return a.name.localeCompare(b.name);
          })
          .map((task) => (
            <Task
              task={task}
              onTogglePending={() => onTogglePending(task.id)}
              onDelete={() => onDelete(task.id)}
              key={task.id}
            />
          ))}
      </ul>
    </>
  );
}
