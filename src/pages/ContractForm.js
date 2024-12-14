import React, { useState } from 'react';
import { createContract } from '../services/api';
import Navbar from '../components/Navbar';

const ContractForm = () => {
  const [clientName, setClientName] = useState('');
  const [status, setStatus] = useState('Draft');
  const [contractData, setContractData] = useState(''); // Now treated as a normal string

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contractData.trim()) {
      alert('Contract Details cannot be empty. Please provide details.');
      return;
    }

    try {
      // Send the contract to the API
      await createContract({
        client_name: clientName,
        status,
        details: contractData, // Pass details as a plain string
      });
      alert('Contract saved successfully!');
      window.location.href = '/'; // Redirect to the main page
    } catch (error) {
      console.error('Error creating contract:', error.response?.data || error.message);
      alert('Failed to save the contract. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Add New Contract</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Draft">Draft</option>
            <option value="Finalized">Finalized</option>
          </select>
          <textarea
            placeholder="Contract Details (Plain Text)"
            value={contractData}
            onChange={(e) => setContractData(e.target.value)}
            required
          ></textarea>
          <button type="submit">Save Contract</button>
        </form>
      </div>
    </div>
  );
};

export default ContractForm;
