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

    // TODO: If the treatment was JUST created and the page hasn't refreshed then this won't work as we don't know the Database ID.
    // 2 Options:
    // - Try with time and see if the backend can find it reliably? 
    // - Ensure creating a treatment brings back the ID and put it into the component state plixy plox? (atm this sounds better to me imo, lmao, lol even)
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