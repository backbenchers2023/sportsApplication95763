const bcrypt = require('bcryptjs');
const modules = require('../../Modules/Common')
const logger = require('../../log')
const { OpenConnection, CloseConnection } = require("../../DBManager/Connection");

const signup = async (req, res) => {
    let connection = await OpenConnection();
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(402).json({ message: "Enter the correct input" });
        }

        const { db } = connection
        const userid = modules.generateUniqueId()
        const Timestamp = modules.generatetimestamp()
        const hashedPassword = await bcrypt.hash(password, 10)

        let result = await db.collection('users').doc(email).set({
            userid,
            email,
            password: hashedPassword,
            Timestamp,
        })

        logger.message(result);
        return res.status(200).json({ message: "User added successfully" });

    } catch (error) {
        logger.message(error);
        return res.status(500).json({ message: "Internal server error" });
    } finally {
        if (connection) {
            CloseConnection();
        }
    }
}


module.exports = signup