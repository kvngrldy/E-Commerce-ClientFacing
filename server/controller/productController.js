const { Product } = require('../models/')

class productController {
    static add(req, res, next) {
        const { name, image_url, price, stock } = req.body
        Product.create({
            name,
            image_url,
            price,
            stock
        })
            .then(data => {
                res.status(201).json({data, msg: `${data.name} added to product list` })
            })
            .catch(err => {
                next(err)
            })
    }

    static read(req, res, next) {
        Product.findAll()
            .then(products => {
                res.status(200).json({ products })
            })
            .catch(err => {
                next(err)
            })
    }

    static edit(req, res, next) {
        const id = req.params.id
        const { name, image_url, price, stock } = req.body
        const edited = { name, image_url, price, stock }
       
        Product.update(edited, { where: { id }, returning: true })
            .then(data => {
                console.log(data)
                res.status(200).json( data[1][0].dataValues )
            })
            .catch(err => {
                console.log(err, `here`)
                next(err)
            })
    }

    static delete(req, res, next) {
        const id = req.params.id
        Product.destroy({ where: { id: id } })
            .then(data => {
                if(!data) throw { msg: 'Invalid Item', status: 400 }
                res.status(200).json({ msg: `Item deleted` })
            })
            .catch(err => {
                
                next(err)
            })
    }

    static editPage(req,res,next) {
        const id = req.params.id
        console.log(id)
        Product.findOne({where: {id}})
        .then(data => {
            res.status(200).json({id: data.id, image_url: data.image_url, price: data.price, stock: data.stock})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = productController