import TreatmentEntry from 'components/treatment-entry';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { TimePicker } from '@mui/x-date-pickers';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './style/treatment-cell.css';
import { useEffect, useState } from 'react';
import ClickOutsideAlerter from 'components/click-outside-alerter';

const TreatmentCell = ({ medicationName, dateStartOfDay, treatments, beforeIndicator, afterIndicator, clickOutside }) => {
    const [choosingDate, setChoosingDate] = useState(false);

    useEffect(() => setChoosingDate(clickOutside), [clickOutside]);

    const treatPet = (treatmentTime) => {
        const day = new Date(dateStartOfDay);
        const time = treatmentTime.$d;
        console.log(time, day);
        day.setUTCHours(time.getHours(), time.getUTCMinutes());
        console.log('Treat', day);
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
                {treatments.map(t => <TreatmentEntry date={t.dateTime} givenFlag={t.given} />)}
            </div>
            {afterIndicator && <BiChevronsRight/>}
        </div>
    )
}

export default TreatmentCell;