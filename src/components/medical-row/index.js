import TreatmentCell from "components/treatment-cell";
import { WEEK_MILLIS } from "components/paginator";


import './style/medical-row.css'

const MedicalRow = ({medicationName, startDate, treatments}) => {

    // TODO: NEED TO QUERY THE DATABASE FOR THESE, WE DON'T HAVE THEM OUTSIDE THE CURRENT WEEK VIEW.
    const hasFutureTreatments = () => {
        const endOfWeek = new Date(startDate.getTime() + WEEK_MILLIS);
        return treatments.some(t => t.dateTime > endOfWeek);
    }

    const hasPastTreatments = () => {
        return treatments.some(t => t.dateTime < startDate);
    }

    const days = [];
    for (let i = 0; i < 7; i++) {
        const nextDay = new Date();
        nextDay.setTime(startDate.getTime() + (i * 86400000));
        days.push({date: nextDay, treatments: []});
    }

    for (const d of days) {
        for (const t of treatments) {
            t.dateTime = new Date(t.dateTime);
            const treatmentDate = t.dateTime;
            if(treatmentDate.getDate() === d.date.getDate()) {
                d.treatments.push(t);
            }
        }
    }

    const buildCells = () => {
        if (hasPastTreatments()) days[0].pastTreatments = true;
        if (hasFutureTreatments()) days[6].futureTreatments = true;
        return ;
    }

    return(
        <tr>
            <th scope="row">{medicationName}</th>
            {days.map(d => <td key={d.date}><TreatmentCell medicationName={medicationName} dateStartOfDay={d.date} treatments={d.treatments}/></td>)}
        </tr>
    )
}

export default MedicalRow;