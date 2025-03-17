import React from 'react';

const DateInput = ({ item, handleChange }) => {
  return (
    <div className="mb-4">
      <h3>As Of Date</h3>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Select Date</label>
          <input
            type="date"
            className="form-control"
            name="asOfDate"
            value={item.asOfDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default DateInput;