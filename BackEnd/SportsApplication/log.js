const fs = require('fs');
const path = require('path');
const os = require('os');

// Define log directory based on whether the app is packaged or not
let logDir;
if (process.pkg) {
    // If running in pkg, use a temporary directory
    logDir = path.join(os.tmpdir(), 'SportsApplicationLogs');
} else {
    // If running normally, use the current directory
    logDir = path.join(__dirname, 'Logs'); // Or another directory of your choice
}

// Ensure the log directory exists
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true }); // Create the directory if it doesn't exist
}

// Define the log file paths
const errlogFilePath = path.join(logDir, 'errors.log');
const logfile = path.join(logDir, 'logger.log');

// Check if the log files exist and create them if they don't
if (!fs.existsSync(errlogFilePath)) {
    fs.writeFileSync(errlogFilePath, '// Error log file\n');
}

if (!fs.existsSync(logfile)) {
    fs.writeFileSync(logfile, '// Logger log file\n');
}

// Function to log an error
function error(err) {
    const timestamp = new Date().toISOString();
    const errorMessage = (err && err.stack) ? err.stack.toString() : (err ? err.toString() : 'Unknown error');
    const logMessage = `${timestamp} [${os.hostname()}] ${errorMessage}\n`;

    // Append error to the error log file
    fs.appendFileSync(errlogFilePath, logMessage, 'utf8');
}

// Function to log a message
function message(msg) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} [${os.hostname()}] ${msg}\n`;

    // Append message to the logger log file
    fs.appendFileSync(logfile, logMessage, 'utf8');
}

module.exports = { error, message };
