import React from 'react';
import ItemForm from './ItemForm';
import './main.css'
import AddItemTitle from './AddItemTitle'

const AddItemPage = () => {
  return (
    <div className="container mt-5" id='main'>
      <AddItemTitle/>
      {/* <h1>Add Item</h1> */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <a className="nav-link active" id='prod_tag' href="#">
            Product
          </a>
        </li>
      </ul>
      <ItemForm />
    </div>
  );
};

export default AddItemPage;