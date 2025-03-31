// utils/socket.js
import { getIO } from '../config/socket.js';

export const broadcastInventoryUpdate = () => {
  const io = getIO();
  io.emit('inventoryUpdate');
};