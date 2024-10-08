import { useState, useEffect } from "react";

import ProjectDetailsView from "./ProjectDetailsView.tsx";
import ProjectDetailsEdit from "./ProjectDetailsEdit.tsx";
import { ProjectType } from "../App.tsx";

type ProjectDetailsProps = {
  project: ProjectType;
  onDelete: (projectId: number) => void;
  onModify: (project: ProjectType) => void;
  onDeleteTask: (taskId: number) => void;
  onAddTask: (name: string) => void;
  onToggleTask: (taskId: number) => void;
};

type ProjectViewType = "view" | "edit";

export default function ProjectDetails({
  project,
  onDelete,
  onModify,
  onAddTask,
  onDeleteTask,
  onToggleTask,
}: ProjectDetailsProps) {
  const [viewType, setViewType] = useState<ProjectViewType>("view");

  // this will reset the viewType to 'view' whenever project changes (which in this app is done)
  // from ProjectsSidebar component
  useEffect(() => {
    setViewType("view");
  }, [project]);

  if (viewType === "view") {
    return (
      <ProjectDetailsView
        project={project}
        onDelete={() => onDelete(project.id)}
        onEdit={() => setViewType("edit")}
        onAddTask={onAddTask}
        onToggleTask={onToggleTask}
        onDeleteTask={onDeleteTask}
      />
    );
  }
  if (viewType === "edit") {
    return (
      <ProjectDetailsEdit
        project={project}
        onSave={onModify}
        onCancel={() => setViewType("view")}
      />
    );
  }
}
