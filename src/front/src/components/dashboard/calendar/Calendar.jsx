import { useState } from "react";
import { Calendar } from "primereact/calendar";
import "./Calendar.css";
import "primereact/resources/themes/lara-dark-purple/theme.css";

export default function InlineDemo() {
  const [date, setDate] = useState(null);

  return (
    <div className="shadow-lg w-1/2 h-70 rounded-2xl overflow-hidden borde-con-degradado">
      <Calendar
        className="calendar-class w-full h-full"
        value={date}
        onChange={(e) => setDate(e.value)}
        inline
      />
    </div>
  );
}
