import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCircleExclamation, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"

function NavAvatar() {
  return (
    <li className='nav-item dropdown pe-3'>
      <a className='nav-link nav-profile d-flex align-item-center pe-0' href='#' data-bs-toggle='dropdown'>
        <img src={'Pics_woman2.jpg'} alt='Profile' className='rounded-circle'/>
        <span className='d-none d-md-block dropdown-toggle ps-2'>Nurse</span>
      </a>
      <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow profile'>
        <li className='dropdown-header'>
          <h4>Nr. Taiwo</h4>
          <span>Nurse</span>
        </li>
        <li>
          <hr className='dropdown-divider'></hr>
        </li>
        <li>
          <a className='dropdown-item d-flex align-items-center' href='#'>
           <FontAwesomeIcon icon={faArrowRightFromBracket} className='i'/>
           <span>Sign Out</span>
          </a>
        </li>
      </ul>
    </li>
  )
}

export default NavAvatar
