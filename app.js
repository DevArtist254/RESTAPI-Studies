const express = require("express")
const bodyParser = require("body-parser")
const PORT = 3000
const connectDB = require("./config/db")
const cors = require("cors")

//const variable = require("./models/")

//1.0
const app = express()

//1.01
app.use(express.static("public"))

//2.0
app.set("view engine", "ejs")

//3.30
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

//Connect Database
connectDB()

app.listen(PORT, () => {
  console.log(`DevArtist Server is runing on port ${PORT}`)
})
