import Button from "./Button.tsx";

type ProjectSidebarProps = {
  startNewProject: () => void;
};

export default function ProjectsSidebar({
  startNewProject,
}: ProjectSidebarProps) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button onClick={startNewProject}>+ Add project</Button>
      </div>
      <ul>
        <li>Proj 1</li>
        <li>Proj 2</li>
      </ul>
    </aside>
  );
}
