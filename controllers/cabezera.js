const Logs = require("../models/logs");
const Cabezera = require("../models/saleMaster")








const newCabezera = async (req, res) => {

    const { nombre1,
        nombre2,
        apellido1,
        apellido2,
        email,
        dirección,
        direcciónFactuarcion,
        telefono,
        telefono2,
        ciudad,
        ciudadFactuarcion,
        flete,
        status } = req.body


    let fletet = parseFloat(flete);
    let fleteIva = ((fletet * 19) / 100) + fletet

    let date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' +
        ('00' + date.getUTCHours()).slice(-2) + ':' +
        ('00' + date.getUTCMinutes()).slice(-2) + ':' +
        ('00' + date.getUTCSeconds()).slice(-2);

    var cabezeraId = 2;

    try {
        const cabezera = new Cabezera({
            FIRST_NAME: nombre1,
            SECOND_NAME: nombre2,
            FIRST_LASTNAME: apellido1,
            SECOND_LASTNAME: apellido2,
            EMAIL: email,
            FISRT_PHONE: telefono,
            SECOND_PHONE: telefono2,
            ADDRESS_DESP: dirección,
            ADDRESS_FACT: direcciónFactuarcion,
            FK_CITY_FACTURATION: ciudad,
            FK_CITY_DISPATCH: ciudadFactuarcion,
            STATUS: status,
            VALUE_FLETE: fletet,
            VALUE_FLETE_IVA: fleteIva,
            IMPUEST_SALE: '',
            VALUE_SALE: '',
            VALUE_FACT: '',
            ARTICLES_TOTAL: '',
            TOTAL_IMP: '',


        })

        await cabezera.save();

        cabezeraId = cabezera.id

        const log = new Logs({
            FK_CABEZERA: cabezera.id,
            GET_DATE: date,
            STATUS: cabezera.dataValues.STATUS,
            DESCRIPTION: ''
        })

        await log.save()

        res.json({
            message: `Para ingresar los campos correspondientes a la insercion de productos por favor ingrese a este servicio localhost:8080/api/detalle/${cabezera.id}`,
            cabezera
        })

    } catch (error) {



        const log = new Logs({
            FK_CABEZERA: cabezeraId,
            GET_DATE: date,
            STATUS: 'I',
            DESCRIPTION: error?.original?.sqlMessage ? error.original.sqlMessage : 'Error contacte al admin'
        })

        await log.save()


        res.status(400).json(error?.original?.sqlMessage ? error.original.sqlMessage : error)
    }


}



const deleteCabecera = async (req, res) => {

    const id = req.params.id
    const cabecera = await Cabezera.findByPk(parseFloat(id))
    if(!cabecera){

        res.status(400).json({

            message : 'no existe la cabecera'
        })
        return
    }
    
    await cabecera.update({
        STATUS : 'I'
    })

    res.status(200).json(cabecera)

}

module.exports = {newCabezera, deleteCabecera}