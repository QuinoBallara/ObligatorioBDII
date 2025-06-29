const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../middlewares/validation');
const {
    getListaPresidencialByID,
    getListaPresidencial,
    postListaPresidencial,
    getListaPresidencialByEleccion,
    getListaPresidencialByEleccionAndPartidoPolitico
} = require('../controllers/listaPresidencialController');
const forbidCitizen = require('../middlewares/forbidCitizen');


const router = express.Router();

/**
 * @route POST /api/lista-presidencial/
 * @desc Create a new lista presidencial with associated ciudadanos
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token> 
 * @param {number} eleccion_id.body.required - Election ID
 * @param {number} partido_politico_id.body.required - Political party ID
 * @param {string} nombre.body.required - Lista presidencial name
 * @param {Array} ciudadanos.body.required - Array of ciudadanos for the lista
 * @param {number} ciudadanos.*.ciudadano_id.required - Ciudadano ID
 * @param {number} ciudadanos.*.tipo_ciudadano_id.required - Type of ciudadano ID (e.g., President, Vice-President)
 * @param {number} ciudadanos.*.numero.required - Position number in the lista
 * @return {object} 201 - Lista presidencial created successfully
 * @return {object} 400 - Validation error if fields are invalid
 * @return {object} 500 - Internal server error if database operation fails
 */
router.post(
    '/',
    [
        body('numero').isString().withMessage('The field numero must be a string'),
        body('departamento_id').isInt().withMessage('The field departamento_id must be an integer'),
        body('eleccion_id').isInt().withMessage('The field eleccion_id must be an integer'),
        body('partido_politico_id').isInt().withMessage('The field partido_politico_id must be an integer'),
        body('nombre').isString().withMessage('The field nombre must be a string'),
        body('ciudadanos').isArray().withMessage('The field ciudadanos must be an array'),
        body('ciudadanos.*.ciudadano_id').isInt().withMessage('Each ciudadano must have a ciudadano_id that is an integer'),
        body('ciudadanos.*.tipo_ciudadano_id').isInt().withMessage('Each ciudadano must have a tipo_ciudadano_id that is an integer'),
        body('ciudadanos.*.numero').isInt().withMessage('Each ciudadano must have a numero that is an integer')
    ],
    forbidCitizen,
    validateRequest,
    postListaPresidencial
);

/**
 * @route GET /api/lista-presidencial/
 * @desc Get all listas presidenciales
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token>
 * @return {object} 200 - Array of listas presidenciales retrieved successfully
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/',
    validateRequest,
    getListaPresidencial
);

/**
 * @route GET /api/lista-presidencial/:id
 * @desc Get a specific lista presidencial by ID
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token>
 * @param {string} id.params.required - Lista presidencial ID
 * @return {object} 200 - Lista presidencial retrieved successfully
 * @return {object} 400 - Validation error if ID format is invalid
 * @return {object} 404 - Lista presidencial not found
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/:id',
    [
        param('id').isString().withMessage('The field id must be a string')
    ],
    validateRequest,
    getListaPresidencialByID
);

/**
 * @route GET /api/lista-presidencial/eleccion/:eleccion_id
 * @desc Get all listas presidenciales for a specific election
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token>
 * @param {number} eleccion_id.params.required - Election ID
 * @return {object} 200 - Array of listas presidenciales for the election retrieved successfully
 * @return {object} 400 - Validation error if eleccion_id format is invalid
 * @return {object} 404 - No listas presidenciales found for the election
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/eleccion/:eleccion_id',
    [
        param('eleccion_id').isInt().withMessage('The field eleccion_id must be an integer')
    ],
    validateRequest,
    getListaPresidencialByEleccion
);

/**
 * @route GET /api/lista-presidencial/eleccion/:eleccion_id/partido/:partido_politico_id
 * @desc Get a specific lista presidencial by election and political party
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token>
 * @param {number} eleccion_id.params.required - Election ID
 * @param {number} partido_politico_id.params.required - Political party ID
 * @return {object} 200 - Lista presidencial retrieved successfully
 * @return {object} 400 - Validation error if parameter formats are invalid
 * @return {object} 404 - Lista presidencial not found for the specified election and party
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/eleccion/:eleccion_id/partido/:partido_politico_id',
    [
        param('eleccion_id').isInt().withMessage('The field eleccion_id must be an integer'),
        param('partido_politico_id').isInt().withMessage('The field partido_politico_id must be an integer')
    ],
    validateRequest,
    getListaPresidencialByEleccionAndPartidoPolitico
);

module.exports = router;