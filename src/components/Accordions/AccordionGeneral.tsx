import { AccordionItemType } from "./conditionsItems";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionGeneral({ items }: { items: AccordionItemType[] }) {
  return (
    <Accordion type="single" collapsible className="w-full text-left">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
export type { AccordionItemType };
