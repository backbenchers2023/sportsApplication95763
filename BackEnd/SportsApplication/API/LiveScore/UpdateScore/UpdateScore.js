const { OpenConnection, CloseConnection } = require('../../../DBManager/Connection.js');
const logger = require('../../../log');

const SaveScore = async (req, res) => {
    let connection;
    try {
        const matches = req.body;

        if (!Array.isArray(matches) || matches.length === 0) {
            logger.error("Invalid input: expected a non-empty array of matches.");
            return res.status(400).json({ error: "Invalid input: expected a non-empty array of matches." });
        }

        connection = await OpenConnection();
        const { db } = connection;

        for (const { matchid, score, teamid } of matches) {
            if (!matchid || score === undefined || !teamid) {
                logger.error("Invalid input for match:" + matchid, score, teamid);
                return res.status(400).json({ error: `Invalid input for match: ${JSON.stringify({ matchid, score, teamid })}` });
            }

            // Fetch match document
            const matchRef = db.collection('matches').doc(matchid);
            const matchDoc = await matchRef.get();

            if (!matchDoc.exists) {
                logger.error("No match found with ID:" + matchid);
                return res.status(404).json({ error: `No match found with ID: ${matchid}` });
            }

            // Update score for the specific team in the match
            const teams = matchDoc.data().team;
            const teamIndex = teams.findIndex(t => t.teamid === teamid);

            if (teamIndex === -1) {
                logger.error("No team found with ID:" + teamid + "in match ID:" + matchid)
                return res.status(404).json({ error: `No team found with ID: ${teamid} in match ID: ${matchid}` });
            }

            teams[teamIndex].finalscore = score; // Update the score

            // Commit the changes
            await matchRef.update({ team: teams });
        }
        logger.error("Scores updated successfully.")
        return res.status(200).json({ message: "Scores updated successfully." });
    } catch (error) {
        logger.error('Error in SaveScore:', error);
        return res.status(500).json({ error: "Failed to update scores." });
    } finally {
        if (connection) {
            await CloseConnection();
        }
    }
};

module.exports = SaveScore;
