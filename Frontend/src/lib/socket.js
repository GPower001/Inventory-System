import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_BASE_URL, {
  path: '/socket.io',
  autoConnect: false
});

export default socket;