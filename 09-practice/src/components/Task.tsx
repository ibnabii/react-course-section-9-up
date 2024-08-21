import { TaskType } from "../App.tsx";

type TaskProps = {
  task: TaskType;
  onTogglePending: () => void;
  onDelete: () => void;
};

export default function Task({ task, onTogglePending, onDelete }: TaskProps) {
  const doneClasses = "line-through text-sm";
  const pendingClasses = "text-base";

  return (
    <li key={task.id} className="flex w-full justify-between ml-8">
      <button
        onClick={onTogglePending}
        className={task.isPending ? pendingClasses : doneClasses}
      >
        {task.name}
      </button>
      <button
        onClick={onDelete}
        className="text-stone-800 hover:text-stone-950 hover:bg-stone-100 px-6  rounded-md"
      >
        Delete
      </button>
    </li>
  );
}
