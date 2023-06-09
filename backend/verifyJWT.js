const jwt = require("jsonwebtoken")

function verifyJWT(req, res, next) {
    // removes 'Bearer` from token
    const token = req.headers["x-access-token"]?.split(' ')[1]

    if (token) {
        jwt.verify(token, 'password', (err, decoded) => {
            if (err) return res.json({isLoggedIn: false, message: "Failed To Authenticate"})
            req.user = {};
            req.user.id = decoded.id
            req.user.email = decoded.email
            next()
        })
    } else {
        res.json({message: "Incorrect Token Given", isLoggedIn: false})
    }
}

module.exports = verifyJWT;