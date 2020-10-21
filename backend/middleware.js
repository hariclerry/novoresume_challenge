const jwt = require('jsonwebtoken');

const generateAccessToken = (id) => {
    return 'yourJWT';
}

const authenticateToken = (req, res, next) => {
    // Hint: This is where you need to verify the JWT
    // Hint: You will see this function being passed to authenticated action routes in code. See backend/routes/users.js to explore

    next();
}

module.exports = { generateAccessToken, authenticateToken };