const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const { getUserById, getUserByCredential, blacklistToken } = require('../services/authService');

async function login(req, res) {
    const { id, credencialCivica } = req.body;

    if (!id && !credencialCivica) {
        return res.status(400).json({ errors: [{ msg: 'At least one of id or credencialCivica is required' }] });
    }

    try {
        let user;
        if (id) {
            user = await getUserById(req.db, id);
        } else if (credencialCivica) {
            user = await getUserByCredential(req.db, credencialCivica);
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, jti: uuid.v4() },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '12h' }
        );

        res.status(200).json({ user, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function logout(req, res) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        await blacklistToken(token);
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { login, logout };