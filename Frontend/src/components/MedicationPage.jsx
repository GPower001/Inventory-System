import React, {useState, useEffect} from 'react'
import './Topselling.css'
import './main.css'
import MedicationItems from './MedicationItems';

function MedicationPage() {
    const [items, setItems] = useState([])
    const [filter, setFilter] = useState('Today');
    const handleFilterChange = filter => {
        setFilter(filter);
    };

    const fetchData = () =>{
        fetch('http://localhost:5000/medications')
            .then(res => res.json())
            .then(data => {
                setItems(data);
            })
            .catch(e => console.log(e.message));
    };
    useEffect(() =>{
        fetchData();
    }, []);

  return (
    <div className='card top-selling overflow-auto' id='main'>
        <div className='card-body pb-0'>
            <h5 className='card-title'>
                Medications
            </h5>
            <table className='table table-borderless'>
                <thead className='table-light'>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>category</th>
                        <th scope='col'>Quantity in stock</th>
                        <th scope='col'>Sold</th>
                        <th scope='col'>status</th>
                    </tr>
                </thead>
                <tbody>
                    {items &&
                        items.length > 0 && 
                        items.map(item => <MedicationItems key={item._id} item={item}/>)}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default MedicationPage
