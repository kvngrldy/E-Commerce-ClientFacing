module.exports = function (err, req, res, next) {
    console.log(err)
    let status = 500
    let error = []
    switch (err.name) {
        case 'JsonWebTokenError':
            status = 400
            error.push(`Can't verify token`)
            break
        case 'SequelizeValidationError':
            status = 400
            err.errors.forEach(errorData => {
                error.push(errorData.message)
            });
            break
        case 'SequelizeUniqueConstraintError':
            status = 400
            error.push('email has been used, please login if you are already registered')
            break
        default:
            error.push(err.msg)
            status = err.status
            break
    }
    res.status(status).json({ error })
}