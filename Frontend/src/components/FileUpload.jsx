import React from 'react';

const FileUpload = ({ handleFileChange }) => {
  return (
    <div className="mb-4">
      <h3>Add Image</h3>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => handleFileChange(e.target.files[0])}
            accept="image/*"
          />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;