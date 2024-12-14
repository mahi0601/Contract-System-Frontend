import React, { useState } from "react";

const EditContractModal = ({ contract, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: contract.name || "",
    status: contract.status || "",
    client_name: contract.client_name || "", // Include client_name
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(contract.id, formData); // Send updated data to the parent
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Contract</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Contract Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="Draft">Draft</option>
              <option value="Finalized">Finalized</option>
            </select>
          </div>
          <div>
            <label>Client Name:</label>
            <input
              type="text"
              name="client_name"
              value={formData.client_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditContractModal;
