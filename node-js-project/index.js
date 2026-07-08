const express = require('express');
const app = express();
app.use(express.json());

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

    res.send(`Hello ${req.body.name}`)
});

// Query parameters




app.listen(3000, () => {
    console.log("I am listening on port 3000")
});
// 54:13