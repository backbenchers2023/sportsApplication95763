const jwt = require('jsonwebtoken');
const logger = require('../../log');
const { OpenConnection, CloseConnection } = require("../../DBManager/Connection");
const bcrypt = require('bcryptjs'); // Ensure bcrypt is imported
const SECRET_KEY = 'your_secret_key'; // Replace with your actual secret key

const login = async (req, res) => {
    let connection;

    try {
        connection = await OpenConnection();
        const { db } = connection;
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Enter the correct input" }); // Use 400 for bad request
        }

        // Fetch user by email
        const userSnapshot = await db.collection('users').where("email", "==", email).get();
        if (userSnapshot.empty) {
            logger.error("User does not exist");
            return res.status(404).json({ message: "User doesn't exist" }); // Use 404 for not found
        }

        const user = userSnapshot.docs[0].data(); // Get the first user document
        const pass = await bcrypt.compare(password, user.password);
        if (!pass) {
            logger.error("Wrong Credentials");
            return res.status(401).json({ message: "Wrong Credentials" }); // Use 401 for unauthorized
        }

        // Create JWT token
        const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '30d' });
        const userid = user.userid
        return res.json({ "token": token, "userid": userid });

    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal Server Error" }); // Use 500 for server errors
    } finally {
        if (connection) {
            CloseConnection(connection); // Ensure you close the connection properly
        }
    }
}

module.exports = login;
