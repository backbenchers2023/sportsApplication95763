const {OpenConnection,CloseConnection}= require("../../DBManager/Connection")
const logger = require("../../log")

const Getmatch = async (req, res) => {
  try {
    const status = req.query.status; // Get the status from the query parameters
    logger.error("Status:", status);
    console.log(status)

if(!status){
    logger.error("Status:", status);
    return res.status(400).json({ error: "The Status is empty" });
}

connection = await OpenConnection();

const {db} = connection;
const result = await db.collection("matches").where("match_status", "==",status).where("tournament_id", "==", null).get();

// Check if any matches were found
if (result.empty) {
    logger.error("No Matches found ");
    return res.status(404).json({ error: "No Matches found " });
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

module.exports = Getmatch;