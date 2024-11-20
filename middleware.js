const { listingSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const User = require("./models/user.js");
const jwt = require("jsonwebtoken");

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    let errMsg = "Some error occured";
    if (error) {
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
};
module.exports.isLoggedIn = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash("error", "Login first");
        return res.redirect("/login");
    }
    try {
        let decoded = jwt.verify(req.cookies.token, "mysecretcode");
        console.log(decoded);
        let user = await User.findOne({ username: decoded.username }).select("-password");
        req.user = user;
        next();
    } catch (err) {
        req.flash("error", "Please Login first");
        res.redirect("/login");
    }
};