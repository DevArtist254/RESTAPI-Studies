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
  //query searching the database to return all the document

  Article.find({}, (err, foundResults) => {
    //the response of the found documents

    !err ? res.send(foundResults) : res.send(err)
  })
})

app.post("/articles", (req, res) => {
  //create the new article

  const article = new Article({
    title: req.body.title,
    content: req.body.content,
  })

  //save the new article

  article.save((err) =>
    !err ? res.send("the document was succesfully send") : res.send(err)
  )
})

app.delete("/articles", (req, res) => {
  Article.deleteMany({}, (err) => {
    !err ? res.send("the document was succesfully send") : res.send(err)
  })
})

app.get("/articles/:articleTitle", (req, res) => {
  Article.findOne({title: req.params.articleTitle}, (err, foundDoc) => {
    foundDoc ? res.send(foundDoc) : res.send(err)
  })
})

app.put("/articles/:articleTitle", (req, res) => {
  //this will cause total overwrite of the document

  Article.update(
    //What we are searching for
    {title: req.params.articleTitle},
    //the actual update
    {title: req.body.title, content: req.body.content},
    //property to all overwrite
    {overwrite: true},
    //returned results
    (err, changedDoc) => {
      changedDoc ? res.send(changedDoc) : res.send(err)
    }
  )
})

app.listen(PORT, () => {
  console.log(`DevArtist Server is runing on port ${PORT}`)
})
