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


const MedicalTable = ({ sinceDate }) => {
    const [treatments, setTreatments] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);

    const [searchParams, _] = useSearchParams();
    const petName = searchParams.get("name");
    
    useEffect(() => {
        if(!!petName) {
            petDetails(petName, petDetails => setPrescriptions(petDetails.prescriptions));
            petTreatments(petName, sinceDate, setTreatments);
        }
    }, [sinceDate]);
    
    const renderTableHeader = () => {
        const daysOfTheWeek = new Array(7).fill().map((_, i) => {
            const day = new Date();
            day.setDate(sinceDate.getDate() + i);
            return DAYS_OF_WEEK[day.getDay()];
        });
        
        return (
            <thead>
                <th>{petName}</th>
                {daysOfTheWeek.map(d => <th key={d}>{d}</th>)}
            </thead>
        );
    };

    const findTreatemnts = (medicationName) => {
        const matching = treatments.find(t => t.medicationName === medicationName);
        return matching?.treatments || [];
    }
 
    return (
        <div className="table-container">
            <Table striped bordered hover>
                {renderTableHeader()}
                {prescriptions.map(p => 
                    <MedicalRow 
                        key={p.medication}
                        medicationName={p.medication} 
                        startDate={sinceDate}
                        treatments={findTreatemnts(p.medication)}
                    />)
                }
                
            </Table>
            
        </div>
    )
}

export default MedicalTable;