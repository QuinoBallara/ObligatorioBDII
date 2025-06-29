const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../middlewares/validation');
const { getTipoEleccionByID, getTipoEleccion, postTipoEleccion } = require('../controllers/tipoEleccionController');

const router = express.Router();

const forbidCitizen = require('../middlewares/forbidCitizen');

router.get(
    '/:id',
    [
        param('id').isString().withMessage('The field id must be a string.'),
    ],
    forbidCitizen,
    validateRequest,
    getTipoEleccionByID
)

router.get(
    '/',
    validateRequest,
    getTipoEleccion
);

router.post(
    '/',
    [
        body('nombre').isString().withMessage('The field nombre must be a string.'),
    ],
    forbidCitizen,
    validateRequest,
    postTipoEleccion
);

module.exports = router;