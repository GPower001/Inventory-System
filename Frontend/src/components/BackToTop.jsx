import React, {useState, useEffect} from 'react'
import './backtotop.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';

function BackToTop() {
    const [scroll, setScroll] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', () =>{
            setScroll(window.scrollY);
        });
        return () => {
            window.removeEventListener('scroll', () =>{
                setScroll(window.scrollY);
            });
        };
    }, [scroll]);
    
    const backToTop = () => {
        window.scrollTo(0, 0);
    };

  return (
        <a onClick={backToTop}
        className={`back-to-top d-flex align-items-center justify-content-center ${scroll > 100 ? 'active' : undefined}`}>
            <FontAwesomeIcon icon={faCircleArrowUp} className='font' />
        </a>
  )
}

export default BackToTop
