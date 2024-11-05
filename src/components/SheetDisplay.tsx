import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function SheetDisplay({ selectedItems }) {
  return (
    <Sheet>
      <SheetTrigger>
        <ShoppingCart />
      </SheetTrigger>
      <SheetContent className="bg-black text-white">
        <SheetHeader>
          <SheetTitle className="  text-white text-3xl">My favorits</SheetTitle>
          <SheetDescription className="  text-white">
            <ul>
              {selectedItems.map((item, index) => (
                <li key={index}>
                  <Image
                    src="/img/ok.webp"
                    alt="product image"
                    className="object-contain px-3"
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </li>
              ))}
            </ul>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
