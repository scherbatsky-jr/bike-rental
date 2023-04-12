const mongoose = require('mongoose');

const bikeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  pricePerHour: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;
