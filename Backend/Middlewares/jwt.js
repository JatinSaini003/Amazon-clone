const { expressjwt } = require('express-jwt')

function authJWT() {
    const secret = process.env.secret

    return expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            { url: /\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            '/users/login',
            '/users/register'
        ]
    })
}

async function isRevoked(req, token) {
    if (!token.payload.isAdmin) {
        return false
    }
}

module.exports = authJWT;