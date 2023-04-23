import { useState } from "react"

import './style/treatment-entry.css'


const TreatmentEntry = ({date, givenFlag}) => {
    const  [given, setGiven] = useState(givenFlag);

    const toggleTreatmentGiven = () => {
        setGiven(given => !given);
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