import React, { useState, useEffect } from 'react';
import FileUploader from './components/FileUploader';
import FileList from './components/FileList';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await fetch('http://localhost:3001/files');
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error('Failed to fetch files:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>File Storage System</h1>
          <p>Upload and manage your files securely</p>
        </header>
        <div className="upload-section">
          <FileUploader onUploadComplete={fetchFiles} />
        </div>
        <div className="files-section">
          <FileList files={files} />
        </div>
      </div>
    </div>
  );
}

export default App;