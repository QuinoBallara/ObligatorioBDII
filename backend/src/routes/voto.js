const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../middlewares/validation');
const forbidCitizen = require('../middlewares/forbidCitizen');

const {
    postVoto,
    getVotoByID,
    getVoto
} = require('../controllers/votoController');

const router = express.Router();

router.post(
    '/',
    [
        body('mesa_id').isInt().withMessage('The field mesa_id must be an integer.'),
        body('lista_id').isInt().withMessage('The field lista_id must be an integer.'),
        body('es_observado').isBoolean().withMessage('The field es_observado must be a boolean.'),
        body('es_valido').isBoolean().withMessage('The field es_valido must be a boolean.'),
    ],
    forbidCitizen,
    validateRequest,
    postVoto
);

router.get(
    '/',
    forbidCitizen,
    validateRequest,
    getVoto
);

router.get(
    '/:voto_id',
    [
        param('voto_id').isString().withMessage('The field id must be a string.'),
    ],
    forbidCitizen,
    validateRequest,
    getVotoByID,
);

module.exports = router;