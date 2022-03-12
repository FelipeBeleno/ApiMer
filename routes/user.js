const bcryptjs = require('bcryptjs');
const { Router } = require('express');
const { validarJWT } = require('../middlewares/autenticacion.middleware');
const User = require('../models/user');
const router = Router();


router.post('/', async (req, res) => {

    const { name, password } = req.body;


    if (!name || !password) {
        res.json({
            message: 'los campos usuario y contraseña son mandatorios'
        })
    }


    // encriptacion de constraseñas
    const salt = bcryptjs.genSaltSync(10);
    // encriptacion de constraseñas
    const ex = bcryptjs.hashSync(password, salt)

    try {
        
    const user  = new User({
        ID_USER:1,
        NAME:name, 
        PASSWORD: ex
    })   


    
    await user.save()

    res.json({
        ...user
    })
    } catch (error) {
        res.json(error)
    }


})
/*
router.get('/:id', updateUsers())
router.get('/:id', deleteUsers())
*/

module.exports = router;