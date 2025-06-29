const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../middlewares/validation');
const { getZona, postZona, getZonaByID } = require('../controllers/zonaController');

const router = express.Router();

const forbidCitizen = require('../middlewares/forbidCitizen');

/**
 * @route POST /api/zona/
 * @desc Create a new zona
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token> 
 * @param {string} nombre.body - Zona name
 * @param {string} municipio_id.body - Municipio ID
 * @return {object} 201 - Zona created successfully
 * @return {object} 400 - Validation error if fields are invalid
 * @return {object} 500 - Internal server error if database operation fails
 */
router.post(
    '/',
    [
        body('nombre').isString().withMessage('The field nombre must be a string.'),
        body('municipio_id').isString().withMessage('The field municipio_id must be a string.')
    ],
    forbidCitizen,
    validateRequest,
    postZona
);

/**
 * @route GET /api/zona/:id
 * @desc Get zona by ID
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token>
 * @param {string} id.params.required - Zona ID
 * @return {object} 200 - Zona data retrieved successfully
 * @return {object} 400 - Validation error if ID is invalid
 * @return {object} 404 - Not found if zona doesn't exist
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/:id',
    [
        param('id').isString().withMessage('The field id must be a string.'),
    ],
    forbidCitizen,
    validateRequest,
    getZonaByID
);

/**
 * @route GET /api/zona/
 * @desc Get all zonas
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token>
 * @return {object} 200 - Array of zonas retrieved successfully
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/',
    forbidCitizen,
    validateRequest,
    getZona
);

module.exports = router;