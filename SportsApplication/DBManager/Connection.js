const admin = require('firebase-admin');
const logger = require('../log');
let db;
let bucket;

function OpenConnection() {
  try {
    if (!admin.apps.length) { // Check if Firebase app is already initialized
      // Initialize Firebase Admin SDK
      const serviceAccount = {
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"), // Replace escaped newlines with actual newlines
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
      };

      console.log(serviceAccount);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
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
