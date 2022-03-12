const { response, request } = require('express')
const jwt = require('jsonwebtoken')



// validacion de JWT
const validarJWT = (req = request, res = response, next) => {

    // extraer token de header
    const token = req.header('x-token')
    try {
        if (!token) return res.status(401).json({
            msg: "No hay token en la peticion"
        })
        // extraer id del token para futuras actualizaciones 
        const { id } = jwt.verify(token, process.env.SECRETPRIVATEKEYTOKEN);
        // guardar id en el request de  la peticion 
        req.id = id
        next()
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: "JWT invalido"
        })

    }
}

module.exports = {
    validarJWT
}