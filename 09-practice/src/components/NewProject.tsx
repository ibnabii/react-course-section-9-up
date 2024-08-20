import Input from "./Input.tsx";
import { useRef } from "react";

import { NewProjectType } from "../App.tsx";

type NewProjectProps = {
  onSave: (project: NewProjectType) => void;
};

export default function NewProject({ onSave }: NewProjectProps) {
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const dueDate = useRef<HTMLInputElement>(null);

  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button className="text-stone-800 hover:text-stone-950 hover:bg-stone-100 px-6 py-2 rounded-md">
            Cancel
          </button>
        </li>
        <li>
          <button
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 hover:text-stone-100"
            onClick={() => {
              onSave({
                title: title.current!.value,
                description: description.current!.value,
                dueDate: dueDate.current!.value,
              });
            }}
          >
            Save
          </button>
        </li>
      </menu>
      <div>
        <Input type="text" label={"Title"} ref={title} />
        <Input label={"Description"} isTextArea={true} ref={description} />
        <Input type="date" label={"Due date"} ref={dueDate} />
      </div>
    </div>
  );
}
