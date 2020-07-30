const { User } = require('../models/')
const bcrypt = require('../helper/bcrypt')
const jwt = require('../helper/jwt')


class userController {
    static register(req, res, next) {
        const { email, password, confirmpassword } = req.body
        if (password != confirmpassword) {
            throw { msg: 'Password not matching', status: 400 }
        } else {
            User.create({ email, password, role: "user" })
                .then(createdUser => {
                    res.status(201).json({ email: createdUser.email })
                })
                .catch(err => {
                    next(err)
                })
        }

    }

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: { email }
        })
            .then(foundUser => {
                console.log(foundUser, 'here')
                if (!foundUser) throw { msg: 'Invalid Email/Password', status: 400 }
                const checkPassword = bcrypt.comparePassword(password, foundUser.password)
                if (checkPassword) {
                    const token = jwt.newToken({ id: foundUser.id, email: foundUser.email })
                    res.status(200).json({ msg: `${foundUser.email} logged in succesfully!`, token })
                } else {
                    throw { msg: "Invalid Email/Password", status: 400 }
                }
            })
            .catch(err => {
                next(err)
            })
    }
}


module.exports = userController