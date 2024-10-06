const admin = require('firebase-admin');
const logger = require('../log');
let db;
let bucket;

function OpenConnection() {
  try {
    if (!admin.apps.length) { // Check if Firebase app is already initialized
      // Initialize Firebase Admin SDK
      const serviceAccount = {
        type: process.env.type,
        project_id: process.env.project_id,
        private_key_id: process.env.private_key_id,
        private_key: process.env.private_key.replace(/\\n/g, "\n"), // Replace escaped newlines with actual newlines
        client_x509_cert_url: process.env.client_x509_cert_url,
        client_email: process.env.client_email,
        client_id: process.env.client_id,
        auth_uri: process.env.auth_uri,
        token_uri: process.env.token_uri,
        auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
      };

      console.log(serviceAccount);
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
