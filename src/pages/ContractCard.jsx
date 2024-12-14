import React from 'react';

const ContractCard = ({ contract, onEdit, onDelete }) => {
  return (
    <div className="contract-card">
      <h3>{contract.client_name}</h3>
      <p>Status: {contract.status}</p>
      <p>Details: {contract.details}</p>
      <button onClick={() => onEdit(contract)}>Edit</button>
      <button onClick={() => onDelete(contract.id)}>Delete</button>
    </div>
  );
};

export default ContractCard;
