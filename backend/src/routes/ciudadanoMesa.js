const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../middlewares/validation');
const forbidCitizen = require('../middlewares/forbidCitizen');

const {
    postCiudadanoMesa, 
    patchEmitioVoto, 
    getCiudadanoMesaByMesaID,
    getCiudadanoMesaByMesaIDAndCiudadanoID,
    getCiudadanoMesaByCiudadanoId
} = require('../controllers/ciudadanoMesaController');

const router = express.Router();

router.post(
    '/mesa/:mesa_id/ciudadano/:ciudadano_id',
    [
        param('mesa_id').isString().withMessage('The field mesa_id must be a string.'),
        param('ciudadano_id').isString().withMessage('The field ciudadano_id must be a string.'),
        body('emitio_voto').isBoolean().optional().withMessage('The field emitio_voto must be a boolean.')
    ],
    validateRequest,
    postCiudadanoMesa
);

// This route is used to update the emitio_voto field for a specific ciudadano in a specific mesa
// It can only be updated to true, indicating that the citizen has cast their vote
router.patch(
    '/mesa/:mesa_id/ciudadano/:ciudadano_id',
    [
        param('mesa_id').isString().withMessage('The field mesa_id must be a string.'),
        param('ciudadano_id').isString().withMessage('The field ciudadano_id must be a string.'),
    ],
    validateRequest,
    patchEmitioVoto
);

router.get(
    '/:mesa_id',
    [
        param('mesa_id').isString().withMessage('The field mesa_id must be a string.'),
    ],
    validateRequest,
    getCiudadanoMesaByMesaID
);

router.get(
    '/mesa/:mesa_id/ciudadano/:ciudadano_id',
    [
        param('mesa_id').isString().withMessage('The field mesa_id must be a string.'),
        param('ciudadano_id').isString().withMessage('The field ciudadano_id must be a string.'),
    ],
    validateRequest,
    getCiudadanoMesaByMesaIDAndCiudadanoID
);

router.get(
    '/ciudadano/:ciudadano_id',
    [
        param('ciudadano_id').isString().withMessage('The field ciudadano_id must be a string.'),
    ],
    validateRequest,
    forbidCitizen,
    getCiudadanoMesaByCiudadanoId
);

module.exports = router;