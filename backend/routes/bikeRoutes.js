const express = require('express')
const Bike = require("../models/bikes")
const verifyJWT = require("../verifyJWT")

const router = express.Router()

router.get("/bikes", (req, res) => {
  Bike.find({})
  .then((bikes) => {
    res.json(bikes)
  })
})

router.get("/bike/:id", (req, res) => {
  Bike.findById(req.params.id)
    .then((bike) => {
      res.json(bike)
    })
})

router.post("/bike/add", verifyJWT, (req, res) => {
  const bike = req.body;

  const dbBike = new Bike({
    name: bike.name,
    type: bike.type,
    pricePerHour: bike.pricePerHour,
    image: bike.image
  })

  dbBike.save()

  return res.json('Bike added succesfully')
})

module.exports = router
