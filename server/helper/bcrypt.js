const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(12)

function hashPassword(plainPassword) {
    return bcrypt.hashSync(plainPassword, salt)
}

function comparePassword(plainPassword, hash) {
    return  bcrypt.compareSync(plainPassword, hash)
}

module.exports = {hashPassword, comparePassword}