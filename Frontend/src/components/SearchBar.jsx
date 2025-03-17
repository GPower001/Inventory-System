import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

import './searchbar.css'

function SearchBar() {
  return (
    <div className='search-bar'>
        <form className='search-form d-flex align-items-center' method='POST' action='#'>
          <input type='text' name='query' placeholder='Search' title='Enter search keyword'/>
          <button type='submit' title='Search'>
              <FontAwesomeIcon className='i' icon={faMagnifyingGlass} />
          </button>
        </form>
      
    </div>
  )
}

export default SearchBar
