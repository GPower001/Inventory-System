import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons"
import './logo.css'

function Logo() {
    const handleToggleSideBar =() => {
        document.body.classList.toggle('toggle-sidebar')
    }
  return (
    <div className='d-flex align-items-center justify-content-between'>
        <a href='/' className='logo d-flex align-items-center'>
            {/* <img src='' alt=''/> */}
            <span className='d-none d-lg-block'>Inventory</span>
        </a>
        <FontAwesomeIcon icon={faBars} className='toggle-side-btn' onClick={handleToggleSideBar} />  
    </div>
  )
}

export default Logo
