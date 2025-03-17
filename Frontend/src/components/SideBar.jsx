import React from 'react'
import './Sidebar.css'
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faHouse, faBoxesStacked, faPrescriptionBottleMedical, faTrashCan, faWrench, faChartLine, faClipboardList } from "@fortawesome/free-solid-svg-icons"

function SideBar() {
  return (
   <aside id='sidebar' className='sidebar'>
        <ul className='sidebar-nav' id='sidebar-nav'>
            <li className='nav-item'>
                <a className='nav-link'>
                    <FontAwesomeIcon icon={ faHouse } className='i'/>
                    <Link to='/' className='dash'><span>Dashboard</span></Link>
                </a>
            </li>
            <li className='nav-item'>
                <a className=' nav-link collapsed' href='/'>
                    <FontAwesomeIcon icon={faClipboardList} className='i'/>
                    <Link to='Add_Item' className='dash'><span>Add Items</span></Link>
                </a>
            </li>
            <li className='nav-item'>
                <a className='nav-link collapsed' data-bs-target='#components-nav' data-bs-toggle='collapse' href='#'>
                    <FontAwesomeIcon icon={faBoxesStacked} className='i'/>
                    <span>Inventory Items</span>
                </a>
                <ul id='components-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>
                    <li>
                        <a className='nav-link collapsed'>
                            <FontAwesomeIcon icon={faPrescriptionBottleMedical} className='i'/>
                            <Link to='medication' className='dash'><span>Medications</span></Link>
                        </a>
                    </li>
                    <li>
                        <a className='nav-link collapsed'>
                            <FontAwesomeIcon icon={faTrashCan} className='i' />
                            <Link to='consumables' className='dash'><span>Consumables</span></Link>
                        </a>
                    </li>
                    <li>
                        <a className='nav-link collapsed'>
                            <FontAwesomeIcon icon={faWrench} className='i' />
                            <Link to ='Generals' className='dash'><span >Generals</span></Link>
                        </a>
                    </li>
                </ul>
            </li>
            <li className='nav-item'>
                <a className=' nav-link collapsed' href='/'>
                    <FontAwesomeIcon icon={ faChartLine } className='i'/>
                    <span>Report</span>
                </a>
            </li>
            <li className='nav-item setting'>
                <a className='nav-link collapsed' href='/'>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className='i'/>
                    <span>Sign  Out</span>
                </a>
            </li>
        </ul>
        <Outlet/>
    </aside>
  )
}

export default SideBar
