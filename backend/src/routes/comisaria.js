const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../middlewares/validation');
const {
    getComisaria,
    getComisariaByID,
    postComisaria,
    postPolicia
} = require('../controllers/comisariaController');

const router = express.Router();

/**
 * @route POST /api/comisaria/
 * @desc Create a new comisaria
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token> 
 * @param {string} nombre.body - Comisaria name
 * @param {string} municipio_id.body - Municipio ID
 * @return {object} 201 - Comisaria created successfully
 * @return {object} 400 - Validation error if fields are invalid
 * @return {object} 500 - Internal server error if database operation fails
 */
router.post(
    '/',
    [
        body('nombre').isString().withMessage('The field nombre must be a string.'),
        body('municipio_id').isString().withMessage('The field municipio_id must be a string.'),
    ],
    validateRequest,
    postComisaria
);

/**
 * @route GET /api/comisaria/:id
 * @desc Get comisaria by ID
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token>
 * @param {string} id.params.required - Comisaria ID
 * @return {object} 200 - Comisaria data retrieved successfully
 * @return {object} 400 - Validation error if ID is invalid
 * @return {object} 404 - Not found if comisaria doesn't exist
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/:id',
    [
        param('id').isString().withMessage('The field id must be a string'),
    ],
    validateRequest,
    getComisariaByID
);

/**
 * @route GET /api/comisaria/
 * @desc Get all comisarias
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token>
 * @return {object} 200 - Array of comisarias retrieved successfully
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/',
    validateRequest,
    getComisaria
);

/**
 * @route POST /api/comisaria/:id/policia
 * @desc Assign a policia to a comisaria
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token>
 * @param {string} id.params.required - Comisaria ID
 * @param {string} policia_id.body - Policia ID to assign
 * @return {object} 201 - Policia assigned to comisaria successfully
 * @return {object} 400 - Validation error if fields are invalid
 * @return {object} 404 - Not found if comisaria or policia doesn't exist
 * @return {object} 500 - Internal server error if database operation fails
 */
router.post(
    '/:id/policia',
    [
        param('id').isString().withMessage('The field id must be a string.'),
        body('policia_id').isString().withMessage('The field policia_id must be a string.'),
    ],
    validateRequest,
    postPolicia
);

module.exports = router;