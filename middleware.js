const { listingSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    console.log(error);
    let errMsg = "Some error occured";
    if (error) {
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
};