import { io } from 'socket.io-client';

const socket = io('http://localhost:5001'); // Backend WebSocket URL

// Export the socket instance for use in other components
export default socket;
