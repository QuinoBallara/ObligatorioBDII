const express = require('express');
const { body } = require('express-validator');
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
        params('id').isString().withMessage('The field id must be a string.'),
    ],
    validateRequest,
    getMesaByID
);

router.post(
    '/',
    [
        body('id').isString().withMessage('The field id must be a string.'),
        body('nombre').isString().withMessage('The field nombre must be a string.'),
        body('esta_abierta').isBoolean().withMessage('The field esta_abierta must be a boolean.'),
        body('tipo_mesa_id').isString().withMessage('The field tipo_mesa_id must be a string.'),
    ],
    validateRequest,
    postMesa
);

router.patch(
    '/:id',
    [
        params('id').isString().withMessage('The field id must be a string.'),
        body('esta_abierta').isBoolean().withMessage('The field esta_abierta must be a boolean.'),
    ],
    validateRequest,
    patchMesaAbierta
);

router.get(
    '/:mesa_id/ciudadano/:ciudadano_id',
    [
        params('mesa_id').isString().withMessage('The field mesa_id must be a string.'),
        params('ciudadano_id').isString().withMessage('The field ciudadano_id must be a string.'),
    ],
    validateRequest,
    getCiudadanoMesa
);

router.post(
    '/:mesa_id/ciudadano',
    [
        params('mesa_id').isString().withMessage('The field mesa_id must be a string.'),
        body('ciudadano_id').isString().withMessage('The field ciudadano_id must be a string.'),
    ],
    validateRequest,
    postCiudadanoMesa
);

router.patch(
    '/:mesa_id/ciudadano/:ciudadano_id',
    [
        params('mesa_id').isString().withMessage('The field mesa_id must be a string.'),
        params('ciudadano_id').isString().withMessage('The field ciudadano_id must be a string.'),
        body('emitio_voto').isBoolean().withMessage('The field emitio_voto must be a boolean.'),
    ],
    validateRequest,
    patchEmitioVoto
);

router.get(
    '/:mesa_id/ciudadano',
    [
        params('mesa_id').isString().withMessage('The field mesa_id must be a string.'),
    ],
    validateRequest,
    getCiudadanoMesaByMesaID
);

router.get(
    '/voto/:id',
    [
        params('id').isString().withMessage('The field id must be a string.'),
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
    ':id/resultados/lista',
    [
        params('id').isString().withMessage('The field id must be a string.'),
    ],
    validateRequest,
    getVotosPerListaPerMesa
);

router.get(
    ':id/resultados/partido',
    [
        params('id').isString().withMessage('The field id must be a string.'),
    ],
    validateRequest,
    getVotosPerPartidoPerMesa
);

router.get(
    ':id/resultados/candidato',
    [
        params('id').isString().withMessage('The field id must be a string.'),
    ],
    validateRequest,
    getVotosPerCandidatoPerMesa
);

module.exports = router;