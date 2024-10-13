const admin = require('firebase-admin');
const logger = require('../log');
const fs = require('fs'); 
let db;
let bucket;

function OpenConnection() {
  try {
    const serviceAccount = JSON.parse(fs.readFileSync('/etc/secrets/serviceAccountKey.json', 'utf8'));
    if (!admin.apps.length) { // Check if Firebase app is already initialized
      // Initialize Firebase Admin SDK
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://sportsapplication2024-d4ee5.firebaseio.com",
        storageBucket: 'sportsapplication2024-d4ee5.appspot.com'
      });

      db = admin.firestore();  // Initialize Firestore
      bucket = admin.storage().bucket();  // Initialize Storage Bucket

      logger.message("Connection Established successfully");
    }
    return { db, bucket }; // Return both db and bucket
  } catch (err) {
    logger.error(err);
    throw err; // Re-throw the error for further handling
  }
}

function CloseConnection() {
  if (admin.apps.length) { // Check if there are initialized Firebase apps
    admin.app().delete().then(() => { // Delete the Firebase app instance
      logger.message('Connection to Firebase closed.');
    }).catch((error) => {
      logger.error(error); // Log any errors during deletion
      console.error('Error closing Firebase connection:', error);
    });
  }
}

module.exports = { OpenConnection, CloseConnection };
