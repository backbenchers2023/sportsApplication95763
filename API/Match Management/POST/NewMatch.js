const express = require('express');
const bodyParser = require('body-parser');
const { openConnection, closeConnection } = require('../../../DBManager/Connection');


const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/match/post', async (req, res) => {
  const {
    end_time,
    match_id,
    result,
    score, 
    start_time,
    status,
    team_a,
    team_b,
    tournament_id,
    venue
  } = req.body;

  const { 'Team A': teamAScore, 'Team B': teamBScore } = score;  // Nested destructuring with renaming

  if (!match_id) {
    return res.status(400).json({ error: 'match_id is required' });
  }

  const db = openConnection();

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
  } catch (error) {
    console.error('Error storing match details:', error);
    res.status(500).json({ error: 'Failed to store match details' });
  } finally {
    closeConnection();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
