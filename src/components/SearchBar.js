import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [clientName, setClientName] = useState('');
  const [status, setStatus] = useState('');

  const handleSearch = () => {
    onSearch({ client_name: clientName, status });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Client Name"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All</option>
        <option value="Draft">Draft</option>
        <option value="Finalized">Finalized</option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
