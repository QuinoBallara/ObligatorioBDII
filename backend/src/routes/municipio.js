const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../middlewares/validation');
const { getMunicipio, postMunicipio, getMunicipioByID } = require('../controllers/municipioController');
const forbidCitizen = require('../middlewares/forbidCitizen');

const router = express.Router();

/**
 * @route POST /api/municipio/
 * @desc Create a new municipio
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token> 
 * @param {string} nombre.body - Municipio name
 * @param {string} departamento_id.body - Departamento ID
 * @return {object} 201 - Municipio created successfully
 * @return {object} 400 - Validation error if fields are invalid
 * @return {object} 500 - Internal server error if database operation fails
 */
router.post(
    '/',
    [
        body('nombre').isString().withMessage('The field nombre must be a string.'),
        body('departamento_id').isString().withMessage('The field departamento_id must be a string.')
    ],
    forbidCitizen,
    validateRequest,
    postMunicipio
);

/**
 * @route GET /api/municipio/:id
 * @desc Get municipio by ID
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token>
 * @param {string} id.params.required - Municipio ID
 * @return {object} 200 - Municipio data retrieved successfully
 * @return {object} 400 - Validation error if ID is invalid
 * @return {object} 404 - Not found if municipio doesn't exist
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/:id',
    [
        param('id').isString().withMessage('The field id must be a string.'),
    ],
    forbidCitizen,
    validateRequest,
    getMunicipioByID
);

/**
 * @route GET /api/municipio/
 * @desc Get all municipios
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token>
 * @return {object} 200 - Array of municipios retrieved successfully
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/',
    forbidCitizen,
    validateRequest,
    getMunicipio
);

module.exports = router;