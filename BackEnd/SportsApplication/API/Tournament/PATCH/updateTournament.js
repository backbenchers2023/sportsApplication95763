const { OpenConnection, CloseConnection } = require('../../../DBManager/Connection.js');
const logger = require('../../../log.js');

const updateTournament = async (req, res) => {
    let connection;

    try {
        const TournamentId = req.query.TournamentId;
        logger.message(`Updating tournaments for TournamentId: ${TournamentId}`);

        if (!TournamentId) {
            return res.status(400).json({ message: 'TournamentId is required' });
        }

        connection = await OpenConnection();
        const { db } = connection;

        const tournaments = await db.collection('tournaments').where('tournament_id', "==", TournamentId).get();

        if (tournaments.empty) {
            logger.message(`No tournaments to update for to: ${TournamentId}`);
            return res.status(404).json({ message: `No tournaments to update for TournamentId: ${TournamentId}` });
        }

        const batch = db.batch();
        tournaments.forEach(doc => batch.update(doc.ref, { status: 'live' }));

        const result = await batch.commit();
        logger.message('Tournament updated successful');
        res.status(200).json({ message: 'Tournament updated successful' });

    } catch (err) {
        logger.error('Error updating tournament status:', err);
        res.status(500).json({ message: 'Unexpected error occurred' });
    } finally {
        if (connection) {
            await CloseConnection();
        }
    }
};

module.exports = updateTournament;
