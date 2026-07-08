const express = require('express');
const app = express();

// the function has two parameters (request, response)
app.get("/hello", (req, res) => {
    res.send("hello");
})

app.get("/hi", (req, res) => {
    let numbers = "";
    for (let i = 0; i <= 100; i++) {
        numbers += i + " - ";
    }

    res.send(`The numbers are ${numbers}`);
})

app.put("/test", (req, res) => {
    res.send("hello world");
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

app.listen(3000, () => {
    console.log("I am listening on port 3000")
});