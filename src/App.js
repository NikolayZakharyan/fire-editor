import './App.css';
import React from 'react';
import RegisterYourCatForm from './components/RegisterForm';
import Readdata from './components/Readdata';

function App() {


  return (
    <div className="App">
      <div className="addSection">
        <RegisterYourCatForm />
      
      </div>
      <Readdata />
    </div>
  );
}

export default App;
