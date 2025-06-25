const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../middlewares/validation');
const { getTipoEstablecimientoByID, getTipoEstablecimiento, postTipoEstablecimiento } = require('../controllers/tipoEstablecimientoController');

const router = express.Router();

/**
 * @route GET /api/tipoEstablecimiento/:id
 * @desc Get tipo de establecimiento by ID
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token> 
 * @param {string} id.params - Tipo de establecimiento ID
 * @return {object} 200 - Tipo de establecimiento object
 * @return {object} 400 - Validation error if ID format is invalid
 * @return {object} 404 - Not found if tipo de establecimiento doesn't exist
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/:id',
    [
        param('id').isString().withMessage('The field id must be a string.'),
    ],
    validateRequest,
    getTipoEstablecimientoByID
)

/**
 * @route GET /api/tipoEstablecimiento/
 * @desc Get all tipos de establecimiento
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token> 
 * @return {Array} 200 - Array of tipos de establecimiento
 * @return {object} 404 - Not found if no tipos de establecimiento exist
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/',
    validateRequest,
    getTipoEstablecimiento
)

/**
 * @route POST /api/tipoEstablecimiento/
 * @desc Create a new tipo de establecimiento
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token> 
 * @param {string} nombre.body - Tipo de establecimiento name
 * @return {object} 201 - Tipo de establecimiento created successfully
 * @return {object} 400 - Validation error if fields are invalid
 * @return {object} 500 - Internal server error if database operation fails
 */
router.post(
    '/',
    [
        body('nombre').isString().withMessage('The field nombre must be a string.'),
    ],
    validateRequest,
    postTipoEstablecimiento
)

module.exports = router;