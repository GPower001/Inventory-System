import { existsSync, mkdirSync, appendFile } from 'fs';
import { join } from 'path';
import { format } from 'date-fns';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


// Get the current directory path (equivalent to __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure logs directory exists
const logDir = join(__dirname, '../../logs');
if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

export const logToFile = (message, level = 'error') => {
  const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
  
  // Daily log files (e.g., errors-2023-08-15.log)
  const logFile = join(logDir, `${level}s-${format(new Date(), 'yyyy-MM-dd')}.log`);
  
  appendFile(logFile, logMessage, (err) => {
    if (err) console.error('Failed to write to log file:', err);
  });
};

// For API errors (includes request context)
export const logApiError = (error, req) => {
  const context = {
    timestamp: new Date(),
    path: req.path,
    method: req.method,
    params: req.params,
    body: req.body,  // Note: Sanitize sensitive data in production!
    error: {
      message: error.message,
      stack: error.stack
    }
  };
  
  logToFile(JSON.stringify(context, null, 2));
};
