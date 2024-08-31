const path = require('path');
const { OpenConnection } = require('../../DBManager/Connection');
const { bucket } = OpenConnection()
const logger = require('../../log')
const Modules = require('../../Modules/Common')

const Assets = async (req, res) => {
  try {

    const urls = {}  //used to store the image link
    const files = req.files;

    if (!files || files.length < 2) {
      return res.status(400).json({ error: 'Both team logos are required.' });
    }

    // Get the image from the files based on the index
    const logo = {
      'TeamALogo': files[0],
      'TeamBLogo': files[1]
    };

    // Upload the file to Firebase Storage
    for (const [index, file] of Object.entries(logo)) {
      const TeamId = Modules.generateUniqueId()

      const filePath = path.join('Logo', `${TeamId}.jpg`).replace(/\\/g, '/');
      console.log('Uploading to path:', filePath);

      const fileUpload = bucket.file(filePath);

      await fileUpload.save(file.buffer, {
        contentType: file.mimetype,
        metadata: { firebaseStorageDownloadTokens: '250' }
      });

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 15);  // 10 Days after from the uploaded date
      
      // Get the download URL
      const [url] = await fileUpload.getSignedUrl({
        action: 'read',
        expires:  expirationDate
      });

      urls[index] = {
        "TeamAid": TeamId,
        "url": url
      }; // Storing both ID and URL for each file

      console.log(`${TeamId} uploaded and URL generated successfully.`);
    }

    return res.status(200).json({ url: urls });
  } catch (error) {
    logger.error(error);
    res.status(500).send('Error uploading profile picture.');
  }
};


module.exports = Assets;