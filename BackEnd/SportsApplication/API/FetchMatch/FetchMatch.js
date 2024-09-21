const { OpenConnection, CloseConnection } = require("../../DBManager/Connection");
const logger = require('../../log');

const GetUsermatch = async (req, res) => {

    let connection;
    try {
        const userid = req.query.userid; // Get the userid from the query parameters
        console.log("UserID:", userid);

        if (!userid) {
            logger.error("The userid is empty");
            return res.status(400).json({ error: "The userid is empty" });
        }

        connection = await OpenConnection();
        const { db } = connection;

        const result = await db.collection("matches").where("user_id", "==", userid).get();

        // Check if any matches were found
        if (result.empty) {
            logger.error("No data found for this user");
            return res.status(404).json({ error: "No data found for this user" });
        }

        // Map the results to include only the desired fields
        const matches = result.docs.map(doc => {
            const data = doc.data();
            return {
                matchid: data.match_id,
                match_status:data.match_status,
                match_type: data.match_type,
                start_time: data.start_time,
                team: data.team,
                venue: data.venue
            };
        });

        console.log("Matches found:", matches);

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

module.exports = GetUsermatch;
