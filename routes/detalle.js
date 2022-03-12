

const { Router } = require('express');
const AddDetail = require('../controllers/detalle');
const { validarJWT } = require('../middlewares/autenticacion.middleware');

const router = Router();




router.post('/:id',  [validarJWT],AddDetail)


module.exports = router;