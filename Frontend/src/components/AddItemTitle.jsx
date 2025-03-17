import React from 'react'
import './Additemtitle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import './Additemtitle.css'

function AddItemTitle() {
    return (
      <div className='pagetitle'>
          <h1>Add Item</h1>
          <nav>
              <ol className='breadcrumb'>
                  <li className='breadcrumb-item'>
                      <a href='/'>
                        <FontAwesomeIcon icon={faClipboardList} />
                      </a>
                  </li>
                  <li className='breadcrumb-item'>Add Item</li>
              </ol>
          </nav>
      </div>
    )
  }
  export default AddItemTitle
  
