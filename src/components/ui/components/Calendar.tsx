import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function DatePicker({ onChange }: { onChange: (date: Date) => void }) {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild className="shad-select-trigger !bg-background-100">
        <div className="row-flex-btwn w-full gap-4">
          {date ? format(date, "PPP") : <span className="mt-0.5 text-placeholder">DD/MM/YYYY</span>}
          <CalendarIcon className="mr-2 size-5 text-placeholder" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-background-100">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date);

            date && onChange(date);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
