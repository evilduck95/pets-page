import React from 'react';
import { useState } from "react"
import { amendTreatment, deleteTreatment } from "AppRoot/utils/pet-api";
import { useSearchParams } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import './style/treatment-entry.css'


const TreatmentEntry = ({treatmentId, date, givenFlag, enabled, deletedCallback}) => {
    const [given, setGiven] = useState(givenFlag);
    const [loading, setLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const petName = searchParams.get("name");

    const toggleTreatmentGiven = () => {
        if (enabled) {
            setLoading(true);
            amendTreatment(treatmentId, !given, updatedGiven => {
                setGiven(updatedGiven)
                setLoading(false);
            });
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
                <div className="delete-button">{loading && <AiOutlineLoading3Quarters color="black" size={"2em"}/> || <MdDeleteForever color="black" size={"2em"} onClick={removeTreatment}/>}</div>
            </div>
        </div>
    )
}

export default TreatmentEntry;