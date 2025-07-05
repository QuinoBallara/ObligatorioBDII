const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../middlewares/validation');
const forbidCitizen = require('../middlewares/forbidCitizen');

const {
    getMesaByID,
    postMesa,
    patchMesaAbierta,
    getVotoByID,
    getVotosPerListaPerMesa,
    getVotosPerPartidoPerMesa,
    getVotosPerCandidatoPerMesa,
    getMesa
} = require('../controllers/mesaController');

const router = express.Router();

router.get(
    '/',
    forbidCitizen,
    validateRequest,
    getMesa
)

router.get(
    '/:id',
    [
        param('id').isString().withMessage('The field id must be a string.'),
    ],
    validateRequest,
    getMesaByID
);

router.post(
    '/',
    [
        body('esta_abierta').isBoolean().optional().withMessage('The field esta_abierta must be a boolean.'),
        body('circuito_id').isString().withMessage('The field circuito_id must be a string.'),
        body('establecimiento_id').isString().withMessage('The field establecimiento_id must be a string.'),
        body('accessible').isBoolean().withMessage('The field accessible must be a boolean.'),
        body('vocal_id').isString().withMessage('The field vocal_id must be a string.'),
        body('presidente_id').isString().withMessage('The field presidente_id must be a string.'),
        body('secretario_id').isString().withMessage('The field secretario_id must be a string.'),
        body('policia_id').isString().withMessage('The field policia_id must be a string.'),
        body('eleccion_id').isString().withMessage('The field eleccion_id must be a string.'),

    ],
    forbidCitizen,
    validateRequest,
    postMesa
);

router.patch(
    '/:id',
    [
        param('id').isString().withMessage('The field id must be a string.'),
        body('esta_abierta').isBoolean().withMessage('The field esta_abierta must be a boolean.'),
    ],
    forbidCitizen,
    validateRequest,
    patchMesaAbierta
);


router.get(
    '/voto/:id',
    [
        param('id').isString().withMessage('The field id must be a string.'),
    ],
    forbidCitizen,
    validateRequest,
    getVotoByID
);


router.get(
    '/:id/resultados/lista',
    [
        param('id').isString().withMessage('The field id must be a string.'),
    ],
    forbidCitizen,
    validateRequest,
    getVotosPerListaPerMesa
);

router.get(
    '/:id/resultados/partido',
    [
        param('id').isString().withMessage('The field id must be a string.'),
    ],
    forbidCitizen,
    validateRequest,
    getVotosPerPartidoPerMesa
);

router.get(
    '/:id/resultados/candidato',
    [
        param('id').isString().withMessage('The field id must be a string.'),
    ],
    forbidCitizen,
    validateRequest,
    getVotosPerCandidatoPerMesa
);

module.exports = router;