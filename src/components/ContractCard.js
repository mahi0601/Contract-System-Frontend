import React from 'react';

const ContractCard = ({ contract, onEdit, onDelete }) => {
  return (
    <div className="card">
      <div>
        <h4>{contract.client_name}</h4>
        <p>Status: <strong>{contract.status}</strong></p>
      </div>
      <div>
        <button className="secondary" onClick={() => onEdit(contract)}>Edit</button>
        <button className="danger" onClick={() => onDelete(contract.id)}>Delete</button>
      </div>
    </div>
  );
};

export default ContractCard;
