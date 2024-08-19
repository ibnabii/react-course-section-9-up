import Input from "./Input.tsx";
import { useRef } from "react";

export default function NewProject() {
  const title = useRef<HTMLInputElement>();
  const description = useRef<HTMLInputElement>();
  const dueDate = useRef<HTMLInputElement>();

  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button className="text-stone-800 hover:text-stone-950 hover:bg-stone-100 px-6 py-2 rounded-md">
            Cancel
          </button>
        </li>
        <li>
          <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 hover:text-stone-100">
            Save
          </button>
        </li>
      </menu>
      <div>
        <Input label={"Title"} ref={title} />
        <Input label={"Description"} isTextArea={true} />
        <Input label={"Due date"} />
      </div>
    </div>
  );
}
