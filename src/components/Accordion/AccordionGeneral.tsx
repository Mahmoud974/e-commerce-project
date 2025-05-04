import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type AccordionItemType = {
  value: string;
  trigger: string;
  content: React.ReactNode;
};

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
