import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Contract Management</h1>
      <div>
        <button className="secondary" onClick={() => window.location.href = '/add'}>
          Add New Contract
        </button>
      </div>
    </div>
  );
};

export default Navbar;
