import React from 'react';
import TreatmentEntry from 'AppRoot/components/treatment-entry';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { TimePicker } from '@mui/x-date-pickers';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import ClickOutsideAlerter from 'AppRoot/components/click-outside-alerter';
import { addTreatment } from 'AppRoot/utils/pet-api';


import './style/treatment-cell.css';


const TreatmentCell = ({ medicationName, dateStartOfDay, treatments, beforeIndicator, afterIndicator }) => {
    const [choosingDate, setChoosingDate] = useState(false);
    const [treatmentList, setTreatmentList] = useState([]);
    
    useEffect(() => {
      setTreatmentList(treatments);
    }, [treatments]);

    const [searchParams, _] = useSearchParams();
    const petName = searchParams.get("name");

    const treatPet = (treatmentTimeToday) => {
        const day = new Date(dateStartOfDay);
        const time = treatmentTimeToday.$d;
        day.setUTCHours(time.getHours(), time.getMinutes(), 0, 0);
        addTreatment(petName, medicationName, day, treatment => treatmentAdded(treatment));
        setChoosingDate(false);
    }

    const treatmentAdded = (treatment) => {
      treatment.dateTime = new Date(treatment.dateTime);
      setTreatmentList([...treatmentList, treatment]);
    }

    const treatmentDeleted = (id) => {
      setTreatmentList(treatmentList.filter(t => t.id !== id));
    }

    const color = 'aliceblue';

    const theme = createTheme({
        components: {
          MuiFormControl: {
            styleOverrides: {
              root: {
                paddingTop: '5px',
                paddingBottom: '5px',
                width: '100%'
              }
            }
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                color: 'aliceblue',
                backgroundColor: 'var(--general-background)'
              },
              input: {
                paddingTop: '6px',
                paddingBottom: '6px',
                color: 'rgba(255, 255, 255, 1)',
                opacity: '1'
              },
              notchedOutline: {
                borderColor: 'rgba(1, 1, 1, 0.8)'
              }
            }
          },
          MuiSvgIcon: {
            styleOverrides: {
              root: {
                color: 'aliceblue'
              }
            }
          }
        }
    });

    return (
        <div className='treatment-cell'>
            {beforeIndicator && <BiChevronsLeft/>}
            <ClickOutsideAlerter callback={() => {}}>
                <div className='add-treatment-entry'>
                    <ThemeProvider theme={theme}>
                        <TimePicker onOpen={() => setChoosingDate(true)} onClose={() => setChoosingDate(false)} onAccept={treatPet} slotProps={{textField: { size: 'small', placeholder: 'hh:mm' }}}/>
                    </ThemeProvider>
                </div>
            </ClickOutsideAlerter>
            <div className="treatment-list">
                {treatmentList.map(t => <TreatmentEntry key={t.id} treatmentId={t.id} date={t.dateTime} givenFlag={t.given} enabled={!choosingDate} deletedCallback={treatmentDeleted}/>)}
            </div>
            {afterIndicator && <BiChevronsRight/>}
        </div>
    )
}

export default TreatmentCell;