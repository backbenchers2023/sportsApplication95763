const { OpenConnection, CloseConnection } = require("../../../DBManager/Connection");
const logger = require('../../../log');


const Getmatchbyid = async (req, res) => {
    let connection;
    try {
        const matchid = req.query.matchid;
        logger.message("matchid:", matchid);

        if (!matchid) {
            return res.status(400).json({ error: "The matchid is empty" });
        }
        connection = await OpenConnection();
        const { db } = connection;

        const result = await db.collection("matches").where("match_id", "==", matchid).get();

        if (!result) {
            logger.error("No data found for this matchid");
            return res.status(404).json({ error: "No data found for this matchid" });
        }
        const matches = result.docs.map(doc => {
            const data = doc.data();
            return {            
                team: data.team,
            };
        });

        logger.message("Matches found:", matches);

        return res.status(200).json(matches);
    } catch (err) {
        logger.error("Error fetching matches:", err);
        return res.status(500).json({ error: "An error occurred while fetching matches" });
    } finally {
        if (connection) {
            CloseConnection();
        }
    }
}

module.exports = Getmatchbyid;