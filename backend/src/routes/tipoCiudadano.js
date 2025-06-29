const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../middlewares/validation');
const { getTipoCiudadanoByID, getTipoCiudadano, postTipoCiudadano } = require('../controllers/tipoCiudadanoController');

const router = express.Router();

const forbidCitizen = require('../middlewares/forbidCitizen');

router.get(
    '/:id',
    [
        param('id').isString().withMessage('The field id must be a string.'),
    ],
    forbidCitizen,
    validateRequest,
    getTipoCiudadanoByID
)

router.get(
    '/',
    forbidCitizen,
    validateRequest,
    getTipoCiudadano
)

router.post(
    '/',
    [
        body('nombre').isString().withMessage('The field nombre must be a string.'),
    ],
    forbidCitizen,
    validateRequest,
    postTipoCiudadano
)

module.exports = router;