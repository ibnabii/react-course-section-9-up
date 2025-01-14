import { useAccordionContext } from "./Accordion.jsx";
import { useAccordionItemContext } from "./AccordionItem.jsx";

export default function AccordionContent({ className, children }) {
  const { openItemId } = useAccordionContext();
  const { id } = useAccordionItemContext();
  const isOpen = openItemId === id;
  return (
    <div className={`${className ?? ""} ${isOpen ? "open" : "close"}`}>
      {children}
    </div>
  );
}
