const fs = require('fs');
const path = require('path');
const os = require('os');

const logFilePath = path.join(__dirname, 'errors.log');

// Check if the log file exists
if (!fs.existsSync(logFilePath)) {
    // If file does not exist, create it and write initial content
    fs.writeFileSync(logFilePath, '// Error log file\n');
}

// Function to log an error
function error(err) {
    const timestamp = new Date().toISOString();
    const errorMessage = (err && err.stack) ? err.stack.toString() : (err ? err.toString() : 'Unknown error');
    const logMessage = `${timestamp} [${os.hostname()}] ${errorMessage}\n`;

    // Append error to the log file
    fs.appendFileSync(logFilePath, logMessage, 'utf8');
}

module.exports = { error };
