const express = require('express');
const { OpenConnection, CloseConnection } = require('../../../DBManager/Connection.js');
const Modules = require('../../../Modules/Common.js')
const logger = require('../../../log');

const router = express.Router();

router.post('/NewMatch', async (req, res) => {

  try {
    const { logo, team, user_id, venue, match_status, match_type, start_time, duration ,tournament_id = null } = req.body;

    const match_id = Modules.generateUniqueId()
    const timestamp = Modules.generatetimestamp()

    // Define an array of required parameters
    const requiredParams = [ 'logo', 'user_id', 'venue', 'match_status', 'match_type', 'start_time', 'duration'];

    // Check if any required parameter is missing in req.body
    const missingParams = requiredParams.filter(param => !(param in req.body));

    if (missingParams.length > 0) {
      // Throw an error indicating missing parameters
      const missingParamsList = missingParams.join(', '); // Returns a new string by concatenating all the elements in the array
      const errorMessage = `Missing ${missingParams.length} required parameter(s): ${missingParamsList}`;
      logger.error(errorMessage);
      return res.status(400).json({ error: errorMessage });
    }


    const db = OpenConnection();

    try {
      await db.collection('matches').doc("Match" + match_id.toString()).set({
        match_id,logo,team, user_id,venue,match_status,match_type,start_time,duration,tournament_id,timestamp
      });
      res.status(200).json({ message: 'Match details stored successfully' , Id : match_id});
    } catch (err) {
      logger.error(err)
      res.status(500).json({ error: 'Failed to store match details' });
    } finally {
      CloseConnection();
    }
  }
  catch (err) {
    logger.error(err)
    res.status(500).json({ error: 'Failed to store match details see the log file for more details' });
  }
});

module.exports = router;
