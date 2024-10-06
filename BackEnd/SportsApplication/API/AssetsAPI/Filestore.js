const { OpenConnection, CloseConnection } = require('../../DBManager/Connection');
const { bucket } = OpenConnection();
const logger = require('../../log');
const Modules = require('../../Modules/Common');
const path = require('path');  // Make sure to include 'path'

const filestore = async (req, res) => {
    try {
        const urls = [];
        const files = req.files;  // Expecting multiple files from req.files
        const foldername = req.query.foldername

        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'Images are required.' });
        }

        // Loop through each file
        for (const [index, file] of files.entries()) {  // Use files.entries() to iterate
            const imageid = Modules.generateUniqueId();  // Generate a unique ID for each image
            const filePath = path.join(foldername, `${imageid}.jpg`).replace(/\\/g, '/');  // Path for the file
            
             logger.message('Uploading to path:', filePath);

            const fileUpload = bucket.file(filePath);

            // Upload the file to Firebase Storage
            await fileUpload.save(file.buffer, {
                contentType: file.mimetype,  // MIME type of the file
                metadata: { firebaseStorageDownloadTokens: '250' }  // Custom metadata
            });

            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 15);  // Set expiration to 15 days later

            // Generate the download URL with a signed token
            const [url] = await fileUpload.getSignedUrl({
                action: 'read',
                expires: expirationDate
            });

            // Store the URL in the response array
            urls.push({
                "url": url
            });

             logger.message(`File ${imageid} uploaded and URL generated successfully.`);
        }

        // Return the array of URLs to the client
        res.status(200).json({ urls });

    } catch (error) {
        logger.error(error);
        res.status(500).send('Error uploading files.');
    } finally {
        CloseConnection();
    }
}

module.exports = filestore;
