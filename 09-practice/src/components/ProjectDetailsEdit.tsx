import { useRef } from "react";

import Input from "./Input.tsx";
import Modal, { ModalHandle } from "./Modal.tsx";

import { ProjectType } from "../App.tsx";

type ProjectDetailsEditProps = {
  project: ProjectType;
  onSave: (project: ProjectType) => void;
  onCancel: () => void;
};

export default function ProjectDetailsEdit({
  project,
  onSave,
  onCancel,
}: ProjectDetailsEditProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<ModalHandle>(null);

  function handleSave() {
    const title = titleRef.current!.value;
    const description = descriptionRef.current!.value;
    const dueDate = dueDateRef.current!.value;

    if (
      title.trim() === "" ||
      description.trim() === "" ||
      dueDate.trim() === ""
    ) {
      modalRef.current?.open();
      return;
    }

    onSave({
      ...project,
      title: title,
      description: description,
      dueDate: dueDate,
    });
  }

  return (
    <>
      <Modal ref={modalRef}>
        <h2 className="text-xl font-bold my-4 text-stone-500">Invalid input</h2>
        <p className="text-stone-400 mb-4">
          Please provide a valid value for every input field.
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li key="cancel">
            <button
              className="text-stone-800 hover:text-stone-950 hover:bg-stone-100 px-6 py-2 rounded-md"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li key="save">
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 hover:text-stone-100"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input
            type="text"
            label={"Title"}
            ref={titleRef}
            defaultValue={project.title}
          />
          <Input
            label={"Description"}
            isTextArea={true}
            ref={descriptionRef}
            defaultValue={project.description}
          />
          <Input
            type="date"
            label={"Due date"}
            ref={dueDateRef}
            defaultValue={project.dueDate}
          />
        </div>
      </div>
    </>
  );
}
