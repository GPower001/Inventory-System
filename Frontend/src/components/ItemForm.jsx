import React, { useState } from 'react';
import ItemDetails from './ItemDetails';
import StockInfo from './StockInfo';
import FileUpload from './FileUpload';
import DateInput from './DateInput';

const ItemForm = () => {
  const [item, setItem] = useState({
    itemName: '',
    category: '',
    units: '',
    itemCode: '',
    openingQuantity: '',
    atPrice: '',
    minStock: '',
    location: '',
    asOfDate: '2025-02-24', // Default date in YYYY-MM-DD format
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (file) => {
    setItem((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Item Details:', item);
    // Add API call or further processing here
  };

  return (
    <form onSubmit={handleSubmit}>
      <ItemDetails item={item} handleChange={handleChange} />
      {/* <FileUpload handleFileChange={handleFileChange} /> */}
      <StockInfo item={item} handleChange={handleChange} />
      <DateInput item={item} handleChange={handleChange} />
      <button type="submit" className="btn btn-primary mt-3" id='but'>
        Save Item
      </button>
    </form>
  );
};

export default ItemForm;