require('dotenv').config()
const express = require('express')
const app = express()
const PORT =  process.env.PORT || 3000
const userController = require('./controller/userController')
const errorHandler = require('./middlewares/errorhandler')
const authentication = require('./middlewares/authentication')
const authorization = require('./middlewares/authorization')
const productController = require('./controller/productController')
const cartController = require('./controller/cartController')
const cors = require('cors')
const cart = require('./models/cart')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.post('/login', userController.login)
app.post('/register', userController.register)

app.get('/product', productController.read)
app.post('/product', authentication, productController.add)
app.delete('/product/:id', authentication, productController.delete)
app.put('/product/:id', authentication, productController.edit)
app.get('/edit/:id', authentication, productController.editPage)

app.get('/cart', authentication, cartController.fetchCart)
app.post('/product/:id', authentication, cartController.addToCart)
app.delete('/cart/:id', authentication, cartController.deleteCartItem)
app.put('/cart/:id/add', authentication, cartController.addQuantity)
app.put('/cart/:id/subtract', authentication, cartController.subtractQuantity)
app.put('/cart/checkout', authentication, cartController.checkout)

app.use(errorHandler)
if(process.env.NODE_ENV != 'test') {
    app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
}

module.exports = app