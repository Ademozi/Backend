const express = require('express');
const app = express();

// the function has two parameters (request, response)
app.get("/hello", (req, res) => {
    res.send("hello");
})

app.get("/hi", (req, res) => {
    res.send("you visited hi");
})

app.get("/test", (req, res) => {
    res.send("you visited test");
})

app.listen(3000, () => {
    console.log("I am listening on port 3000")
});