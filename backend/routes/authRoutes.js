const express = require('express')
const bcrypt = require("bcrypt")
const User = require("../models/users")
const verifyJWT = require("../verifyJWT")
const jwt = require("jsonwebtoken")
const gravatar = require("gravatar")
const {registrationValidation, loginValidation } = require("../validation")

const router = express.Router()

router.get("/isUserAuth", verifyJWT, (req, res) => {
    return res.json({isLoggedIn: true, email: req.user.email})
})

router.post("/login", (req, res) => {
    
    const userLoggingIn = req.body;

    if (!userLoggingIn) return res.json({message: "Server Error"})

    const validationError = loginValidation(userLoggingIn).error

    if (validationError) {
        return res.json({message: validationError.details[0].message})
    } else {
        User.findOne({email: userLoggingIn.email.toLowerCase()})
        .then(dbUser => {
            if (!dbUser) {
                return res.json({message: "Invalid email or Password"})
            }
            bcrypt.compare(userLoggingIn.password, dbUser.password)
            .then(isCorrect => {
                if (isCorrect) {
                    const payload = {
                        id: dbUser._id,
                        email: dbUser.email,
                        pfp: dbUser.pfp
                    }
                    jwt.sign(
                        payload, 
                        "password",
                        {expiresIn: 86400},
                        (err, token) => {
                            return res.json({message: "Success", token: "Bearer " + token})
                        }
                    )
                } else {
                    return res.json({message: "Invalid email or Password"})
                }
            })

        })
    }
})

router.post("/register", async (req, res) => {
    const user = req.body;

    const takenemail = await User.findOne({email: user.email.toLowerCase()})

    const validationError = registrationValidation(user).error

    if (validationError) {
        return res.json({message: validationError.details[0].message})
    } else if (takenemail) {
        return res.json({message: "email has already been taken"})
    } else {
        user.password = await bcrypt.hash(req.body.password, 10)

        const dbUser = new User({
            email: user.email.toLowerCase(),
            full_name: user.full_name,
            password: user.password,
        })

        dbUser.save()
        return res.json({message: "Success"})
    }
})

module.exports = router