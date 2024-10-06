const { OpenConnection, CloseConnection } = require("../../../DBManager/Connection");
const logger = require('../../../log');

const GetTeams = async (req, res) => {

    let connection;
    try {
        var tournamentid = req.body.tournamentid;

        if (tournamentid == null) {
            return res.status(400).json({ error: "Invalid input: enter the tournamentId." });
        }

        connection = OpenConnection();
        const { db } = connection

        const teams =  await db.collection('teams').where("tournament_id", "==", tournamentid).get();   

        logger.message(teams);                           
         logger.message("Teams query result:", teams.docs.map(doc => doc.data()));

        const result = teams.docs.map(doc => {
            const data = doc.data();
            return {
                teams : data.totteams
            };
        });

        if (!teams.empty){
            res.status(200).json({ "teams": result });
        } else {
            res.status(400).json({ message: "No teams found!" });
        }

    } catch (error) {
        logger.error(error)
        res.status(400).json({ message: "Error occured while fetching teams" });

    } finally {
        CloseConnection();
    }
}



module.exports = GetTeams;