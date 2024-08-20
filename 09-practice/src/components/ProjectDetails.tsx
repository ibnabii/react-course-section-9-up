import ProjectDetailsView from "./ProjectDetailsView.tsx";

import { ProjectType } from "../App.tsx";

type ProjectDetailsProps = {
  project: ProjectType;
  onDelete: (projectId: number) => void;
};

export default function ProjectDetails({
  project,
  onDelete,
}: ProjectDetailsProps) {
  return (
    <ProjectDetailsView
      project={project}
      onDelete={() => onDelete(project.id)}
    />
  );
}
