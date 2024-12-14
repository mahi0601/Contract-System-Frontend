import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3000');

const ContractsPage = () => {
  const [contracts, setContracts] = useState([]); // Default to an empty array
  const [updatedId, setUpdatedId] = useState(null); // Track the updated contract ID

  // Fetch contracts from the backend
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/contracts');
        console.log('API Response:', response.data); // Log response to debug
        setContracts(response.data.contracts || []); // Adjust for API response structure
      } catch (error) {
        console.error('Error fetching contracts:', error);
        setContracts([]); // Fallback to empty array
      }
    };

    fetchContracts();
  }, []);

  // Listen for real-time updates
  useEffect(() => {
    socket.on('contractUpdated', (updatedContract) => {
      setUpdatedId(updatedContract.id); // Set the updated contract ID
      setContracts((prevContracts) =>
        prevContracts.map((contract) =>
          contract.id === updatedContract.id ? updatedContract : contract
        )
      );
    });

    return () => {
      socket.off('contractUpdated');
    };
  }, []);

  // Inline styles for animations
  const styles = {
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    th: {
      border: '1px solid #ddd',
      padding: '8px',
      textAlign: 'left',
      backgroundColor: '#f4f4f4',
    },
    td: {
      border: '1px solid #ddd',
      padding: '8px',
      textAlign: 'left',
    },
    fadeIn: {
      animation: 'fadeIn 0.5s ease-in-out',
    },
    highlight: {
      animation: 'highlight 1.5s ease-in-out',
    },
    keyframes: `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes highlight {
        from {
          background-color: #ffeb3b;
        }
        to {
          background-color: transparent;
        }
      }
    `,
  };

  return (
    <div>
      <style>{styles.keyframes}</style> {/* Inject keyframes into the document */}
      <h1>Contracts</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Client Name</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => (
            <tr
              key={contract.id}
              style={
                updatedId === contract.id
                  ? { ...styles.td, ...styles.highlight }
                  : styles.td
              }
              onAnimationEnd={() => setUpdatedId(null)} // Remove highlight after animation
            >
              <td>{contract.id}</td>
              <td>{contract.client_name}</td>
              <td>{contract.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractsPage;
