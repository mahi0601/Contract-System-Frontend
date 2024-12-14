import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getContract, updateContract } from '../services/api';
import Navbar from '../components/Navbar';
const ContractEdit = () => {
    const { id } = useParams(); // Ensure 'id' is correctly extracted
// Get the contract ID from the URL
    const navigate = useNavigate(); // Navigate after saving
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [clientName, setClientName] = useState('');
    const [status, setStatus] = useState('Draft'); // Default status
    const [details, setDetails] = useState('');
  
    // Fetch contract details on component mount
    useEffect(() => {
      const fetchContract = async () => {
        try {
          const data = await getContract(id);
          setClientName(data.client_name || '');
          setStatus(data.status || 'Draft');
          setDetails(data.details || '');
        } catch (error) {
          console.error('Error fetching contract:', error.message);
          alert('Failed to load contract details.');
        } finally {
          setIsLoading(false); // Ensure loading ends
        }
      };
  
      fetchContract();
    }, [id]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await updateContract(id, {
          client_name: clientName,
          status,
          details,
        });
        alert('Contract updated successfully!');
        navigate('/'); // Redirect to the homepage
      } catch (error) {
        console.error('Error updating contract:', error.message);
        alert('Failed to update contract. Please try again.');
      }
    };
  
    if (isLoading) {
      return <p>Loading contract details...</p>;
    }
  
    return (
      <div>
        <Navbar />
        <div className="container">
          <h2>Edit Contract</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Client Name"
              required
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Draft">Draft</option>
              <option value="Finalized">Finalized</option>
            </select>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Contract Details"
            />
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default ContractEdit;
  