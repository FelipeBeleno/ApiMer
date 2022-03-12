const { DataTypes } = require("sequelize");
const { db } = require("../database/config");



const Product = db.define('PRODUCTS', {


    NAME_PRODUCT: {
        type: DataTypes.STRING
    },

    PRICE: {
        type: DataTypes.FLOAT
    },
    PRECE_IVA: {
        type: DataTypes.FLOAT
    },
    DESCRIPTION: {
        type: DataTypes.STRING
    },
    STOCK: {
        type: DataTypes.INTEGER
    }

}, {
    timestamps:false
})



module.exports = Product