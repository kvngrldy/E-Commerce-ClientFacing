const { Product, Cart } = require('../models')

class cartController {
    static addToCart(req, res, next) {
        const user_id = req.userData.id
        const product_id = req.params.id
        Cart.findAll({
            where: {
                user_id: user_id, product_id: product_id
            }
        })
            .then(carts => {

                if (!carts) throw { msg: 'Invalid Product', status: 400 }

                if (carts.length > 0) {
                    carts[0].quantity += 1
                    carts[0].save()
                    throw { msg: 'Product already in cart, quantity added', status: 200}
                } else {
                    Cart.create({
                        user_id,
                        product_id,
                        quantity: 1,
                        status: false
                    })
                        .then(cart => {
                            res.status(201).json({ cart, msg: "Product added to cart" })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            })
            .catch(err => {
                next(err)
            })

    }

    static fetchCart(req, res, next) {
        const user_id = req.userData.id
        Cart.findAll({
            where: { user_id: user_id, status: false },
            attributes: ['id', 'user_id', 'product_id', 'quantity', 'status'],
            include: [{
                model: Product,
                attributes: ['id', 'name', 'image_url', 'price', 'stock']
            }]
        })
            .then(carts => {
                res.status(200).json({ carts })
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteCartItem(req, res, next) {
        const id = req.params.id
        Cart.destroy({
            where: { id }
        })
            .then(data => {
                res.status(200).json({ msg: "Successfully delete products" })
            })
            .catch(err => {
                next(err)
            })
    }

    static addQuantity(req, res, next) {
        const id = req.params.id
        Cart.findOne({
            where: { id }
        })
            .then(cart => {
                cart.quantity += 1
                cart.save()
                res.status(200).json({ cart, msg: 'item added' })
            })
            .catch(err => {
                console.log(err)
            })
    }

    static subtractQuantity(req, res, next) {
        const id = req.params.id
        Cart.findOne({
            where: { id }
        })
            .then(cart => {
                cart.quantity -= 1
                cart.save()
                res.status(200).json({ cart, msg: 'item removed' })
            })
            .catch(err => {
                console.log(err)
            })
    }

    static checkout(req,res,next) {
     
    }

}

module.exports = cartController