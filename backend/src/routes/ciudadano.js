const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../middlewares/validation');
const { getCiudadanoByID, getCiudadano, postCiudadano } = require('../controllers/ciudadanoController');

const router = express.Router();

router.get(
    '/:id',
    [
        param('id').isString().withMessage('The field id must be a string.'),
    ],
    validateRequest,
    getCiudadanoByID
)

router.get(
    '/',
    validateRequest,
    getCiudadano
)

router.post(
    '/',
    [
        body('id').isString().withMessage('The field id must be a string.'),
        body('credencial_civica').isString().withMessage('The field credencial_civica must be a string.'),
        body('primer_nombre').isString().withMessage('The field primer_nombre must be a string.'),
        body('primer_apellido').isString().withMessage('The field primer_apellido must be a string.'),
        body('fecha_nacimiento').isDate().withMessage('The field fecha_nacimiento must be a valid date.'),
        body('esta_vivo').optional().isBoolean().withMessage('The field esta_vivo must be a boolean if provided.'),
    ],
    validateRequest,
    postCiudadano
)

module.exports = router;