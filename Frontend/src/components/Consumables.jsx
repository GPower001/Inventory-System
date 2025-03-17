import React from 'react'

function Consumables({item}) {
  return (
    <tr>
        {/* <th scope='row'>  
            <a href='#'>
                <img src={item._id} alt=''/>
            </a>
        </th>*/} 
        <td>
            <a href='#' className='text-primary fw-bold'>
                {item.name}
            </a>
        </td>
        <td>{item.quant_in_stock}</td>
        <td>{item.status}</td>
    </tr>
  )
}

export default Consumables;
