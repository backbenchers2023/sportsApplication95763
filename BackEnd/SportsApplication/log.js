const fs = require('fs');
const path = require('path');
const os = require('os');

const errlogFilePath = path.join(__dirname, 'errors.log');
const logfile = path.join(__dirname,'logger.log');
// Check if the log file exists
if (!fs.existsSync(errlogFilePath)) {
    // If file does not exist, create it and write initial content
    fs.writeFileSync(errlogFilePath, '// Error log file\n');
}

if (!fs.existsSync(logfile)) {
    // If file does not exist, create it and write initial content
    fs.writeFileSync(logfile, '// Logger log file\n');
}

// Function to log an error
function error(err) {
    const timestamp = new Date().toISOString();
    const errorMessage = (err && err.stack) ? err.stack.toString() : (err ? err.toString() : 'Unknown error');
    const logMessage = `${timestamp} [${os.hostname()}] ${errorMessage}\n`;

    // Append error to the log file
    fs.appendFileSync(errlogFilePath, logMessage, 'utf8');
}

// Function to log an error
function message(err) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} [${os.hostname()}] ${err}\n`;

    // Append error to the log file
    fs.appendFileSync(logfile, logMessage, 'utf8');
}

module.exports = { error , message };
