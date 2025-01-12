import React from 'react';
import './FileList.css';

function FileList({ files }) {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (files.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">📂</span>
        <h3>No files uploaded yet</h3>
        <p>Upload a file to get started</p>
      </div>
    );
  }

  return (
    <div className="file-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Uploaded</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id}>
              <td className="file-name">
                <span className="file-icon">📄</span>
                {file.name}
              </td>
              <td>{formatFileSize(file.size)}</td>
              <td>{new Date(file.uploaded_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FileList;