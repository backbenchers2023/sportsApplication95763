const { OpenConnection, CloseConnection } = require("../../../DBManager/Connection");
const logger = require("../../../log");
const admin = require('firebase-admin');

const Addteams = async (req, res) => {
    const { tournament_id, totteams } = req.body; // Ensure to get tournament_id and totteams from the request body

    let connection;
    let tournamentid = tournament_id;
    console.log("Tournament ID:", tournamentid);
    console.log("Teams to add:", totteams);

    try {
        connection = await OpenConnection();
        const { db } = connection;

        // First, check if the tournament exists
        const tournamentDoc = await db.collection('teams').where('tournament_id', '==', tournamentid).get();

        if (tournamentDoc.empty) {
            return res.status(404).json({ message: "No tournament found with the given ID" });
        }

        let exsistingTeams = [];

        tournamentDoc.forEach(element => {
            const data = element.data()
            if (data && data.totteams) {
                let exsistingTeams = [...exsistingTeams, ...data.totteams];
            }
        });
        const teamsToAdd = totteams.filter(team => !exsistingTeams.includes(team));

    
         // Update each document with the new teams
         const batch = db.batch();
         tournamentDoc.forEach((doc) => {
             const docRef = db.collection('teams').doc(doc.id);
             batch.update(docRef, {
                 'teams': admin.firestore.FieldValue.arrayUnion(...teamsToAdd), // Spread the teams array for batch update
             });
         });
 
         await batch.commit();
 
         console.log(`Teams added: ${JSON.stringify(teamsToAdd)}`);
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