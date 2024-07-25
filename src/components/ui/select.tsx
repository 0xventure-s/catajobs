import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export default function Select({className,...props}: React.HTMLProps<HTMLSelectElement>) {
  return (
    <div className="relative">
    <select
      className={cn(
        "h-10 w-full border rounded-md appearance-none truncate bg-background border-input py-2 pl-3 pr-8 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />


   
    <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50"/>

    </div>
  );
}
