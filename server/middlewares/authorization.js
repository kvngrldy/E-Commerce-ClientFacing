const { User } = require('../models')
const {Cart} = require('../models/')

function authorization(req,res,next) {
    const { id } = req.params
    Cart.findByPk(id) 
    .then (data => {
        if (!data) throw {msg: `Invalid Cart`, status: 400 }
        else if (data.user_id == req.userData.id) next()
        else throw {msg: `You're not authorized to do this!`, status: 400}
    })
    .catch (err => {
        next(err)
    })
}

module.exports = authorization