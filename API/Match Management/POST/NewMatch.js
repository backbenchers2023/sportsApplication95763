const express = require('express');
const { OpenConnection, CloseConnection } = require('C:/Users/mersa/Desktop/Back_end/SportsApplication/DBManager/Connection.js');
const logger = require('../../../log');

const router = express.Router();

router.post('/NewMatch', async (req, res) => {

  const {end_time,match_id,result,score,start_time,status,team_a,team_b,tournament_id,venue} = req.body;

  // Define an array of required parameters
  const requiredParams = ['end_time', 'match_id', 'result', 'score', 'start_time', 'status', 'team_a', 'team_b', 'tournament_id', 'venue'];

  // Check if any required parameter is missing in req.body
  const missingParams = requiredParams.filter(param => !(param in req.body));

  if (missingParams.length > 0) {
    // Throw an error indicating missing parameters
    const missingParamsList = missingParams.join(', ');
    const errorMessage = `Missing ${missingParams.length} required parameter(s): ${missingParamsList}`;
    logger.error(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  const { 'Team A': teamAScore, 'Team B': teamBScore } = score;  // Nested destructuring with renaming

  const db = OpenConnection();

  try {
    await db.collection('matches').doc(match_id.toString()).set({
      end_time,
      match_id,
      result,
      score: { team_a: teamAScore, team_b: teamBScore },  // Store the nested object correctly
      start_time,
      status,
      team_a,
      team_b,
      tournament_id,
      venue
    });
    res.status(200).json({ message: 'Match details stored successfully' });
  } catch (err) {
    logger.error(err)
    res.status(500).json({ error: 'Failed to store match details' });
  } finally {
    CloseConnection();
  }
});

module.exports = router;
