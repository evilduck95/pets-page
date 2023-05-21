import { Table } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import MedicalRow from "components/medical-row";
import { useEffect, useState } from "react";
import { petTreatments, petDetails } from "utils/pet-api";

import './style/medical-table.css'


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

    const [searchParams, _] = useSearchParams();
    const petName = searchParams.get("name");

    useEffect(() => {
        const date = new Date(sinceDate);
        date.setTime(sinceDate.getTime() - (86400000));
        console.log('date', date, sinceDate)
        if(petName) {
            petDetails(petName, petDetails => setPrescriptions(petDetails.prescriptions));
            petTreatments(petName, date, setTreatments);
        }
    }, [sinceDate]);
    
    const renderTableHeader = () => {
        const daysOfTheWeek = new Array(7).fill().map((_, i) => {
            const day = new Date();
            const daysIntoWeek = 86400000 * i;
            day.setTime(sinceDate.getTime() + daysIntoWeek);
            return day;
        });
        return (
            <thead>
                <th>{petName}</th>
                {daysOfTheWeek.map(d => <th key={DAYS_OF_WEEK[d.getDay()]}><div className='date-header'><div className='day-name-header'>{DAYS_OF_WEEK[d.getDay()]}</div><div className='day-date-header'>{nth(d)}</div></div></th>)}
            </thead>
        );
    };

    const findTreatemnts = (medicationName) => {
        const matching = treatments.find(t => t.medicationName === medicationName);
        return matching?.treatments || [];
    }
 
    return (
        <div className="table-container">
            <Table striped='columns' bordered hover variant='dark'>
                {renderTableHeader()}
                <tbody>
                {prescriptions.map(p => 
                    <MedicalRow 
                        key={p.medication}
                        medicationName={p.medication} 
                        startDate={sinceDate}
                        treatments={findTreatemnts(p.medication)}
                    />)
                }
                </tbody>
            </Table>
            
        </div>
    )
}

export default MedicalTable;