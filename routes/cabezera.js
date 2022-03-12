

const { Router } = require('express');
const { newCabezera, deleteCabecera } = require('../controllers/cabezera');
const { validarJWT } = require('../middlewares/autenticacion.middleware');
const Cabezera = require('../models/saleMaster');

const router = Router();


router.get('/', [validarJWT], async (req, res) => {


    const consultaCabeceras = await Cabezera.findAll({ where: { STATUS: 'A' } })
    console.log(consultaCabeceras)

    res.status(200).json(consultaCabeceras)
})
router.get('/:id', [validarJWT], async (req, res) => {

    const id = req.params.id

    const consulCabecera = await Cabezera.findByPk(parseFloat(id))

    if (!consulCabecera) {

        res.status(400).json({
            message: 'la cabecera no existe o ha sido eliminda'
        }
        )
        return
    }

    res.status(200).json(
        consulCabecera
    )

})


router.post('/', [validarJWT], newCabezera)
router.delete('/:id', [validarJWT], deleteCabecera)


module.exports = router;