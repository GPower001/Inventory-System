import React from 'react'
import './AdditemMain.css'
import AddItemTitle from './AddItemTitle'
import AddItem from './AddItem'

function AddItemMain() {
  return (
    <main id='main' className='main'>
        <AddItemTitle page='Add Item'/>
        <AddItem/>
    </main>
  )
}

export default AddItemMain