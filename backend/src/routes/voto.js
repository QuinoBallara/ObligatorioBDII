const express = require('express');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validation');
const forbidCitizen = require('../middlewares/forbidCitizen');

const {
    postVoto,
} = require('../controllers/votoController');

const router = express.Router();

router.post(
    '/',
    [
        body('mesa_id').isString().withMessage('The field mesa_id must be a string.'),
        body('lista_id').isString().withMessage('The field lista_id must be a string.'),
        body('es_observado').isBoolean().withMessage('The field es_observado must be a boolean.'),
        body('es_valido').isBoolean().withMessage('The field es_valido must be a boolean.'),
    ],
    forbidCitizen,
    validateRequest,
    postVoto
);

module.exports = router;