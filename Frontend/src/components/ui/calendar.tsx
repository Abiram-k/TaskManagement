// "use client"

// import * as React from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { DayPicker } from "react-day-picker"

// import { cn } from "@/lib/utils"
// import { buttonVariants } from "@/components/ui/button"

// function Calendar({
//   className,
//   classNames,
//   showOutsideDays = true,
//   ...props
// }: React.ComponentProps<typeof DayPicker>) {
//   return (
//     <DayPicker
//       showOutsideDays={showOutsideDays}
//       className={cn("p-3", className)}
//       classNames={{
//         months: "flex flex-col sm:flex-row gap-2",
//         month: "flex flex-col gap-4",
//         caption: "flex justify-center pt-1 relative items-center w-full",
//         caption_label: "text-sm font-medium",
//         nav: "flex items-center gap-1",
//         nav_button: cn(
//           buttonVariants({ variant: "outline" }),
//           "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
//         ),
//         nav_button_previous: "absolute left-1",
//         nav_button_next: "absolute right-1",
//         table: "w-full border-collapse space-x-1",
//         head_row: "flex",
//         head_cell:
//           "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
//         row: "flex w-full mt-2",
//         cell: cn(
//           "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
//           props.mode === "range"
//             ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
//             : "[&:has([aria-selected])]:rounded-md"
//         ),
//         day: cn(
//           buttonVariants({ variant: "ghost" }),
//           "size-8 p-0 font-normal aria-selected:opacity-100"
//         ),
//         day_range_start:
//           "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
//         day_range_end:
//           "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
//         day_selected:
//           "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
//         day_today: "bg-accent text-accent-foreground",
//         day_outside:
//           "day-outside text-muted-foreground aria-selected:text-muted-foreground",
//         day_disabled: "text-muted-foreground opacity-50",
//         day_range_middle:
//           "aria-selected:bg-accent aria-selected:text-accent-foreground",
//         day_hidden: "invisible",
//         ...classNames,
//       }}
//       components={{
//         IconLeft: ({ className, ...props }) => (
//           <ChevronLeft className={cn("size-4", className)} {...props} />
//         ),
//         IconRight: ({ className, ...props }) => (
//           <ChevronRight className={cn("size-4", className)} {...props} />
//         ),
//       }}
//       {...props}
//     />
//   )
// }

// export { Calendar }

import CalendarBasefrom from "react-calendar";
import type { CalendarProps } from "react-calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "react-calendar/dist/Calendar.css";

import { cn } from "@/lib/utils";

type CustomCalendarProps = CalendarProps & {
  className?: string;
};

function Calendar({ className, ...props }: CustomCalendarProps) {
  return (
    <div className={cn("p-3", className)}>
      <CalendarBasefrom
        prevLabel={<ChevronLeft className="size-4" />}
        nextLabel={<ChevronRight className="size-4" />}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={true}
        tileClassName={({ date, view }) =>
          cn(
            "relative w-10 h-10 flex items-center justify-center text-sm rounded-md transition-colors",
            view === "month" &&
              "hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            props.value instanceof Date &&
              date.toDateString() === props.value.toDateString()
              ? "bg-primary text-primary-foreground"
              : "",
            new Date().toDateString() === date.toDateString()
              ? "border border-muted-foreground text-accent-foreground"
              : ""
          )
        }
        navigationLabel={({ label }) => {
          return (
            <>
              <span className="text-sm font-medium">{label}</span>
            </>
          );
        }}
        className="w-full text-center space-y-2"
        {...props}
      />
    </div>
  );
}

export { Calendar };
