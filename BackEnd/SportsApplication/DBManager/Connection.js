const admin = require('firebase-admin');
const logger = require('../log');

function OpenConnection() {
  try {
    // Parse the service account from the environment variable
    const input = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    
    // Create the serviceAccount object using properties from input
    const serviceAccount = {
      type: 'service_account',
      project_id: process.env.project_id,
      private_key_id: process.env.private_key_id,
      private_key: process.env.private_key.replace(/\\n/g, '\n'), // Replace escaped newline with actual newline
      client_email: process.env.client_email,
      client_id: process.env.client_id,
      auth_uri: process.env.auth_uri,
      token_uri: process.env.token_uri,
      auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
      client_x509_cert_url: process.env.client_x509_cert_url,
      universe_domain: process.env.universe_domain, // Add a default if needed
    };


    if (!admin.apps.length) { // Check if Firebase app is already initialized
      // Initialize Firebase Admin SDK
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://sportsapplication2024-d4ee5.firebaseio.com",
        storageBucket: 'sportsapplication2024-d4ee5.appspot.com'
      });

      logger.message("Connection Established successfully");
    }
    
    return { db: admin.firestore(), bucket: admin.storage().bucket() }; // Return db and bucket
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
