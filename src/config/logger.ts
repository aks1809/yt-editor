import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import fs from 'fs';

// Function to remove log files older than a certain number of rotations
const cleanupOldLogFiles = () => {
  const logDir = 'logs'; // Adjust this to your log directory
  const maxRotationsToKeep = 5; // Keep logs from the latest 5 rotations

  const files = fs.readdirSync(logDir);
  const rotatedLogFiles = files.filter(file => file.startsWith('combined.') && file.endsWith('.log'));

  if (rotatedLogFiles.length > maxRotationsToKeep) {
    const filesToDelete = rotatedLogFiles.slice(0, rotatedLogFiles.length - maxRotationsToKeep);
    filesToDelete.forEach(file => {
      fs.unlinkSync(`${logDir}/${file}`);
    });
  }
};

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      level: 'error',
      filename: 'logs/error.log',
      maxSize: '5m',
      maxFiles: 10, // Keep the latest 10 rotated log files
      auditFile: 'logs/error-audit.json', // Store audit info for cleanup
      datePattern: 'YYYY-MM-DD',
    }),
    new DailyRotateFile({
      filename: 'logs/combined.log',
      maxSize: '5m',
      maxFiles: 10,
      auditFile: 'logs/combined-audit.json',
      datePattern: 'YYYY-MM-DD',
    }),
  ],
});

// Schedule the cleanup function to run periodically
setInterval(cleanupOldLogFiles, 24 * 60 * 60 * 1000); // Run every 24 hours

export default logger;
