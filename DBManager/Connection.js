const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

let db;  

function OpenConnection() {
  if (!admin.apps.length) { // Check if any Firebase app instances are already initializedś
    // Initialize Firebase Admin SDK
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://sportsapplication2024-d4ee5.firebaseio.com"
    });
    db = admin.firestore();  // Initialize Firestore and store the instance in the `db` variable
    console.log("Connection Established successfully");
  }
  return db;
}

function CloseConnection(){
  if (!admin.apps.length) {
    admin.app().delete().then(() => { // Delete the Firebase app instance
      console.log('Connection to Firebase closed.');
    }).catch((error) => { // Catch and log any errors during deletion
      console.error('Error closing Firebase connection:', error);
    });
  }
}

module.exports = { OpenConnection, CloseConnection };
