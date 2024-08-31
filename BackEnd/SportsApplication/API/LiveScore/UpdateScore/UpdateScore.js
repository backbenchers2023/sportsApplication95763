const { OpenConnection, CloseConnection } = require('../../../DBManager/Connection.js');
const logger = require('../../../log');

const SaveScore = (req, res) => {
    try {
        if (matchid != null && score != null) {const [{ matchid, score, teamid }] = req.body;

            const { db } = OpenConnection();
            try {
                db.matches.updateOne(
                    {
                        match_id: matchid,
                        teamid: teamid
                    },
                    { $set: { "teams.$[].finalscore": score } }
                )
                .then(result => {
                    // Send a success response after update
                    return res.status(200).json({ message: "Score updated successfully", result });
                })
                .catch(updateError => {
                    // Catch errors specifically from updateOne
                    logger.error(updateError);
                    return res.status(400).json({ error: "Failed to update score" });
                });
            } catch (error) {
                logger.error(error);
                return res.status(500).json({ error: "Internal Server Error" });
            } finally {
                CloseConnection();
            }
        } else {
            return res.status(400).json({ error: "Invalid input parameters" });
        }
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error: "Server error occurred" });
    }
}

module.exports = SaveScore;
