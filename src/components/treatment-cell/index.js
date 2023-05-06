import TreatmentEntry from 'components/treatment-entry';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';

import './style/treatment-cell.css';
import { useEffect, useState } from 'react';
import ClickOutsideAlerter from 'components/click-outside-alerter';



const TreatmentCell = ({ treatments, beforeIndicator, afterIndicator, clickOutside }) => {
    const [choosingDate, setChoosingDate] = useState(false);

    useEffect(() => setChoosingDate(clickOutside), [clickOutside]);

    return (
        <div className='treatment-cell'>
            {beforeIndicator && <BiChevronsLeft/>}
            <ClickOutsideAlerter callback={() => setChoosingDate(false)}>
                <div className='add-treatment-entry'>
                    <input className='add-treatment-input' type='time' style={{display: choosingDate ? 'unset': 'none'}}/>
                    <div className='add-treatment-button' style={{display: choosingDate ? 'none': 'unset'}} onClick={() => setChoosingDate(!choosingDate)}>
                        <AiOutlinePlusCircle/>
                    </div>
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