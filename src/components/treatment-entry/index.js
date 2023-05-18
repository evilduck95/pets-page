import { useState } from "react"
import { amendTreatment, deleteTreatment } from "utils/pet-api";
import { useSearchParams } from "react-router-dom";

import './style/treatment-entry.css'


const TreatmentEntry = ({treatmentId, date, givenFlag, enabled, deletedCallback}) => {
    const  [given, setGiven] = useState(givenFlag);

    const [searchParams] = useSearchParams();
    const petName = searchParams.get("name");

    const toggleTreatmentGiven = () => {
        if (enabled) {
            amendTreatment(treatmentId, !given, updatedGiven => setGiven(updatedGiven));
        }
    }

    const removeTreatment = (event) => {
        if (enabled) {
            deleteTreatment(treatmentId, (success, id) => success && deletedCallback(id));
            event.stopPropagation();
        }
    }
    
    return (
        <div className="dosage-cell">
            <div className={"dosage-indicator " + (given ? "dosage-given" : "dosage-pending")} onClick={toggleTreatmentGiven}>
                <div className="dosage-time">{date.toLocaleTimeString()}</div>
                <div onClick={removeTreatment}>delete</div>
            </div>
        </div>
    )
}

export default TreatmentEntry;