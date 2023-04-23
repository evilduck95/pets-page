import { useRef, useEffect } from 'react';


const _useOutsideAlerter = (ref, callback) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if(ref.current && !ref.current.contains(event.target)) {
                console.log('Clicked Outside!');
                callback();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
};

const ClickOutsideAlerter = (props) => {
    console.log(props);
    const wrapperRef = useRef(null);
    _useOutsideAlerter(wrapperRef, props.callback);
    return (
        <div ref={wrapperRef}>{props.children}</div>
    )
};

export default ClickOutsideAlerter;