import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContractForm from './pages/ContractForm';
import ContractsPage from './pages/ContractPage';
import ContractEdit from './pages/ContractEdit';
import './assets/styles.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<ContractForm />} />
        <Route path="/real-time" element={<ContractsPage />} />
        <Route path="/contracts/edit/:id" element={<ContractEdit />} />
      </Routes>
    </Router>
    
  );
};

export default App;
