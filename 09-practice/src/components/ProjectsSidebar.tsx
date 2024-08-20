import Button from "./Button.tsx";
import ProjectListItem from "./ProjectListItem.tsx";

import { AppState } from "../App.tsx";

type ProjectSidebarProps = {
  startNewProject: () => void;
  selectProject: (projectId: number) => void;
  appState: AppState;
};

export default function ProjectsSidebar({
  startNewProject,
  selectProject,
  appState,
}: ProjectSidebarProps) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button onClick={startNewProject}>+ Add project</Button>
      </div>
      <ul className="my-8 text-stone-400">
        {appState.projects.map((project) => (
          <ProjectListItem
            projectTitle={project.title}
            isActive={project.id === appState.selectedProject}
            onClick={() => selectProject(project.id)}
            key={project.id}
          />
        ))}
      </ul>
    </aside>
  );
}
