const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../middlewares/validation');
const { getEleccionByID, getEleccion, postEleccion } = require('../controllers/eleccionController');
const forbidCitizen = require('../middlewares/forbidCitizen');

const router = express.Router();

router.get(
    '/:id',
    [
        param('id').isString().withMessage('The field id must be a string.'),
    ],
    validateRequest,
    getEleccionByID
)

router.get(
    '/',
    validateRequest,
    getEleccion
)

router.post(
    '/',
    [
        body('fecha').isDate().withMessage('The field fecha must be a valid date.'),
        body('tipo_eleccion_id').isString().withMessage('The field tipo_eleccion_id must be a string.'),
    ],
    forbidCitizen,
    validateRequest,
    postEleccion
)

module.exports = router;