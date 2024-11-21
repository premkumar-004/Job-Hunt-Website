const mongoose = require("mongoose");
const initData = require("./listinginit.js");
const Listing = require("../models/listing.js");
const MONGO_URL = 'mongodb://127.0.0.1:27017/JobHunt';

main().then((res) => {
    console.log("Connected to DB");
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, postedBy: "673e2c929a16e598d796ee03" }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

initDB();