import React from 'react';
import TreatmentCell from "AppRoot/components/treatment-cell";
import { WEEK_MILLIS } from "AppRoot/components/paginator";


import './style/medical-row.css'
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

import { MdDeleteForever } from "react-icons/md";
import { removePrescription } from "AppRoot/utils/pet-api";

const MedicalRow = ({prescriptionId, medicationName, startDate, treatments, removalCallback}) => {

    const [showModal, setShowModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

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

    const deletePrescription = () => {
        removePrescription(prescriptionId, (success, id) => success && removalCallback(id));
    };

    const renderConfirmationDialog = () => (
        <Modal centered show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Remove prescription of <strong>{medicationName}</strong>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={() => setShowModal(false)}>Cancel</Button>
                <Button variant='primary' onClick={deletePrescription}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    )

    return(
        <tr>
            <th 
                scope="row" 
                onMouseEnter={() => setShowDelete(true)} 
                onMouseLeave={() => setShowDelete(false)}
            >
                <div>{medicationName}</div>
                <>{showDelete && <MdDeleteForever className='delete-button' size={20} color='orangered' onClick={() => setShowModal(true)}/>}</>
            </th>
            {days.map(d => <td key={d.date}><TreatmentCell medicationName={medicationName} dateStartOfDay={d.date} treatments={d.treatments}/></td>)}
            {renderConfirmationDialog()}
        </tr>
    )
}

export default MedicalRow;