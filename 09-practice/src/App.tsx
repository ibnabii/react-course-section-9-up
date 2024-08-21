import { useState } from "react";

import ProjectsSidebar from "./components/ProjectsSidebar.tsx";
import ProjectDetails from "./components/ProjectDetails.tsx";
import NewProject from "./components/NewProject.tsx";
import NoProjectSelected from "./components/NoProjectSelected.tsx";

export type NewProjectType = {
  title: string;
  description: string;
  dueDate: string;
};

export type TaskType = {
  id: number;
  name: string;
  isPending: boolean;
};

export type ProjectType = {
  id: number;
  tasks: TaskType[];
  nextTaskId: number;
} & NewProjectType;

export type ProjectSelection = number | null | undefined;

export type AppState = {
  selectedProject: ProjectSelection;
  projects: ProjectType[];
  nextId: number;
};

function App() {
  const [appState, setAppState] = useState<AppState>({
    selectedProject: undefined,
    projects: [],
    nextId: 0,
  });

  function selectProject(selectedProject: ProjectSelection) {
    setAppState((prevState) => ({
      ...prevState,
      selectedProject: selectedProject,
    }));
  }

  function handleStartNewProject() {
    setAppState((prevState) => ({
      ...prevState,
      selectedProject: null,
    }));
  }

  function handleAddProject(newProject: NewProjectType) {
    setAppState((prevState) => ({
      projects: [
        ...prevState.projects,
        { ...newProject, id: prevState.nextId, tasks: [], nextTaskId: 0 },
      ],
      selectedProject: prevState.nextId,
      nextId: prevState.nextId + 1,
    }));
  }

  function handleDeleteProject(projectId: number) {
    setAppState((prevState) => {
      return {
        ...prevState,
        projects: prevState.projects.filter(
          (project) => project.id !== projectId,
        ),
        selectedProject: undefined,
      };
    });
  }

  function handleModifyProject(modifiedProject: ProjectType) {
    setAppState((prevState) => ({
      ...prevState,
      projects: prevState.projects.map((project) =>
        project.id === modifiedProject.id ? modifiedProject : project,
      ),
    }));
  }

  function getProject(projectId: ProjectSelection) {
    if (typeof projectId === "number") {
      const project = appState.projects.find(
        (project) => project.id === projectId,
      );
      if (project) return project;
      else selectProject(undefined);
    }
    return null;
  }

  function handleAddTask(name: string, projectId: number) {
    setAppState((prevState) => ({
      ...prevState,
      projects: prevState.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              nextTaskId: project.nextTaskId + 1,
              tasks: [
                ...project.tasks,
                {
                  id: project.nextTaskId,
                  name: name,
                  isPending: true,
                },
              ],
            }
          : project,
      ),
    }));
  }

  function handleDeleteTask(
    projectId: ProjectType["id"],
    taskId: TaskType["id"],
  ) {
    setAppState((prevState) => ({
      ...prevState,
      projects: prevState.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.filter((task) => task.id !== taskId),
            }
          : project,
      ),
    }));
  }

  function handleToggleTask(
    projectId: ProjectType["id"],
    taskId: TaskType["id"],
  ) {
    setAppState((prevState) => ({
      ...prevState,
      projects: prevState.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, isPending: !task.isPending }
                  : task,
              ),
            }
          : project,
      ),
    }));
  }

  const selectedProject = getProject(appState.selectedProject);

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        startNewProject={handleStartNewProject}
        selectProject={selectProject}
        appState={appState}
      />
      {appState.selectedProject === undefined && (
        <NoProjectSelected startNewProject={handleStartNewProject} />
      )}
      {appState.selectedProject === null && (
        <NewProject
          onSave={handleAddProject}
          onCancel={() => selectProject(undefined)}
        />
      )}

      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onDelete={handleDeleteProject}
          onModify={handleModifyProject}
          onAddTask={(name) => handleAddTask(name, selectedProject.id)}
          onDeleteTask={(taskId) =>
            handleDeleteTask(selectedProject.id, taskId)
          }
          onToggleTask={(taskId) =>
            handleToggleTask(selectedProject.id, taskId)
          }
        />
      )}
    </main>
  );
}

export default App;
