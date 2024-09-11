const mongoose = require("mongoose");
const User = require("../models/user.js");

main().then(res => {
    console.log("Connection with DB successful");
})
    .catch(err => {
        console.log(err);
    })
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/JobHunt');
}

const users = [
    {
        name: "Rohan Sharma",
        username: "rohan123",
        email: "rohan.sharma@example.com",
        password: "pass123",
        country: "India",
        state: "Maharashtra",
        city: "Mumbai",
        pincode: "400001"
    },
    {
        name: "Ananya Verma",
        username: "ananyaV",
        email: "ananya.verma@example.com",
        password: "pass456",
        country: "India",
        state: "Karnataka",
        city: "Bangalore",
        pincode: "560001"
    },
    {
        name: "Aarav Patel",
        username: "aarav.patel",
        email: "aarav.patel@example.com",
        password: "pass789",
        country: "India",
        state: "Gujarat",
        city: "Ahmedabad",
        pincode: "380001"
    },
    {
        name: "Priya Gupta",
        username: "priya.g",
        email: "priya.gupta@example.com",
        password: "pass101",
        country: "India",
        state: "Uttar Pradesh",
        city: "Lucknow",
        pincode: "226001"
    },
    {
        name: "Karan Singh",
        username: "karansingh",
        email: "karan.singh@example.com",
        password: "pass202",
        country: "India",
        state: "Rajasthan",
        city: "Jaipur",
        pincode: "302001"
    },
    {
        name: "Aditi Joshi",
        username: "aditi.j",
        email: "aditi.joshi@example.com",
        password: "pass303",
        country: "India",
        state: "Madhya Pradesh",
        city: "Indore",
        pincode: "452001"
    },
    {
        name: "Ishaan Mehta",
        username: "ishaan_mehta",
        email: "ishaan.mehta@example.com",
        password: "pass404",
        country: "India",
        state: "Delhi",
        city: "New Delhi",
        pincode: "110001"
    },
    {
        name: "Sanya Kapoor",
        username: "sanya.k",
        email: "sanya.kapoor@example.com",
        password: "pass505",
        country: "India",
        state: "Haryana",
        city: "Gurugram",
        pincode: "122001"
    },
    {
        name: "Rajesh Kumar",
        username: "rajesh_k",
        email: "rajesh.kumar@example.com",
        password: "pass606",
        country: "India",
        state: "Bihar",
        city: "Patna",
        pincode: "800001"
    },
    {
        name: "Neha Desai",
        username: "nehaD",
        email: "neha.desai@example.com",
        password: "pass707",
        country: "India",
        state: "Tamil Nadu",
        city: "Chennai",
        pincode: "600001"
    },
];
for (let i = 11; i <= 50; i++) {
    users.push({
        name: `User ${i}`,
        username: `user${i}`,
        email: `user${i}@example.com`,
        password: `pass${i}00`,
        country: "India",
        state: "State",
        city: "City",
        pincode: "123456"
    });
}

User.insertMany(users).then(res => {
    console.log(res);
})
    .catch(err => {
        console.log(err);
    })
