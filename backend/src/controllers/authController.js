const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const { getCiudadano, blacklistToken, getPresidenteMesa, checkTokenInBlacklist } = require('../services/authService');

async function loginCiudadano(req, res, next) {
    const { id, credencialCivica } = req.body;

    if (!id && !credencialCivica) {
        return res.status(400).json({ errors: [{ msg: 'At least one of id or credencialCivica is required' }] });
    }

    try {
        let user;
        user = await getCiudadano(id, credencialCivica);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, jti: uuid.v4() },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '10m' }
        );

        res.status(200).json({ user, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function loginPresidente(req, res, next) {
    const { id, credencialCivica } = req.body;

    if (!id && !credencialCivica) {
        return res.status(400).json({ errors: [{ msg: 'Id and credencialCivica are required' }] });
    }

    try {
        let user;
        user = await getPresidenteMesa(id, credencialCivica);

        if (!user.ciudadano_id || !user.mesa_id) {
            return res.status(401).json({ message: 'Invalid credentials or insufficient permissions' });
        }

        const token = jwt.sign(
            { userId: user.ciudadano_id, mesaId: user.mesa_id, jti: uuid.v4() },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.status(200).json({ user, token });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


async function logout(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }


    try {
        const isBlacklisted = await checkTokenInBlacklist(token);
        if (!isBlacklisted) {
            await blacklistToken(token);
            res.status(200).json({ message: 'Logged out successfully' });
        } else {
            res.status(400).json({ message: 'Already logged out' });
        }
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { loginCiudadano, loginPresidente, logout };