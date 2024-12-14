import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContractsList = () => {
  const [contracts, setContracts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10); // Contracts per page
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/contracts', {
          params: { page, limit, search },
        });
        setContracts(response.data.contracts);
        setTotalPages(Math.ceil(response.data.totalCount / limit));
      } catch (error) {
        console.error('Error fetching contracts:', error);
      }
    };

    fetchContracts();
  }, [page, search, limit]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1 on search
  };

  return (
    <div>
      <h1>Contracts</h1>
      <input
        type="text"
        placeholder="Search by client name"
        value={search}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client Name</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => (
            <tr key={contract.id}>
              <td>{contract.id}</td>
              <td>{contract.client_name}</td>
              <td>{contract.status}</td>
              <td>{contract.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ContractsList;
