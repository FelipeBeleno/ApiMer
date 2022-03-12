const express = require('express')
var cors = require('cors');
const { db } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.apiPaths = {
            usuarios: '/api/user',
            auth : '/api/auth',
            cabezera: '/api/cabezera',
            detalle : '/api/detalle'
        }

        // paths
        //this.usuariosPath = "/api/usuarios"
        //this.auth = 

        // conectar a la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas app
        this.routes();

    }

    async conectarDB() {

        db.authenticate()
        try {
            console.log('ok')
        } catch (error) {
            console.log(error)
        }

    }

    middlewares() {

        // Cors
        this.app.use(cors({
            origin: 'http://localhost:3001' || 'https://mmaompe.appspot.com ' || 'http://localhost:4200'
        }))

        //parseo del body
        this.app.use(express.json())

        //directorio publico
        this.app.use(express.static('public'))

    }

    routes() {
        this.app.use(this.apiPaths.usuarios, require('../routes/user'))
        this.app.use(this.apiPaths.auth, require('../routes/auth'))
        this.app.use(this.apiPaths.cabezera, require('../routes/cabezera'))
        this.app.use(this.apiPaths.detalle, require('../routes/detalle'))
    }

    started() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en ', this.port)
        })

    }

}


module.exports = Server;