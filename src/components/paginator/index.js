import { MdSkipPrevious, MdSkipNext, MdArrowBack, MdArrowForward } from 'react-icons/md';


import './style/paginator.css';


const Paginator = ({firstDayDate, setDateCallback}) => {

    return (
        <div id='paginator'>
            <div className='week-day-nav'>
                <MdSkipPrevious onClick={() => setDateCallback(-7)}/>
                <MdArrowBack onClick={() => setDateCallback(-1)}/>
            </div>
            <div id='date-info'>{`${firstDayDate.toDateString()}`}</div>
            <div className='week-day-nav'>
                <MdArrowForward onClick={() => setDateCallback(1)}/>
                <MdSkipNext onClick={() => setDateCallback(7)}/>
            </div>
        </div>
    );
};

export default Paginator;