import { useAccordionContext } from "./Accordion.jsx";

export default function AccordionItem({ id, children, title, className }) {
  const { openItemId, toggleItem } = useAccordionContext();
  const isOpen = openItemId === id;

  return (
    <li className={className}>
      <h3 onClick={() => toggleItem(id)}>{title}</h3>
      <div className={`accordion-item-content${isOpen ? " open" : ""}`}>
        {children}
      </div>
    </li>
  );
}
