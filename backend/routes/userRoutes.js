const express = require('express')
const User = require("../models/users")
const verifyJWT = require("../verifyJWT")

const router = express.Router()

router.get("/u/:userId", verifyJWT, (req, res) => {
    const email = req.params.userId;

    User.findOne({email: email})
    .then(dbUser => res.json({
        email: dbUser.email, 
        canEdit: dbUser.email == req.user.email, 
        pfp: dbUser.pfp,
        bio: dbUser.bio,
        createdGroups: dbUser.createdGroups,
    }))
    .catch(err => res.json({
        email: "User Not Found", 
        canEdit: false, 
        pfp: "",
        bio: ""
    }))
})

router.post("/updateUserInfo", verifyJWT, (req, res) => {
    User.updateOne(
        {email: req.user.email},
        {$set: {bio: req.body.newBio}},
        (updateRes) => updateRes
    )
})

module.exports = router