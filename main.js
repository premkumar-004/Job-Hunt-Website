const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const User = require("./models/user.js");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const Listing = require("./models/listing.js");
const { validateListing } = require("./middleware.js");
const { wrap } = require("module");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, '/public')));
app.engine("ejs", ejsMate);


main().then(res => {
    console.log("Connection with DB successful");
})
    .catch(err => {
        console.log(err);
    })
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/JobHunt');
}

//listings
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listing/index.ejs", { allListings });
}));

//create new route
app.get("/listings/new", (req, res) => {
    res.render("./listing/new.ejs");
})


//show route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listing/show.ejs", { listing });
}));
//create new listing
app.post("/listings", validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}))

//Update get request
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("./listing/edit.ejs", { listing });
}))
//Update Listing
app.put("/listings/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}))

//Delete listing
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}))

app.get("/", (req, res) => {
    res.render("./listing/index.ejs");
});

//contact
app.get("/contact", (req, res) => {
    res.render("./contacts/contact.ejs");
})

//about us
app.get("/about", (req, res) => {
    res.render("./contacts/about.ejs");
})

app.get("/login", (req, res) => {
    res.render("./listing/login.ejs");
})

app.post("/login", (req, res) => {
    let user = req.body;
    console.log(user);
    res.redirect("/");
})

app.get("/signup", (req, res) => {
    res.render("./listing/signup.ejs");
})

app.post("/signup", (req, res) => {
    let data = req.body;
    console.log(data);
    res.redirect("/listing/login");
})

// Page not found Route
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
})

//Middleware for Error
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
});


app.listen(port, (req, res) => {
    console.log(`Listening on Port no. ${port}`);
})