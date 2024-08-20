type ProjectListItemProps = {
  projectTitle: string;
  isActive: boolean;
  onClick: () => void;
};
export default function ProjectListItem({
  projectTitle,
  isActive,
  onClick,
}: ProjectListItemProps) {
  const classActive = isActive ? "bg-stone-700 text-lg" : "";
  return (
    <li
      className={`${classActive} px-2 py-1 rounded-md hover:bg-stone-600 hover:text-stone-100`}
    >
      <button onClick={onClick}>{projectTitle}</button>
    </li>
  );
}
