import React from 'react';
import FileUpload from './Components/FileUpload.jsx';
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-content">
        <h1>Please Upload your File Below</h1>
        <FileUpload />
      </div>
      <Footer />
    </div>
  );
}

export default App;