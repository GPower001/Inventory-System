import React, { useState } from 'react'
import './Sidebar.css'
import { Link, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faArrowRightFromBracket, 
  faHouse, 
  faBoxesStacked, 
  faPrescriptionBottleMedical, 
  faTrashCan, 
  faWrench, 
  faChartLine, 
  faClipboardList,
  faBars
} from "@fortawesome/free-solid-svg-icons"

function SideBar() {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleInventory = (e) => {
    e.preventDefault();
    setIsInventoryOpen(!isInventoryOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button 
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-teal-600 text-white"
        onClick={toggleMobileMenu}
      >
        <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
      </button>

      {/* Sidebar/Mobile Navigation */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <nav className="h-full">
          <ul className='sidebar-nav' id='sidebar-nav'>
            <li className='nav-item'>
              <Link to='/' className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faHouse} className='nav-icon'/>
                <span>Dashboard</span>
              </Link>
            </li>
            
            <li className='nav-item'>
              <Link to='/Add_Item' className={`nav-link ${isActive('/Add_Item') ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faClipboardList} className='nav-icon'/>
                <span>Add Items</span>
              </Link>
            </li>

            <li className='nav-item'>
              <a 
                className={`nav-link ${isInventoryOpen ? 'active' : ''}`} 
                href="#" 
                onClick={toggleInventory}
              >
                <FontAwesomeIcon icon={faBoxesStacked} className='nav-icon'/>
                <span>Inventory Items</span>
                <span className="ml-auto transform transition-transform duration-200">
                  ▼
                </span>
              </a>
              <ul className={`nav-content ${isInventoryOpen ? 'show' : ''}`}>
                <li>
                  <Link to='/medication' className={`sub-nav-link ${isActive('/medication') ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faPrescriptionBottleMedical} className='nav-icon'/>
                    <span>Medications</span>
                  </Link>
                </li>
                <li>
                  <Link to='/consumables' className={`sub-nav-link ${isActive('/consumables') ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faTrashCan} className='nav-icon'/>
                    <span>Consumables</span>
                  </Link>
                </li>
                <li>
                  <Link to='/Generals' className={`sub-nav-link ${isActive('/Generals') ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faWrench} className='nav-icon'/>
                    <span>Generals</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li className='nav-item'>
              <Link to='/report' className={`nav-link ${isActive('/report') ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faChartLine} className='nav-icon'/>
                <span>Report</span>
              </Link>
            </li>

            <li className='nav-item sign-out'>
              <Link to='/logout' className="nav-link">
                <FontAwesomeIcon icon={faArrowRightFromBracket} className='nav-icon'/>
                <span>Sign Out</span>
              </Link>
            </li>
          </ul>
        </nav>
        <Outlet/>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="mobile-nav">
        <Link to="/" className={`mobile-nav-item ${isActive('/') ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faHouse} />
          <span>Home</span>
        </Link>
        <Link to="/Add_Item" className={`mobile-nav-item ${isActive('/Add_Item') ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faClipboardList} />
          <span>Add</span>
        </Link>
        <Link to="/inventory" className={`mobile-nav-item ${location.pathname.includes('/inventory') ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faBoxesStacked} />
          <span>Items</span>
        </Link>
        <Link to="/report" className={`mobile-nav-item ${isActive('/report') ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faChartLine} />
          <span>Report</span>
        </Link>
      </div>
    </>
  );
}

export default SideBar
