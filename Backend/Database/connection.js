const mongoose = require("mongoose");

const db = process.env.DATABASE;

try {
    mongoose.connect(db);
    console.log("Database connected")
}
catch (error) {
    console.log(error)
}
