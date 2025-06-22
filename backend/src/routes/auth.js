const express = require('express');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validation');
const { login, logout } = require('../controllers/authController');

const router = express.Router();

/**
 * @route POST /auth/login
 * @desc Login user with either ID or credencialCivica. Returns token if successful.
 * @access Public
 * @param {string} id.body - User ID (optional)
 * @param {string} credencialCivica.body - User credential (optional)
 * @return {object} 200 - User data if login is successful
 * @return {object} 400 - Validation error if both fields are missing or invalid
 * @return {object} 401 - Unauthorized if login fails
 */
router.post(
    '/login',
    [
        body('id').optional().isString().withMessage('ID must be a string'),
        body('credencialCivica').optional().isString().withMessage('Credential must be a string'),
    ],
    validateRequest, login
);

/**
 * @route POST /auth/logout
 * @desc Logout user by invalidating the token.
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token>
 * @return {object} 200 - Success message if logout is successful
 * @return {object} 401 - Unauthorized if token is invalid or missing
 * @return {object} 500 - Internal server error
 */
router.post('logout', logout);

module.exports = router;