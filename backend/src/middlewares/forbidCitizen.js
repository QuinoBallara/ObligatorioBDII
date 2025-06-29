async function forbidCitizen(req, res, next) {
    if (!req.auth || !req.auth.mesaId) {
        return res.status(403).json({ message: 'Forbidden: Not a President' });
    }
    next();
}

module.exports = forbidCitizen;