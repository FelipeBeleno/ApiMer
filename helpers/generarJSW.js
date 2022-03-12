const jwt = require('jsonwebtoken')


// generar token
const generarJWT=(id="")=>{

    return new Promise((resolve, reject)=>{
        const payload = {id}

        jwt.sign(payload, process.env.SECRETPRIVATEKEYTOKEN, {
            expiresIn: '1h'
        }, (err, token)=>{
            if (err) {
                console.log(err)
                reject(' no se pudo obtener el jwt')
            }else{
                resolve(token)
            }

        })

    })

}


module.exports = generarJWT