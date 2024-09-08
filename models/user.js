const mongoose = require("mongoose");
main().then(res => {
    console.log("Connection with DB successful");
})
    .catch(err => {
        console.log(err);
    })
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/JobHunt');
}

let userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            maxLength: 20,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        }
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;