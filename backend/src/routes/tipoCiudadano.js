const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../middlewares/validation');
const { getTipoCiudadanoByID, getTipoCiudadano, postTipoCiudadano } = require('../controllers/tipoCiudadanoController');

const router = express.Router();

router.get(
    '/:id',
    [
        param('id').isString().withMessage('The field id must be a string.'),
    ],
    validateRequest,
    getTipoCiudadanoByID
)

router.get(
    '/',
    validateRequest,
    getTipoCiudadano
)

router.post(
    '/',
    [
        body('nombre').isString().withMessage('The field nombre must be a string.'),
    ],
    validateRequest,
    postTipoCiudadano
)

module.exports = router;