const admin = require('firebase-admin');
const logger = require('../log');

function OpenConnection() {
  try {
    // Parse the service account from the environment variable
    const input = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    
    // Create the serviceAccount object using properties from input
    const serviceAccount = {
      type: input.type,
      project_id: input.project_id,
      private_key_id: input.private_key_id,
      private_key: input.private_key,
      client_email: input.client_email,
      client_id: input.client_id,
      auth_uri: input.auth_uri,
      token_uri: input.token_uri,
      auth_provider_x509_cert_url: input.auth_provider_x509_cert_url,
      client_x509_cert_url: input.client_x509_cert_url,
      universe_domain: input.universe_domain,
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
