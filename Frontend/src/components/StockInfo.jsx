import React from 'react';

const StockInfo = ({ item, handleChange }) => {
  return (
    <div className="mb-4">
      <h3>Stock Information</h3>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Opening Quantity</label>
          <input
            type="number"
            className="form-control"
            name="openingQuantity"
            value={item.openingQuantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">At Price</label>
          <input
            type="number"
            className="form-control"
            name="atPrice"
            value={item.atPrice}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Min Stock To Maintain</label>
          <input
            type="number"
            className="form-control"
            name="minStock"
            value={item.minStock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={item.location}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default StockInfo;