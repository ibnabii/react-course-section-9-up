import image from "../assets/no-projects.png";

import Button from "./Button.tsx";

type NoProjectSelectedProps = {
  startNewProject: () => void;
};

export default function NoProjectSelected({
  startNewProject,
}: NoProjectSelectedProps) {
  return (
    <div className="mt-24 text-center w-2/3">
      <img
        src={image}
        alt="no project selected"
        className="w-16 h-16 object-contain mx-auto"
      />
      <h2 className="text-xl font-bold my-4 text-stone-500">
        No Project Selected
      </h2>
      <p className="text-stone-400 mb-4">
        Select a project or get started with a new one
      </p>
      <p className="mt-8">
        <Button onClick={startNewProject}>Create new project</Button>
      </p>
    </div>
  );
}
