const { OpenConnection, CloseConnection } = require('../../../DBManager/Connection.js');
const logger = require('../../../log.js');

const ShowTournaments = async (req, res) => {

    let connection;
    try {
        const userid = req.headers['userid']; // Get the userid from the query parameters
        logger.message("UserID:", userid);

        connection = await OpenConnection();
        const { db } = connection;
        let result;

        if (!userid) {
            result = await db.collection("tournaments").get();
        } else {
            result = await db.collection("tournaments").where("userid", "==", userid).get();
        }

        // Check if any matches were found
        if (result.empty) {
            logger.error("No data found for this user");
            return res.status(404).json({ error: "No data found for this user" });
        }

        // Map the results to include only the desired fields
        const matches = result.docs.map(doc => {
            const data = doc.data();
            return {
                TeamsId: data.TeamsId,
                city: data.city,
                category: data.category,
                enddate: data.enddate,
                entryfee: data.entryfee,
                groundname: data.groundname,
                lastentry: data.lastentry,
                logo: data.logo,
                matchtype: data.matchtype,
                organizername: data.organizername,
                phonenumber: data.phonenumber,
                pitchtype: data.pitchtype,
                poster: data.poster,
                startdate: data.startdate,
                tournament_id: data.tournament_id,
                tournament_name: data.tournament_name,
                status:data.status
            };
        });

        logger.message("Tournaments found:", matches);

        return res.status(200).json(matches);

    } catch (err) {
        logger.error("An error occurred while fetching Tournamnet details:", err);
        return res.status(500).json({ error: "An error occurred while fetching Tournamnet details" });
    } finally {
        if (connection) {
            CloseConnection();
        }
    }
}



module.exports = ShowTournaments;