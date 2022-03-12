const { DataTypes } = require("sequelize");
const { db } = require("../database/config");



const ProductSale = db.define('PRODUCTS_OF_SALES', {

    FK_CABEZERA: {
        type: DataTypes.INTEGER
    },
    FK_ID_PRODUCT: {
        type: DataTypes.INTEGER
    },
    COUNT_PRODUCTS: {
        type: DataTypes.INTEGER
    },
    PRICE_UNITY: {
        type: DataTypes.FLOAT
    },
    TOTAL_PRODUCTS_PRICE: {
        type: DataTypes.FLOAT
    }

}, {
    timestamps: false
})



module.exports = ProductSale;