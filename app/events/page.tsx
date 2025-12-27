"use client";
import * as React from "react";

import { Calendar } from "@/components/ui/calendar";

export default function EventsPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <html>
      <body>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border"
        />
      </body>
    </html>
  );
}
