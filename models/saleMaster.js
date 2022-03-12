const { DataTypes } = require("sequelize");
const { db } = require("../database/config");


const Cabezera = db.define('CABEZERA', {



    FIRST_NAME: {
        type: DataTypes.STRING
    },
    SECOND_NAME: {
        type: DataTypes.STRING
    },
    FIRST_LASTNAME: {
        type: DataTypes.STRING
    },

    SECOND_LASTNAME: {
        type: DataTypes.STRING
    },

    EMAIL: {type: DataTypes.STRING},
    FISRT_PHONE: { type: DataTypes.STRING },
    SECOND_PHONE: { type: DataTypes.STRING },
    ADDRESS_DESP: { type: DataTypes.STRING },
    ADDRESS_FACT: { type: DataTypes.STRING },
    FK_CITY_FACTURATION: { type: DataTypes.INTEGER },
    FK_CITY_DISPATCH: { type: DataTypes.INTEGER },


    STATUS: {
        type: DataTypes.CHAR,
        defaultValue: 'A'
    },


    VALUE_FLETE: {
        type: DataTypes.FLOAT
    },
    VALUE_FLETE_IVA: { type: DataTypes.FLOAT },
    IMPUEST_SALE: { type: DataTypes.FLOAT },
    VALUE_SALE: { type: DataTypes.FLOAT },
    VALUE_FACT: { type: DataTypes.FLOAT },
    ARTICLES_TOTAL: { type: DataTypes.FLOAT },
    TOTAL_IMP: { type: DataTypes.FLOAT }



}, {
    timestamps: false, 
    modelName:'CABEZERA'

});



module.exports = Cabezera;