const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../middlewares/validation');
const { getDepartamento, postDepartamento } = require('../controllers/departamentoController');

const router = express.Router();

/**
 * @route POST /api/departamento/
 * @desc Create a new departamento
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token> 
 * @param {string} nombre.body - Departamento name
 * @return {object} 201 - Departamento created successfully
 * @return {object} 400 - Validation error if fields are invalid
 * @return {object} 500 - Internal server error if database operation fails
 */
router.post(
    '/',
    [
        body('nombre').isString().withMessage('The field nombre must be a string.'),
    ],
    validateRequest,
    postDepartamento

);

/**
 * @route GET /api/departamento/:id
 * @desc Get departamento by ID
 * @access Protected (Bearer token required)
 * @headers Authorization: Bearer <token>
 * @param {number} id.params - Departamento ID
 * @return {object} 200 - Departamento data
 * @return {object} 400 - Validation error if ID is invalid
 * @return {object} 404 - Not found if departamento doesn't exist
 * @return {object} 500 - Internal server error if database operation fails
 */
router.get(
    '/:id',
    [
        param('id').isString().withMessage('The field id must be an integer.'),
    ],
    validateRequest,
    getDepartamento
);


module.exports = router;