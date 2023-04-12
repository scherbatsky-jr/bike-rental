const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require('cors')
require('dotenv').config();

const authRoutes = require("./routes/authRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const bikeRoutes = require("./routes/bikeRoutes")
const userRoutes = require("./routes/userRoutes")

const app = express();

app.use(cors())

const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json(), urlencodedParser)

app.use("/", authRoutes)
app.use("/", bikeRoutes)
app.use("/", bookingRoutes)
app.use("/", userRoutes)

const dbURI = process.env.MONGODB_URI
mongoose.connect(dbURI, { useNewUrlParser:true, useUnifiedTopology:true })
    .then((res) => {
        // only listen for requests once database data has loaded
        app.listen(process.env.PORT || 5000, () => console.log("Server is up on port " + (process.env.PORT || 5000)))
    })
    .catch(err => console.log(err))
