import TreatmentEntry from 'components/treatment-entry';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { TimePicker } from '@mui/x-date-pickers';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import ClickOutsideAlerter from 'components/click-outside-alerter';
import { addTreatment } from 'utils/pet-api';


import './style/treatment-cell.css';


const TreatmentCell = ({ medicationName, dateStartOfDay, treatments, beforeIndicator, afterIndicator }) => {
    const [choosingDate, setChoosingDate] = useState(false);
    const [treatmentList, setTreatmentList] = useState(treatments);

    const [searchParams, _] = useSearchParams();
    const petName = searchParams.get("name");

    const treatPet = (treatmentTimeToday) => {
        const day = new Date(dateStartOfDay);
        const time = treatmentTimeToday.$d;
        day.setUTCHours(time.getUTCHours(), time.getUTCMinutes(), 0, 0);
        addTreatment(petName, medicationName, day, res => console.log(res));
        setChoosingDate(false);
    }

    const treatmentDeleted = (id) => {
      console.log('treatment deleted', id)
      setTreatmentList(treatmentList.filter(t => t.id !== id));
    }

    const color = 'aliceblue';

    const theme = createTheme({
        components: {
          MuiIconButton: {
            styleOverrides: {
              sizeSmall: {
                color
              }
            }
          },
          MuiInputBase: {
            styleOverrides: {
                root: {
                    color
                }
            }
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                color
              }
            }
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                color
              }
            }
          },
          MuiInput: {
            styleOverrides: {
                color
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
                        <TimePicker onOpen={() => setChoosingDate(true)} onClose={() => setChoosingDate(false)} onAccept={treatPet} slotProps={{textField: { size: 'small' }}}/>
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