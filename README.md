# Contract Management System

A full-stack application for managing contracts with features to upload, edit, search, and filter contracts. It also includes real-time updates using WebSocket.

---

## Features

### Frontend
- Upload contract data (text or JSON format).
- View a list of uploaded contracts with their status (Draft, Finalized).
- Search and filter contracts by:
  - Status
  - Client Name
  - Contract ID
- Edit contract details and save changes.

### Backend
- API to handle:
  - Uploading contract data and storing it in a PostgreSQL database.
  - Searching contracts with:
    - Filters (status, client name).
    - Pagination for results.
  - Updating contract details (e.g., status, fields).
  - Deleting contracts.
- Real-time updates for contract status changes using WebSocket/Socket.IO.

### Database
- PostgreSQL database for contract storage, optimized for filtering and querying.

---

## Technology Stack
- **Frontend**: React.js
- **Backend**: Node.js
- **Database**: PostgreSQL
- **Real-Time Updates**: WebSocket (Socket.IO)

---

## API Documentation

### Base URL
`http://localhost:<PORT>` (e.g., `http://localhost:5003`)

### Endpoints

#### **1. Upload Contract**
- **URL**: `/api/contracts/upload`
- **Method**: `POST`
- **Description**: Upload contract data.
- **Body**:
  ```json
  {
    "client_name": "Client Name",
    "status": "Draft",
    "details": "Contract details..."
  }
