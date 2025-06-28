const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../middlewares/validation');

const {
    getMesaByID,
    postMesa,
    patchMesaAbierta,
    getCiudadanoMesa,
    postCiudadanoMesa,
    patchEmitioVoto,
    getCiudadanoMesaByMesaID,
    getVotoByID,
    postVoto, // PARA DISCUTIR
    getVotosPerListaPerMesa,
    getVotosPerPartidoPerMesa,
    getVotosPerCandidatoPerMesa
} = require('../controllers/mesaController');

const router = express.Router();

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
    validateRequest,
    postMesa
);

router.patch(
    '/:id',
    [
        param('id').isString().withMessage('The field id must be a string.'),
        body('esta_abierta').isBoolean().withMessage('The field esta_abierta must be a boolean.'),
    ],
    validateRequest,
    patchMesaAbierta
);

router.get(
    '/:mesa_id/ciudadano/:ciudadano_id',
    [
        param('mesa_id').isString().withMessage('The field mesa_id must be a string.'),
        param('ciudadano_id').isString().withMessage('The field ciudadano_id must be a string.'),
    ],
    validateRequest,
    getCiudadanoMesa
);

router.post(
    '/:mesa_id/ciudadano/:ciudadano_id',
    [
        param('mesa_id').isString().withMessage('The field mesa_id must be a string.'),
        param('ciudadano_id').isString().withMessage('The field ciudadano_id must be a string.'),
        body('emitio_voto').isBoolean().optional().withMessage('The field emitio_voto must be a boolean.'),
    ],
    validateRequest,
    postCiudadanoMesa
);

router.patch(
    '/:mesa_id/ciudadano/:ciudadano_id',
    [
        param('mesa_id').isString().withMessage('The field mesa_id must be a string.'),
        param('ciudadano_id').isString().withMessage('The field ciudadano_id must be a string.'),
        body('emitio_voto').isBoolean().withMessage('The field emitio_voto must be a boolean.'),
    ],
    validateRequest,
    patchEmitioVoto
);

router.get(
    '/:mesa_id/ciudadano',
    [
        param('mesa_id').isString().withMessage('The field mesa_id must be a string.'),
    ],
    validateRequest,
    getCiudadanoMesaByMesaID
);

router.get(
    '/voto/:id',
    [
        param('id').isString().withMessage('The field id must be a string.'),
    ],
    validateRequest,
    getVotoByID
);

// PARA DISCUTIR
// PARA DISCUTIR
// PARA DISCUTIR
// PARA DISCUTIR
// PARA DISCUTIR
// router.post('voto')

router.get(
    '/:id/resultados/lista',
    [
        param('id').isString().withMessage('The field id must be a string.'),
    ],
    validateRequest,
    getVotosPerListaPerMesa
);

router.get(
    '/:id/resultados/partido',
    [
        param('id').isString().withMessage('The field id must be a string.'),
    ],
    validateRequest,
    getVotosPerPartidoPerMesa
);

router.get(
    '/:id/resultados/candidato',
    [
        param('id').isString().withMessage('The field id must be a string.'),
    ],
    validateRequest,
    getVotosPerCandidatoPerMesa
);

module.exports = router;