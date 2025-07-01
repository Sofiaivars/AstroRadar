
import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';

export default function InlineDemo() {
    const [date, setDate] = useState(null);

    return (
        <div className="card flex justify-content-center">
            <Calendar value={date} onChange={(e) => setDate(e.value)} inline showWeek />
        </div>

    )
}
        