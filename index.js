const express = require("express")
const dotenv = require("dotenv").config()
// const cors = require("cors")
const mongoose = require('mongoose')
const authRoute = require("./routes/authRoutes")
const cookieParser = require('cookie-parser')

//app connection
const app = express()

//connect to db
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("connecteddd yesss"))
.catch((err)=>console.log("got errorr", err));

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

//routes
app.use("/", authRoute)

const port = 8000;
app.listen(port, ()=>console.log("heyloo this is server"))