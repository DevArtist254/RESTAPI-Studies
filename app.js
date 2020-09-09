const express = require("express")
const bodyParser = require("body-parser")
const PORT = 3000
const connectDB = require("./config/db")
const cors = require("cors")

const Article = require("./models/Article")

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

app.get("/articles", (req, res) => {
  Article.find({}, (err, foundResults) => {
    if (!err) {
      res.send(foundResults)
    } else {
      res.send(err)
    }
  })
})

app.post("/articles", (req, res) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
  })

  article.save((err) =>
    !err ? res.send("the document was succesfully send") : res.send(err)
  )
})

app.listen(PORT, () => {
  console.log(`DevArtist Server is runing on port ${PORT}`)
})
