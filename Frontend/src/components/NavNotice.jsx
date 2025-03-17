import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
function NavNotice() {
  return (
   <li className='nav-item dropdown'>
    <a className='nav-link nav-icon' href='#' data-bs-toggle='dropdown'>
      <FontAwesomeIcon icon={faBell} className='i'/>
      <span className='badge bg-primary badge-number'>2</span>
    </a>
    <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications'>
      <li className='dropdown-header'>
        6 Products are out of stock
        <a href='#'>
          <span className='badge rounded-pill bg-primary p-2 ms-2'>
            View all
          </span>
        </a>
      </li>
      <li>
        <hr className='dropdown-divider'></hr>
      </li>
      <li className='notification-item'>
        <FontAwesomeIcon icon={faCircleExclamation} className='text-warning i' />
        <div>
          <h4>Expiration</h4>
          <p>Serum has expire</p>
          <p>20 min ago</p>
        </div>
      </li>
    </ul>

   </li>
  )
}

export default NavNotice
