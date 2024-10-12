const { v4: uuidv4 } = require('uuid');

class sharedcommon {
  // Function to generate unique ID
  generateUniqueId() {
    return uuidv4();
  }

  // Timestamp
  generatetimestamp(){
    return new Date();
  }
}

module.exports = new sharedcommon();
