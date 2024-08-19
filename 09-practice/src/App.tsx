import { useState } from "react";

import ProjectsSidebar from "./components/ProjectsSidebar.tsx";
import NewProject from "./components/NewProject.tsx";
import NoProjectSelected from "./components/NoProjectSelected.tsx";

type Project = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
};

export type ProjectSelection = number | null | undefined;

type AppState = {
  selectedProject: ProjectSelection;
  projects: Project[];
};

function App() {
  const [appState, setAppState] = useState<AppState>({
    selectedProject: undefined,
    projects: [],
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

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar startNewProject={handleStartNewProject} />
      {appState.selectedProject === undefined && (
        <NoProjectSelected startNewProject={handleStartNewProject} />
      )}
      {appState.selectedProject === null && <NewProject />}
    </main>
  );
}

export default App;
