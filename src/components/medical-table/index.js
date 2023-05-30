import React from 'react';
import { Table } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import MedicalRow from "AppRoot/components/medical-row";
import { useEffect, useState } from "react";
import { petTreatments, petDetails, prescribeMedication } from "AppRoot/utils/pet-api";
import { Button } from "@mui/material";
import { AiOutlinePlus } from 'react-icons/ai';
import { getPrescriptionsOrdering, setPrescriptionOrdering } from 'AppRoot/utils/storage';


import './style/medical-table.css'
import NewMedicationModal from "AppRoot/components/new-medication-modal";


const DAYS_OF_WEEK = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

const exampleTreatment = {
    medicationName: 'Med 1',
    treatments: [
        {
            date: new Date('2023-01-01T12:00:00'),
            given: true
        },
        {
            date: new Date('2023-01-01T12:30:00'),
            given: false
        },
        {
            date: new Date('2023-01-02T12:00:00'),
            given: true
        },
    ]
}

exampleTreatment.treatments.forEach(t => t.date = new Date(Date.parse(t.date)));

const nth = function(d) {
    const dayOfMonth = d.getDate();
    let ordinal = '';
    if (dayOfMonth > 3 && dayOfMonth < 21) ordinal = 'th';
    else {
        switch (dayOfMonth % 10) {
            case 1:  ordinal = "st"; break;
            case 2:  ordinal = "nd"; break;
            case 3:  ordinal = "rd"; break;
            default: ordinal = "th";
        }
    }
    return (
        <div>{dayOfMonth}<sup>{ordinal}</sup>{' ' + MONTHS[d.getMonth()]}</div>
    );
  }

const MedicalTable = ({ sinceDate }) => {
    const [treatments, setTreatments] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [searchParams, _] = useSearchParams();
    const petName = searchParams.get("name");

    useEffect(() => {
        const date = new Date(sinceDate);
        date.setTime(sinceDate.getTime() - (86400000));
        if(petName) {
            petDetails(petName, petDetails => setPrescriptionsWithOrder(petDetails.prescriptions));
            petTreatments(petName, date, setTreatments);
        }
    }, [sinceDate, petName]);
    

    const setPrescriptionsWithOrder = (pres) => {
        const ids = pres.map(p => p.id);
        const savedOrder = getPrescriptionsOrdering(petName) || [];
        const newIds = ids.filter(id => !savedOrder.includes(id));
        savedOrder.push(...newIds);
        setPrescriptionOrdering(petName, savedOrder);
        setPrescriptionsInSavedOrder(pres);
    }

    const setPrescriptionsInSavedOrder = (pres) => {
        const savedOrder = getPrescriptionsOrdering(petName) || [];
        const orderedPrescriptions = savedOrder.map(s => pres.find(p => p.id === s));
        setPrescriptions(orderedPrescriptions);
    }

    const renderTableHeader = () => {
        const daysOfTheWeek = new Array(7).fill().map((_, i) => {
            const day = new Date();
            const daysIntoWeek = 86400000 * i;
            day.setTime(sinceDate.getTime() + daysIntoWeek);
            return day;
        });
        return (
            <thead>
                <tr>
                    <th>{petName}</th>
                    {daysOfTheWeek.map(d => <th key={DAYS_OF_WEEK[d.getDay()]}><div className='date-header'><div className='day-name-header'>{DAYS_OF_WEEK[d.getDay()]}</div><div className='day-date-header'>{nth(d)}</div></div></th>)}
                </tr>
            </thead>
        );
    };

    const findTreatemnts = (medicationName) => {
        const matching = treatments.find(t => t.medicationName === medicationName);
        return matching?.treatments || [];
    };

    const addMedication = (event) => {
        event.preventDefault();
        const { formMedication, formBrand, formDosage, formFrequency, formCount } = event.target;
        prescribeMedication(
            petName,
            formMedication.value,
            formBrand.value,
            formDosage.value,
            formFrequency.value,
            formCount.value,
            res => addPrescriptionRow(res)
        );
    }

    const addPrescriptionRow = (prescription) => {
        setPrescriptions(p => [...p, prescription]);
        setShowModal(false);
    }

    const removePrescription = (id) => {
        const updatedPrescriptions = prescriptions.filter(p => p.id !== id);
        setPrescriptions(updatedPrescriptions);
    }

    const moveRow = (id, direction) => {
        const order = getPrescriptionsOrdering(petName) || [];
        const idx = order.indexOf(id);
        const swapIdx = idx + direction;
        if(swapIdx < 0 || swapIdx > prescriptions.length) return;
        const tmp = order[idx];
        order[idx] = order[swapIdx];
        order[swapIdx] = tmp;
        setPrescriptionOrdering(petName, order);
        setPrescriptionsInSavedOrder(prescriptions);
    }

    return (
        <div className="table-container">
            <div className='table-responsive-xl'>
            <Table striped='columns' bordered hover variant='light'>
                {renderTableHeader()}
                <tbody>
                {prescriptions.map(p => 
                    <MedicalRow 
                        key={p.id}
                        prescriptionId={p.id}
                        medicationName={p.medication}
                        startDate={sinceDate}
                        treatments={findTreatemnts(p.medication)}
                        rearrangeCallback={moveRow}
                        removalCallback={removePrescription}
                    />)
                }
                </tbody>
            </Table>
            </div>
            <div id='footer-controls'>
                <Button variant='contained' size='large' endIcon={<AiOutlinePlus/>} onClick={() => setShowModal(true)}>Add Medication</Button>
            </div>
            <NewMedicationModal petName={petName} shown={showModal} closeCallback={() => setShowModal(false)} confirmCallback={addMedication}/>
        </div>
    )
}

export default MedicalTable;