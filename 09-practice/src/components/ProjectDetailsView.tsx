import { ProjectType } from "../App.tsx";

type ProjectDetailsViewProps = {
  project: ProjectType;
  onDelete: () => void;
};

export default function ProjectDetailsView({
  project,
  onDelete,
}: ProjectDetailsViewProps) {
  const labelClasses =
    "text-sm font-bold uppercase text-stone-500 border-b-2 border-stone-300";
  const valueClasses = "text-stone-600";
  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li key="delete">
          <button
            className="text-stone-800 hover:text-stone-950 hover:bg-stone-100 px-6 py-2 rounded-md"
            onClick={onDelete}
          >
            Delete
          </button>
        </li>
        <li key="edit">
          <button
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 hover:text-stone-100"
            // onClick={handleSave}
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
        <p className={valueClasses}>{project.description}</p>
      </div>
      <div className="flex flex-col gap-2 my-4">
        <p className={labelClasses}>Due date</p>
        <p className={valueClasses}>{project.dueDate}</p>
      </div>
    </div>
  );
}
