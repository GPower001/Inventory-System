import React from 'react';

const ItemDetails = ({ item, handleChange }) => {
  return (
    <div className="mb-4">
      <h3>Item Details</h3>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Item Name*</label>
          <input
            type="text"
            className="form-control"
            name="itemName"
            value={item.itemName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="category"
            value={item.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Medication">Medication</option>
            <option value="Consumables">Consumables</option>
            <option value="General">General</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Select Units</label>
          <select
            className="form-select"
            name="units"
            value={item.units}
            onChange={handleChange}
            required
          >
            <option value="">Select Units</option>
            <option value="Pieces">Pieces</option>
            <option value="Kg">Kg</option>
            <option value="Liters">Liters</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Item Code</label>
          <input
            type="text"
            className="form-control"
            name="itemCode"
            value={item.itemCode}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;