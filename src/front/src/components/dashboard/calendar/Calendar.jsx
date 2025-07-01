
import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import './Calendar.css'
import "primereact/resources/themes/lara-dark-purple/theme.css";

export default function InlineDemo() {
    const [date, setDate] = useState(null);

    return (
        <div className="card flex justify-content-center ">
            <Calendar value={date} onChange={(e) => setDate(e.value)} inline showWeek />
        </div>
    )
}
        