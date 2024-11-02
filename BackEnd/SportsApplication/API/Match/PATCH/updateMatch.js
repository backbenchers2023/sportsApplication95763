const { OpenConnection, CloseConnection } = require('../../../DBManager/Connection.js');
const logger = require('../../../log.js');

const updateMatch = async (req, res) => { 
    let connection;

    try{
        const matchId = req.query.matchId;
        const matchstatus = req.query.matchstatus
        logger.message(`Updating Matches for MatcheId: ${matchId}`);

        if(!matchId){
            return res.status(400).json({ message: 'MatchId is required' });
        }
        connection = await OpenConnection();
        const { db } = connection;

        const matches = await db.collection('matches').where('match_id', "==", matchId).get();

        if (matches.empty) {
            logger.message(`No Matches to update for to: ${matchId}`);
            return res.status(404).json({ message: `No Matches to update for MatcheId: ${matchId}` });
        }

        const batch = db.batch();
        matches.forEach(doc => batch.update(doc.ref, { status: matchstatus }));

        const result = await batch.commit();
        logger.message('Matches updated successful');
        res.status(200).json({ message: 'Matches updated successful' });

    } catch (err) {
        logger.error('Error updating Matches status:', err);
        res.status(500).json({ message: 'Unexpected error occurred' });
    } finally {
        if (connection) {
            await CloseConnection();
        }
    }
};

module.exports = updateMatch;
