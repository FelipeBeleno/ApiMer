const { Sequelize } = require('sequelize');
// Create connection to database


    const db = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        password: '12345678',
        username: 'root',
        database:'PRUEBADEV'
    })


module.exports = {
    db    
}