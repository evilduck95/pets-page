import Paginator from "components/paginator"
import MedicalTable from "components/medical-table"
import { useState } from "react"

const MedicalView = () => {

    const _previousMonday = () => {
        let date = new Date();
        date.setDate(date.getDate() - (date.getDay() + 6) % 7);
        return date;
    }

    const [startDate, setStartDate] = useState(_previousMonday());

    const _shiftDate = (offset) => {
        const newStartDate = new Date();
        newStartDate.setDate(startDate.getDate() + offset);
        setStartDate(newStartDate);
    }

    console.log('Date', startDate);

    return (
        <div>
            <Paginator firstDayDate={startDate} setDateCallback={_shiftDate}/>
            <MedicalTable sinceDate={startDate} />
        </div>

    )
}

export default MedicalView;