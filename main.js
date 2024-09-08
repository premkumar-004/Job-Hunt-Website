const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = 3000;



main().then(res => {
    console.log("Connection with DB successful");
})
    .catch(err => {
        console.log(err);
    })
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/JobHunt');
}



app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, '/public')));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
})

app.post("/login", (req, res) => {
    res.redirect("/");
})

app.get("/signup", (req, res) => {
    res.render("signup.ejs");
})

app.post("/signup", (req, res) => {
    let body = req.body;
    console.log(body);
    res.redirect("/login");
})

app.listen(port, (req, res) => {
    console.log(`Listening on Port no. ${port}`);
})