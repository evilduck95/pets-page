import TreatmentCell from "components/treatment-cell";

import './style/medical-row.css'

const MedicalRow = ({medicationName, startDate, treatments}) => {

    console.log(medicationName, treatments);

    const days = [];
    for (let i = 0; i < 7; i++) {
        const nextDay = new Date();
        nextDay.setDate(startDate.getDate() + i);
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

    return(
        <tr>
            <th scope="row">{medicationName}</th>
            {days.map(d => <td><TreatmentCell treatments={d.treatments}/></td>)}
        </tr>
    )
}

export default MedicalRow;