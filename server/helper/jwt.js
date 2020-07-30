const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY

function newToken(payload) {
    return jwt.sign(payload,secret)
}

function verify(token) {
    return jwt.verify(token, secret)
}

module.exports = {newToken, verify}