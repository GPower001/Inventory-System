// backend/utils/monitoring.js
import axios from 'axios';

export const notifyDevTeam = async (error) => {
  if (process.env.NODE_ENV === 'production') {
    try {
      await axios.post(process.env.SLACK_WEBHOOK_URL, {
        text: `🚨 Critical Error: ${error.message}\nPath: ${error.path || 'Unknown'}`,
      });
    } catch (e) {
      console.error('Monitoring notification failed:', e);
      throw e;
    }
  }
};