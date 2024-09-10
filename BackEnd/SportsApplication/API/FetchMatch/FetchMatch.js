const { OpenConnection } = require("../../DBManager/Connection");
const logger = require('../../log');

const Getmatch = async (req, res) => {

    let connection;
    try {
        const { userid } = req.body; // Extract userid from request body
        console.log("UserID:", userid);

        if (!userid) {
            logger.error("The userid is empty")
            return res.status(400).json({ error: "The userid is empty" });
        }

        connection = await OpenConnection()
        const { db } = connection;
        const result = db.collection("matches").where("userid", "==", userid).get();

        // Check if any matches were found
        if (result.empty) {
            logger.error("No data found for this user");
            return res.status(404).json({ error: "No data found for this user" });
        }
        const matches = result.docs.map(doc => doc.data());
        console.log("Matches found:", matches);

        return res.status(200).send(result);

    } catch (err) {
        logger.error("Error fetching matches:", err);
        return res.status(500).json({ error: "An error occurred while fetching matches" });
    }
}

module.exports = Getmatch;