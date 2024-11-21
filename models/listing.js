const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/user.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: String,
    payment: Number,
    location: String,
    country: String,
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    applicants: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ]
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;