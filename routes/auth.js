
const bcryptjs = require('bcryptjs');
const { Router } = require('express');
const User = require('../models/user');
const generarJWT = require('../helpers/generarJSW')

const route = Router()


route.post('/', async (req, res)=>{

    // transformar entrada a lower case por que todos los correos esta en lower case
    let { name, password } = req.body;

    // validacion de usuario
    const user =await User.findOne({ where: { NAME: name } })


    if (!user) return res.status(400).json({
        ok: false,
        msg: "Email o contraseña invalida"
    })


    

    const validationPass = await bcryptjs.compareSync(password, user.dataValues.PASSWORD)
    
    console.log(validationPass)


    if (!validationPass) return res.status(400).json({
        ok: false,
        msg: "Email o contraseña invalida"
    })


    const token = await generarJWT(user.dataValues.id)
    res.json({
        name,
        token,
        msg: "full"
    })

    


} )





module.exports = route;