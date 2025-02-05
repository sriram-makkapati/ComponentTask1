import React, { useState } from 'react';
import axios from 'axios';

// File Upload Process
const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  // Handle changes in file input element
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Please upload a valid CSV file.');
    }
  };

  // Handle file upload process to server
  const handleUpload = async () => {
    if (!file) {
      setError('No file selected or invalid file type.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setData(response.data);
      setError('');
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Error uploading file. Please try again.');
    }
  };

  // Handle changes in an input field 
  const handleInputChange = (e, index, field) => {
    const newData = [...data];
    newData[index][field] = e.target.value;
    setData(newData);
  };

  // Save data to server
  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:5000/update', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Data saved:', response.data);
      setError('');
    } catch (error) {
      console.error('Error saving data:', error);
      setError('Error saving data. Please try again.');
    }
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p className="error">{error}</p>}
      {data && (
        <div>
          <h3>Uploaded File:</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Year</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => handleInputChange(e, index, 'name')}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.age}
                      onChange={(e) => handleInputChange(e, index, 'age')}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.year}
                      onChange={(e) => handleInputChange(e, index, 'year')}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.phone}
                      onChange={(e) => handleInputChange(e, index, 'phone')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;