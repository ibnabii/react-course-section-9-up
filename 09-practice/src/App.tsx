import { useState } from "react";

import ProjectsSidebar from "./components/ProjectsSidebar.tsx";
import NewProject from "./components/NewProject.tsx";
import NoProjectSelected from "./components/NoProjectSelected.tsx";

export type NewProjectType = {
  title: string;
  description: string;
  dueDate: string;
};
type ProjectType = {
  id: number;
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
        { ...newProject, id: prevState.nextId },
      ],
      selectedProject: prevState.nextId,
      nextId: prevState.nextId + 1,
    }));
  }

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
    </main>
  );
}

export default App;
