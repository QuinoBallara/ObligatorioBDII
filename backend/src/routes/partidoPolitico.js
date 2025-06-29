const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../middlewares/validation');
const {
    getPartidoPoliticoByID,
    postPartidoPolitico,
    getPartidoPolitico,
    postAutoridadPartidoPolitico,
    getAutoridadesByPartidoPoliticoID
} = require('../controllers/partidoPoliticoController');

const router = express.Router();
const forbidCitizen = require('../middlewares/forbidCitizen');

/**
 * @route GET /api/partidoPolitico/:id
 * @desc Get a partido politico by ID
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token> 
 * @param {string} id.path - PartidoPolitico ID
 * @return {object} 200 - PartidoPolitico retrieved successfully
 * @return {object} 400 - Validation error if ID is invalid
 * @return {object} 404 - PartidoPolitico not found
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/:id',
    [
        param('id').isString().withMessage('The field id must be a string'),
    ],
    validateRequest,
    getPartidoPoliticoByID
)

/**
 * @route GET /api/partidoPolitico/
 * @desc Get all partidos politicos
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token> 
 * @return {object} 200 - PartidosPoliticos retrieved successfully
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/',
    validateRequest,
    getPartidoPolitico
)

/**
 * @route POST /api/partidoPolitico/
 * @desc Create a new partido politico
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token> 
 * @param {string} nombre.body - PartidoPolitico name
 * @return {object} 201 - PartidoPolitico created successfully
 * @return {object} 400 - Validation error if fields are invalid
 * @return {object} 500 - Internal server error if database operation fails
 */
router.post(
    '/',
    [
        body('nombre').isString().withMessage('The field nombre must be a string')
    ],
    forbidCitizen,
    validateRequest,
    postPartidoPolitico
)

/**
 * @route POST /api/partidoPolitico/:partidoPolitico_id/autoridad
 * @desc Create a new autoridad for a partido politico
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token> 
 * @param {string} partidoPolitico_id.path - PartidoPolitico ID
 * @param {string} ciudadano_id.body - Ciudadano ID
 * @param {string} fecha_inicio.body - Start date (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ)
 * @param {string} fecha_fin.body - End date (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ)
 * @param {string} tipo_ciudadano_id.body - Tipo ciudadano ID
 * @return {object} 201 - Autoridad created successfully
 * @return {object} 400 - Validation error if fields are invalid
 * @return {object} 500 - Internal server error if database operation fails
 */
router.post(
    '/:partidoPolitico_id/autoridad',
    [
        body('ciudadano_id').isInt().withMessage('The field ciudadano_id must be an integer'),
        param('partidoPolitico_id').isInt().withMessage('The field partidoPolitico_id must be an integer'),
        body('fecha_inicio').isISO8601().withMessage('The field fecha_inicio must be a valid date'),
        body('fecha_fin').isISO8601().withMessage('The field fecha_fin must be a valid date'),
        body('tipo_ciudadano_id').isInt().withMessage('The field tipo_ciudadano_id must be an integer'),
    ],
    forbidCitizen,
    validateRequest,
    postAutoridadPartidoPolitico
);

/**
 * @route GET /api/partidoPolitico/:id/autoridad
 * @desc Get autoridades by partido politico ID
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token> 
 * @param {string} id.path - PartidoPolitico ID
 * @return {object} 200 - Autoridades retrieved successfully
 * @return {object} 400 - Validation error if ID is invalid
 * @return {object} 404 - Autoridades not found
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/:id/autoridad',
    [
        param('id').isString().withMessage('The field id must be a string')
    ],
    validateRequest,
    getAutoridadesByPartidoPoliticoID
)

module.exports = router;
