import React from 'react'
import './pageTitle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

function PageTitle({page}) {
  return (
    <div className='pagetitle'>
        <h1>{page}</h1>
        <nav>
            <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                    <a href='/'>
                        <FontAwesomeIcon icon={faHome} className='home'/>
                    </a>
                </li>
                <li className='breadcrumb-item'>{page}</li>
            </ol>
        </nav>
    </div>
  )
}

export default PageTitle
