import { MdSkipPrevious, MdSkipNext, MdArrowBack, MdArrowForward } from 'react-icons/md';

import './style/paginator.css';

export const WEEK_MILLIS = 604800000;
export const DAY_MILLIS = 86400000;


const Paginator = ({firstDayDate, setDateCallback}) => {

    return (
        <div id='paginator'>
            <div className='week-day-nav'>
                <MdSkipPrevious onClick={() => setDateCallback(-WEEK_MILLIS)}/>
                <MdArrowBack onClick={() => setDateCallback(-DAY_MILLIS)}/>
            </div>
            <div id='date-info'>{`${firstDayDate.toDateString()}`}</div>
            <div className='week-day-nav'>
                <MdArrowForward onClick={() => setDateCallback(DAY_MILLIS)}/>
                <MdSkipNext onClick={() => setDateCallback(WEEK_MILLIS)}/>
            </div>
        </div>
    );
};

export default Paginator;