const { verify } = require('../helper/jwt')
const { User } = require('../models')


async function authentication(req, res, next) {
    let { token } = req.headers

    try {
        if (!token) throw { msg: `Token not found`, status: 401 }
        else {
            let decoded = verify(token)
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            })
            if (!user) throw { msg: `Failed to authenticate`, status: 401 }
            else {
                req.userData = decoded
                next()
            }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authentication