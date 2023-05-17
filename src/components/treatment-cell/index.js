import TreatmentEntry from 'components/treatment-entry';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { TimePicker } from '@mui/x-date-pickers';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import ClickOutsideAlerter from 'components/click-outside-alerter';
import { addTreatment } from 'utils/pet-api';


import './style/treatment-cell.css';


const TreatmentCell = ({ medicationName, dateStartOfDay, treatments, beforeIndicator, afterIndicator, clickOutside }) => {
    const [choosingDate, setChoosingDate] = useState(false);

    useEffect(() => setChoosingDate(clickOutside), [clickOutside]);
    const [searchParams, _] = useSearchParams();
    const petName = searchParams.get("name");

    const treatPet = (treatmentTimeToday) => {
      console.log('Cell Date', dateStartOfDay);
        const day = new Date(dateStartOfDay);
        const time = treatmentTimeToday.$d;
        console.log(time, day);
        day.setUTCHours(time.getUTCHours(), time.getUTCMinutes(), 0, 0);
        console.log('Treat', day);
        addTreatment(petName, medicationName, day, res => console.log(res));
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
                        <TimePicker onAccept={treatPet} slotProps={{textField: { size: 'small' }}}/>
                    </ThemeProvider>
                </div>
            </ClickOutsideAlerter>
            <div className="treatment-list">
                {treatments.map(t => <TreatmentEntry treatmentId={t.id} date={t.dateTime} givenFlag={t.given}/>)}
            </div>
            {afterIndicator && <BiChevronsRight/>}
        </div>
    )
}

export default TreatmentCell;