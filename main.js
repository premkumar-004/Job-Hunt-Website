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
const { validateListing, isLoggedIn } = require("./middleware.js");
const session = require("express-session");
const flash = require("connect-flash");
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

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

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}

app.use(session(sessionOptions));
app.use(flash());
app.use(cookieParser());

// Middleware to store the currently logged-in user
app.use(async (req, res, next) => {
    const token = req.cookies.token; // Extract the token from cookies
    if (token) {
        try {
            const decoded = jwt.verify(token, "mysecretcode"); // Verify the token
            const user = await User.findOne({ username: decoded.username }); // Fetch user details
            res.locals.currUser = user; // Set the user in res.locals
        } catch (err) {
            console.error("Error verifying token:", err); // Log the error
            res.locals.currUser = null; // Ensure no user is set on error
        }
    } else {
        res.locals.currUser = null; // No token means no logged-in user
    }
    next();
});

// Middleware for flash messages
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

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
    const listing = await Listing.findById(id).populate("postedBy");
    res.render("./listing/show.ejs", { listing });
}));
//create new listing
app.post("/listings", isLoggedIn, validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.postedBy = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
}))

//Update get request
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("./listing/edit.ejs", { listing });
}))
//Update Listing
app.put("/listings/:id", isLoggedIn, validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated Successfully");
    res.redirect(`/listings/${id}`);
}))

//Delete listing
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted Successfully");
    res.redirect("/listings");
}))

app.get("/", (req, res) => {
    res.render("./listing/index.ejs");
});

app.get("/signup", (req, res) => {
    res.render("./listing/signup.ejs");
})

app.post("/signup", async (req, res) => {
    const newUser = await new User({ ...req.body.user });
    let passcode = newUser.password;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(passcode, salt, async (err, hash) => {
            newUser.password = hash;
            await newUser.save();
            let token = jwt.sign((newUser.username), "mysecretcode");
            res.cookie("token", token);
            res.redirect("/login");
        });

    });
})

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

app.post("/login", async (req, res) => {
    let { username, password } = req.body;
    let currUser = await User.findOne({ username: username });
    if (!currUser) {
        req.flash("error", "Incorrect username or password");
        return res.redirect("/login");
    }
    else {
        bcrypt.compare(password, currUser.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ username: currUser.username }, "mysecretcode");
                res.cookie("token", token);
                req.flash("success", "Logged In Successfully");
                return res.redirect("/listings");
            }
        })
    }
})

app.get("/logout", (req, res) => {
    res.cookie("token", "");
    req.flash("success", "Logged Out Successfully");
    res.redirect("/listings");
})


//Users Routes
app.get('/users/profile', isLoggedIn, async (req, res) => {
    // For temporary use, you can use fake values
    const user = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phone: 1234567890,
        country: 'United States',
        state: 'California',
        city: 'San Francisco',
        pincode: 94105
    };

    res.render("./users/profile.ejs", { user });
});

app.get("/privacy", (req, res) => {
    res.render("./contacts/privacy.ejs");
})
app.get("/terms", (req, res) => {
    res.render("./contacts/terms.ejs");
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
