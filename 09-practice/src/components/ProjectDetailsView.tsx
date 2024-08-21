import { useRef } from "react";

import { ProjectType } from "../App.tsx";
import ConfirmationModal, { ModalHandle } from "./ConfirmationModal.tsx";
import TasksList from "./TasksList.tsx";

type ProjectDetailsViewProps = {
  project: ProjectType;
  onDelete: () => void;
  onEdit: () => void;
  onDeleteTask: (taskId: number) => void;
  onAddTask: (name: string) => void;
  onToggleTask: (taskId: number) => void;
};

export default function ProjectDetailsView({
  project,
  onDelete,
  onEdit,
  onDeleteTask,
  onAddTask,
  onToggleTask,
}: ProjectDetailsViewProps) {
  const labelClasses =
    "text-sm font-bold uppercase text-stone-500 border-b-2 border-stone-300";
  const valueClasses = "text-stone-600";
  const modalRef = useRef<ModalHandle>(null);

  function handleDelete() {
    modalRef.current!.open();
  }

  return (
    <>
      <ConfirmationModal onConfirm={onDelete} ref={modalRef}>
        <h2 className="text-xl font-bold my-4 text-stone-500">
          Are you sure, you want to delete this project?
        </h2>
      </ConfirmationModal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li key="delete">
            <button
              className="text-stone-800 hover:text-stone-950 hover:bg-stone-100 px-6 py-2 rounded-md"
              onClick={handleDelete}
            >
              Delete
            </button>
          </li>
          <li key="edit">
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 hover:text-stone-100"
              onClick={onEdit}
            >
              Edit
            </button>
          </li>
        </menu>
        <div className="flex flex-col gap-2 my-4">
          <p className={labelClasses}>Title</p>
          <p className={valueClasses}>{project.title}</p>
        </div>
        <div className="flex flex-col gap-2 my-4">
          <p className={labelClasses}>Description</p>
          <p className={`${valueClasses} whitespace-pre-wrap`}>
            {project.description}
          </p>
        </div>
        <div className="flex flex-col gap-2 my-4">
          <p className={labelClasses}>Due date</p>
          <p className={valueClasses}>{project.dueDate}</p>
        </div>
        <hr />
        <h2 className="text-xl font-bold my-4 text-stone-500">Tasks</h2>
        <TasksList
          tasks={project.tasks}
          onTogglePending={onToggleTask}
          onDelete={onDeleteTask}
          onAdd={onAddTask}
        />
      </div>
    </>
  );
}
