import React from 'react';
import Paginator from "AppRoot/components/paginator"
import MedicalTable from "AppRoot/components/medical-table"
import { useSearchParams } from "react-router-dom";
import { useState } from "react"

const MedicalView = () => {

    const _previousMonday = () => {
        let date = new Date();
        date.setDate(date.getDate() - (date.getDay() + 6) % 7);
        return date;
    }

    const [searchParams, _] = useSearchParams();
    const dateParam = searchParams.get("startDate");

    const [startDate, setStartDate] = useState(dateParam || _previousMonday());

    const _shiftDate = (offsetMillis) => {
        const newStartDate = new Date(startDate.getTime() + offsetMillis);
        setStartDate(newStartDate);
    }

    return (
        <div>
            <Paginator firstDayDate={startDate} setDateCallback={_shiftDate}/>
            <MedicalTable sinceDate={startDate} />
        </div>
    );
}

export default MedicalView;