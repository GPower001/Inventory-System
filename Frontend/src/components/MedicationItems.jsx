import React from 'react'

function MedicationItems({item}) {
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
        <td>{item.category}</td>
        <td>{item.quant_in_stock}</td>
        <td className='fw-bold'>{item.sold}</td>
        <td>{item.status}</td>
    </tr>
  )
}

export default MedicationItems;
