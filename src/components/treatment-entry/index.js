import { useEffect, useState } from "react"
import { amendTreatment } from "utils/pet-api";
import { useSearchParams } from "react-router-dom";

import './style/treatment-entry.css'


const TreatmentEntry = ({treatmentId, date, givenFlag}) => {
    const  [given, setGiven] = useState(givenFlag);

    const [searchParams, _] = useSearchParams();
    const petName = searchParams.get("name");

    const toggleTreatmentGiven = () => {
        // TODO: NEED TO USE UNIQUE KEYS FOR UPDATING AND STORE THEM IN MEMORY HERE SO WE DON'T HAVE TO USE THE TIME TO CHANGE TREATMENTS.
        amendTreatment(treatmentId, !given, updatedGiven => setGiven(updatedGiven));
    }
    
    return (
        <div className="dosage-cell">
            <div className={"dosage-indicator " + (given ? "dosage-given" : "dosage-pending")} onClick={toggleTreatmentGiven}>
                <div className="dosage-time">{date.toLocaleTimeString()}</div>
            </div>
        </div>
    )
}

export default TreatmentEntry;