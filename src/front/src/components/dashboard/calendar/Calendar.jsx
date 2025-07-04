import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import "./Calendar.css";
import "primereact/resources/themes/lara-dark-purple/theme.css";

export default function InlineDemo() {
  const [date, setDate] = useState(null);

  return (
    <div className="relative w-[480px] h-[500px] p-4 mx-auto shadow-lg overflow-hidden bg-transparent">
      <Calendar
        className="calendar-class"
        value={date}
        onChange={(e) => setDate(e.value)}
        inline
      />
    </div>
  );
}
