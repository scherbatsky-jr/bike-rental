const express = require('express')
const Bike = require("../models/bikes")
const Booking = require("../models/bookings")
const verifyJWT = require("../verifyJWT")
const jwt = require("jsonwebtoken")

const router = express.Router()

router.get("/bookings", verifyJWT, async (req, res) => {
  Booking.find({ user: req.user.id })
    .then(bookings => {
      res.json(bookings)
    })
})

router.post("/booking/cancel", verifyJWT, (req, res) => {
  const bookingId = req.body.id;

  Booking.deleteOne({ id: bookingId})
    .then((response) => {
      res.json('Deleted successfully')
    })
})

router.post("/booking/create", verifyJWT, (req, res) => {
  const booking = req.body;

  const dbBooking = new Booking({
    bike: booking.bike,
    user: req.user.id,
    date: booking.date,
    hours: booking.hours
  })

  dbBooking.save()

  return res.json('Booking created succesfully')
})

module.exports = router
