const { DataTypes } = require("sequelize");
const { db } = require("../database/config");



const Logs = db.define('INFO_LOGS', {



    FK_CABEZERA: {
        type: DataTypes.FLOAT
    },
    GET_DATE: {
        type: DataTypes.DATE
    },
    STATUS: {
        type: DataTypes.CHAR
    },
    DESCRIPTION: {
        type: DataTypes.STRING
    }

},{
    timestamps: false

});



module.exports = Logs;