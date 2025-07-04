const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../middlewares/validation');
const { getOrganismoEstatal, postOrganismoEstatal, getOrganismoEstatalByID, postCiudadanoOrganismoEstatal, getCiudadanoOrganismoEstatalByOrganismoEstatalID, getCiudadanoOrganismoEstatalByOrganismoEstatalIDAndCiudadanoID } = require('../controllers/organismoEstatalController');
const forbidCitizen = require('../middlewares/forbidCitizen');

const router = express.Router();

/**
 * @route POST /api/organismo-estatal/
 * @desc Create a new organismo estatal
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token> 
 * @param {string} nombre.body - Organismo estatal name
 * @return {object} 201 - Organismo estatal created successfully
 * @return {object} 400 - Validation error if fields are invalid
 * @return {object} 500 - Internal server error if database operation fails
 */
router.post(
    '/',
    [
        body('nombre').isString().withMessage('The field nombre must be a string.'),
    ],
    forbidCitizen,
    validateRequest,
    postOrganismoEstatal
);

/**
 * @route GET /api/organismo-estatal/:id
 * @desc Get organismo estatal by ID
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token>
 * @param {number} id.params.required - Organismo estatal ID
 * @return {object} 200 - Organismo estatal data retrieved successfully
 * @return {object} 400 - Validation error if ID is invalid
 * @return {object} 404 - Not found if organismo estatal doesn't exist
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/:id',
    [
        param('id').isInt().withMessage('The field id must be an integer.'),
    ],
    forbidCitizen,
    validateRequest,
    getOrganismoEstatalByID
);

/**
 * @route GET /api/organismo-estatal/
 * @desc Get all organismos estatales
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token>
 * @return {object} 200 - Array of organismos estatales retrieved successfully
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/',
    forbidCitizen,
    validateRequest,
    getOrganismoEstatal
);

/**
 * @route GET /api/organismo-estatal/:organismo_estatal_id/ciudadano
 * @desc Get all ciudadanos associated with a specific organismo estatal
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token>
 * @param {number} organismo_estatal_id.params.required - Organismo estatal ID
 * @return {object} 200 - Array of ciudadanos associated with the organismo estatal
 * @return {object} 400 - Validation error if organismo_estatal_id is invalid
 * @return {object} 404 - Not found if organismo estatal doesn't exist
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/:organismo_estatal_id/ciudadano',
    [
        param('organismo_estatal_id').isInt().withMessage('The field organismo_estatal_id must be an integer'),
    ],
    forbidCitizen,
    validateRequest,
    getCiudadanoOrganismoEstatalByOrganismoEstatalID
);

/**
 * @route GET /api/organismo-estatal/:organismo_estatal_id/ciudadano/:ciudadano_id
 * @desc Get a specific ciudadano associated with a specific organismo estatal
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token>
 * @param {number} organismo_estatal_id.params.required - Organismo estatal ID
 * @param {number} ciudadano_id.params.required - Ciudadano ID
 * @return {object} 200 - Ciudadano data associated with the organismo estatal retrieved successfully
 * @return {object} 400 - Validation error if parameters are invalid
 * @return {object} 404 - Not found if organismo estatal or ciudadano doesn't exist or association doesn't exist
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/:organismo_estatal_id/ciudadano/:ciudadano_id',
    [
        param('organismo_estatal_id').isInt().withMessage('The field organismo_estatal_id must be an integer'),
        param('ciudadano_id').isInt().withMessage('The field ciudadano_id must be an integer.'),
    ],
    forbidCitizen,
    validateRequest,
    getCiudadanoOrganismoEstatalByOrganismoEstatalIDAndCiudadanoID
)

/**
 * @route POST /api/organismo-estatal/:organismo_estatal_id/ciudadano
 * @desc Associate a ciudadano with an organismo estatal
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token>
 * @param {number} organismo_estatal_id.params.required - Organismo estatal ID
 * @param {number} ciudadano_id.body - Ciudadano ID to associate
 * @return {object} 201 - Ciudadano associated with organismo estatal successfully
 * @return {object} 400 - Validation error if fields are invalid
 * @return {object} 404 - Not found if organismo estatal or ciudadano doesn't exist
 * @return {object} 500 - Internal server error if database operation fails
 */
router.post(
    '/:organismo_estatal_id/ciudadano',
    [
        param('organismo_estatal_id').isInt().withMessage('The field organismo_estatal_id must be an integer'),
        body('ciudadano_id').isInt().withMessage('The field ciudadano_id must be an integer.'),
    ],
    forbidCitizen,
    validateRequest,
    postCiudadanoOrganismoEstatal
);

module.exports = router;