const { loggers } = require('winston');
const { OpenConnection, CloseConnection } = require('../../../DBManager/Connection.js');
const Modules = require('../../../Modules/Common.js')
const logger = require('../../../log.js');

const addNewTounament = (req, res) => {

    try {
        const {
            logo,
            tournament_name,
            city,
            groundname,
            organizername,
            phonenumber,
            entryfee,
            lastentry,
            startdate,
            enddate,
            category = null,
            matchtype,
            pitchtype,
            poster,
            userid
        } = req.body;

        const req_params = ['userid','logo', 'tournament_name', 'city', 'groundname', 'organizername', 'phonenumber', 'entryfee', 'lastentry', 'startdate', 'enddate', 'matchtype', 'pitchtype', 'poster']

        const missingParams = req_params.filter(params => !(params in req.body));
        const tournament_id = Modules.generateUniqueId();
        const TeamId = Modules.generateUniqueId();

        if (missingParams.length > 0) {
            logger.error(`Missing ${missingParams.length} required parameter(s): ${missingParams}`)
            return res.status(400).json({ message: `Missing ${missingParams.length} required parameter(s): ${missingParams}` })
        }

        const { db } = OpenConnection();

        db.collection('teams').doc(TeamId.toString()).set({
            TeamId,
            tournament_id,
            teams :[]
        }).then(()=>{
            logger.message("Team Added Successfully")
        })
        
        try {
            db.collection('tournaments').doc(tournament_id.toString()).set({
                tournament_id,
                logo,
                tournament_name,
                city,
                groundname,
                organizername,
                phonenumber,
                entryfee,
                lastentry,
                startdate,
                enddate,
                category,
                matchtype,
                pitchtype,
                poster,
                status:'upcomming',
                Teams: TeamId,
                userid:userid
            });
            res.status(200).json({ message: "Tournament Created Successfully", id: tournament_id })
        }
        catch (error) {
            logger.error(error);
            res.status(500).json({ error: 'Failed to store Tournament details' });
        }
    }
    catch {
        res.status(500).json({ error: 'Failed to store match details see the log file for more details' });
    } finally {
        CloseConnection()
    }
};


module.exports = addNewTounament;