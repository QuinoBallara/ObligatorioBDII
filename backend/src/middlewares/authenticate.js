const jwt = require('jsonwebtoken');
const { checkTokenBlacklist } = require('../services/authService');

function authenticate(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        const payload = jwt.verify(token, secretKey);

        const isBlacklisted = checkTokenBlacklist(req.db, token);
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Token is blacklisted' });
        }

        req.auth = payload;

        next();
    }
    catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticate;