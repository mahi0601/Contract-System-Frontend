import React, { useEffect, useState } from "react";
import { fetchContracts, deleteContract, updateContract } from "../services/api";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import ContractCard from "../components/ContractCard";
import EditContractModal from "../components/EditContractModel";

const HomePage = () => {
  const [contracts, setContracts] = useState([]);
  const [editingContract, setEditingContract] = useState(null); // Track contract being edited
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [limit] = useState(10); // Number of contracts per page
  const [search, setSearch] = useState(""); // Search input

  const loadContracts = async (params = {}) => {
    try {
      const { data } = await fetchContracts({ ...params, page, limit, search });
      setContracts(data.contracts); // Update contracts list
      setTotalPages(Math.ceil(data.totalCount / limit)); // Calculate total pages
    } catch (error) {
      console.error("Error loading contracts:", error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contract?")) {
      try {
        await deleteContract(id);
        loadContracts(); // Refresh contracts after deletion
      } catch (error) {
        console.error("Error deleting contract:", error.message);
        alert("Failed to delete the contract.");
      }
    }
  };

  const handleEdit = (contract) => {
    setEditingContract(contract); // Open the edit modal with contract details
  };

  const handleSave = async (id, updatedFields) => {
    try {
      await updateContract(id, updatedFields); // Update the contract via API
      await loadContracts(); // Refresh the contracts list
      alert("Contract updated successfully!");
      setEditingContract(null); // Close the modal
    } catch (error) {
      console.error("Error updating contract:", error.message);
      alert("Failed to update the contract.");
    }
  };

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
    setPage(1); // Reset to first page on new search
    loadContracts({ search: searchValue });
  };

  useEffect(() => {
    loadContracts();
  }, [page, search]); // Re-fetch data when page or search changes

  return (
    <div>
      <Navbar />
      <div className="container">
        <SearchBar onSearch={handleSearch} />
        {contracts.length > 0 ? (
          <>
            {contracts.map((contract) => (
              <ContractCard
                key={contract.id}
                contract={contract}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
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
          </>
        ) : (
          <p>No contracts available. Try adding one!</p>
        )}
      </div>
      {editingContract && (
        <EditContractModal
          contract={editingContract}
          onSave={handleSave}
          onClose={() => setEditingContract(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
