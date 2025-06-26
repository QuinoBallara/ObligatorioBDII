const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../middlewares/validation');
const { getEstablecimientoByID, getEstablecimiento, postEstablecimiento } = require('../controllers/establecimientoController');

const router = express.Router();

/**
 * @route POST /api/establecimiento/
 * @desc Create a new establecimiento
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token> 
 * @param {string} nombre.body - Establecimiento name
 * @param {string} direccion.body - Establecimiento address
 * @param {string} tipo_establecimiento_id.body - Tipo establecimiento ID
 * @param {string} zona_id.body - Zona ID
 * @return {object} 201 - Establecimiento created successfully
 * @return {object} 400 - Validation error if fields are invalid
 * @return {object} 500 - Internal server error if database operation fails
 */
router.post(
    '/',
    [
        body('nombre').isString().withMessage('The field nombre must be a string'),
        body('direccion').isString().withMessage('The field direccion must be a string'),
        body('tipo_establecimiento_id').isInt().withMessage('The field tipo_establecimiento_id must be an integer'),
        body('zona_id').isInt().withMessage('The field zona_id must be an integer'),
    ],
    validateRequest,
    postEstablecimiento
);

/**
 * @route GET /api/establecimiento/
 * @desc Get all establecimientos
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token>
 * @return {object} 200 - Array of establecimientos retrieved successfully
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/',
    validateRequest,
    getEstablecimiento
);

/**
 * @route GET /api/establecimiento/:id
 * @desc Get a specific establecimiento by ID
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token>
 * @param {string} id.params.required - Establecimiento ID
 * @return {object} 200 - Establecimiento retrieved successfully
 * @return {object} 400 - Validation error if ID format is invalid
 * @return {object} 404 - Establecimiento not found
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/:id',
    [
        param('id').isString().withMessage('The field id must be a string')
    ],
    validateRequest,
    getEstablecimientoByID
)

module.exports = router;