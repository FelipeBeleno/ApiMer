const Logs = require("../models/logs");
const Product = require("../models/products");
const ProductSale = require("../models/ProductSale");
const Cabezera = require("../models/saleMaster");



const AddDetail = async (req, res) => {

    try {



        const cabeceraId = req.params.id;

        let date;
        date = new Date();
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' +
            ('00' + date.getUTCHours()).slice(-2) + ':' +
            ('00' + date.getUTCMinutes()).slice(-2) + ':' +
            ('00' + date.getUTCSeconds()).slice(-2);


        // validacion de que existe o esta activo
        const consultaCabecera = await Cabezera.findOne({ where: { id: parseFloat(cabeceraId) } })

        if (consultaCabecera === null || consultaCabecera.STATUS === 'I') {
            res.json({
                message: 'el recurso ya fue despachado o no existe'
            })
            return
        }

        const { products } = req.body



        // validacion de que el producto este disponoble
        for (let i = 0; i < products.length; i++) {

            const consultaProducto = await Product.findOne({ where: { id: products[i].idProducto } })

            let bandera = consultaProducto.dataValues.STOCK < products[i].cantidad
            let producto = consultaProducto.dataValues.NAME_PRODUCT


            if (bandera === true) {


                const log = new Logs({
                    FK_CABEZERA: cabeceraId,
                    GET_DATE: date,
                    STATUS: 'I',
                    DESCRIPTION: producto
                })
                await log.save()


                res.json({
                    message: `el producto no tiene el stock ${producto}`
                })
                return
            }

        }


        // descuento de los productos en el stock y guardado en el detalle de la cabecera
        for (let i = 0; i < products.length; i++) {
            const updateProduct = await Product.findByPk(products[i].idProducto)

            const newProductSale = new ProductSale({
                FK_CABEZERA: cabeceraId,
                FK_ID_PRODUCT: updateProduct.dataValues.id,
                COUNT_PRODUCTS: products[i].cantidad,
                PRICE_UNITY: updateProduct.dataValues.PRICE,
                TOTAL_PRODUCTS_PRICE: updateProduct.dataValues.PRICE * products[i].cantidad
            })

            await newProductSale.save();




            // actualizacion del stock
            await updateProduct.update({
                STOCK: updateProduct.dataValues.STOCK - products[i].cantidad
            })

        }

        // llamado del detalle para finalizar la cabecera
        const detalleCabecera = await ProductSale.findAll({ where: { FK_CABEZERA: parseFloat(cabeceraId) } })


        const arrayDetalle = detalleCabecera.map(element => element.dataValues)



        const totalCantidadProducts = arrayDetalle.reduce((p, c) => {
            return p + c.COUNT_PRODUCTS
        }, 0)

        const totalValorProductos = arrayDetalle.reduce((p, c) => p + c.TOTAL_PRODUCTS_PRICE, 0)
        const totalArticulosConIva = totalValorProductos + (totalValorProductos * 19 / 100);
        const totalInpuestoIvaArticulos = (totalValorProductos * 19 / 100);

        console.log(totalValorProductos, totalCantidadProducts, totalArticulosConIva,
            totalInpuestoIvaArticulos)

        const cabeceraUpdate = await Cabezera.findByPk(parseFloat(cabeceraId))

        console.log(cabeceraUpdate.VALUE_FLETE)
        await cabeceraUpdate.update({
            IMPUEST_SALE: totalInpuestoIvaArticulos,
            VALUE_SALE: totalArticulosConIva,
            VALUE_FACT: totalArticulosConIva + cabeceraUpdate.dataValues.VALUE_FLETE_IVA,
            ARTICLES_TOTAL: totalCantidadProducts,
            TOTAL_IMP: totalInpuestoIvaArticulos + (cabeceraUpdate.dataValues.VALUE_FLETE * 19 / 100)
        })

        res.json({
            detalle: arrayDetalle,
            cabecera: cabeceraUpdate.dataValues
        })
        return
    } catch (error) {
        res.status(400).json(error)

    }
}


module.exports = AddDetail; 