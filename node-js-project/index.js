const express = require('express');
const mongoose = require('mongoose'); 
require("dotenv").config();
const app = express();
app.use(express.json());
const Article = require("./models/Article.js");

// mongodb+srv://ademozi:AdemMr06@nodejs-course-cluster.ahlp5uv.mongodb.net/?appName=nodejs-course-Cluster
// promises
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("connected successfully")
    }).catch((error) => {
        console.log("error with connecting with the DB", error)
    })

// This called a route handler. It is a function that will run when the user visits the /hello route.
// the function has two parameters (request, response)
// "/hello" is the Path 
app.get("/hello", (req, res) => {
    //res.send("hello");
    res.send("<h1>Hello World</h1>");

    
})

app.get("/numbers", (req, res) => {
    let numbers = "";
    for (let i = 0; i <= 100; i++) {
        numbers += i + " - ";
    }

    //res.send(`The numbers are ${numbers}`);

    // __dirname is a global variable that contains the path to the current directory
    // res.sendFile(__dirname + "/views/numbers.html");

    // res.render() will look for the file in the views folder.
    res.render("numbers.ejs", {
        name: "Adem",
        numbers: numbers
    });
})

// When you visit the /addComment route, it will notwork because the method is POST, not GET.
//  You can use Postman to test this route.
// Typing the URL in the browser will not work because browsers only make GET requests when you type a URL in the address bar.
app.post("/addComment", (req, res) => {
    res.send("you posted to add comment");
})

app.delete("/testingDelete", (req, res) => {
    res.send("delete request");
})

app.put("/test", (req, res) => {
    res.send("hello world");
})

// ----Parameters in the URL---- 

// Path parameters
// :number1 & :number2 means you can ou anything in them
// : means this part of the URL is a variable 
app.get("/findSummation/:number1/:number2", (req, res) => {
    const num1 = req.params.number1
    const num2 = req.params.number2

    const total = Number(num1) + Number(num2)

    // console.log() run in the terminal because it is backend not frontend
    console.log(req.params)
    res.send(`the total is ${total}`)
});

// Body parameters
app.get("/sayHello", (req, res) => {
    console.log(req.body)

    // Query parameters
    // http://localhost:3000/sayHello?age=50
    console.log(req.query);
    // res.send(`Hello ${req.body.name}, Age is: ${req.query.age}`);
    res.json({
        name: req.body.name,
        age: req.query.age,
        language: "Arabic"
    });
});

// ====== ARTICLES ENDPOINTS ======
app.post("/articles", async (req, res) => {
    const newArticle = new Article();

    const artTitle = req.body.articleTitle;
    const artBody = req.body.articleBody;

    newArticle.title = artTitle;
    newArticle.body = artBody;
    newArticle.numberOfLikes = 100;
    // Save the new article to the database
    // await is used because save() is an asynchronous function that returns a promise.
    await newArticle.save();

    res.json({
        message: "the article is saved successfully"
    });
});

app.get("/articles", async (req, res) => {
    const articles = await Article.find()
    res.json(articles);
});

app.get("/articles/:articleId", async (req, res) => {
    const id = req.params.articleId;

    // The best practice is the use try/catch in every async/await 
    try {
        const article = await Article.findById(id);
        res.json(article);
        return;
    } catch (error) {
        console.log("error while reading article of id ", id);
        return res.send("error");
    } 
});

app.delete("/articles/:articleId", async (req, res) => {
    const id = req.params.articleId;

    // The best practice is the use try/catch in every async/await 
    try {
        const article = await Article.findByIdAndDelete(id);
        res.json(article);
        return;
    } catch (error) {
        console.log("error while reading article of id ", id);
        return res.json(error);
    } 
});

app.get("/showArticles", async (req, res) => {
    const articles = await Article.find()

    res.render("articles.ejs", {
        allArticles: articles
    });
});


app.listen(3000, () => {
    console.log("I am listening on port 3000")
});
// 2:27