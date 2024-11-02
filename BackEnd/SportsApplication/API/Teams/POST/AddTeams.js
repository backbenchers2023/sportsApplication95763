const { OpenConnection, CloseConnection } = require("../../../DBManager/Connection");
const logger = require("../../../log");
const admin = require('firebase-admin');

const Addteams = async (req, res) => {
    const { tournament_id, totteams } = req.body; // Ensure tournament_id and totteams are passed
    let connection;
    const tournamentid = tournament_id;

    logger.message("Tournament ID:", tournamentid);
    logger.message("Teams to add:", totteams);

    try {
        connection = await OpenConnection();
        const { db } = connection;

        // Check if the tournament exists
        const tournamentDoc = await db.collection('teams').where('tournament_id', '==', tournamentid).get();

        if (tournamentDoc.empty) {
            return res.status(404).json({ message: "No tournament found with the given ID" });
        }

        let existingTeams = [];

        tournamentDoc.forEach(element => {
            const data = element.data();
            if (data && data.totteams) { // Changed to check for 'totteams'
                existingTeams = [...existingTeams, ...data.totteams];
            }
        });

        // Filter out teams that already exist
        const teamsToAdd = totteams.filter(team => 
            !existingTeams.some(existingTeam => existingTeam.teamname === team.teamname)
        );

        if (teamsToAdd.length === 0) {
            return res.status(400).json({ message: "All teams are already added" });
        }

        // Use batch to update documents
        const batch = db.batch();

        tournamentDoc.forEach((doc) => {
            const docRef = db.collection('teams').doc(doc.id);
            // Add new teams while preserving existing ones
            batch.update(docRef, {
                'totteams': admin.firestore.FieldValue.arrayUnion(...teamsToAdd.map(team => ({
                    teamname: team.teamname,
                    location: team.location
                })))
            });
        });

        await batch.commit();

        logger.message(`Teams added: ${JSON.stringify(teamsToAdd)}`);
        return res.status(200).json({ message: "Teams added successfully", addedTeams: teamsToAdd });

    } catch (error) {
        logger.error('Error in Addteams:', error);
        return res.status(500).json({ message: "An error occurred while adding teams", error: error.message });
    } finally {
        if (connection) {
            CloseConnection(connection);
        }
    }
};

module.exports = Addteams;
