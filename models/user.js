const { DataTypes } = require("sequelize");
const { db } = require("../database/config");



const User = db.define('User', {

    NAME: {
        type: DataTypes.STRING
    },
    PASSWORD: {
        type: DataTypes.STRING
    }
},{
    timestamps: false

});



module.exports = User;