const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors')
const path = require('path')
const mongoose = require("mongoose")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/upload", express.static(path.join(__dirname, "public/uploads")));

const authRoute = require('./routes/auth')
const sendMultipleEmail = require('./routes/sendMultipleEmail')

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log("DB Connection successfull") })
    .then(() => app.listen(process.env.PORT || 8800, () => {
        console.log("Backend server is runnig")
    }))
    .catch((err)=>{console.log(err.message)})



app.get("/", (req, res) => {
    res.send("Welcome to IDOL Email Service API")
})

app.use("/api/auth", authRoute)
app.use("/api/send", sendMultipleEmail)


