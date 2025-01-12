import React, { useState } from 'react';
import './FileUploader.css';

function FileUploader({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      onUploadComplete();
    } catch (error) {
      setError(error.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="file-uploader">
      <label className="upload-label">
        <input
          type="file"
          onChange={handleUpload}
          disabled={uploading}
          className="file-input"
        />
        <div className="upload-content">
          <span className="upload-icon">📁</span>
          <span className="upload-text">
            {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
          </span>
        </div>
      </label>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default FileUploader;